/**
 * 공공 API → Supabase ETL 스크립트
 *
 * 실행: npx tsx --env-file=.env.local scripts/seed-from-public-api.ts
 *
 * 동작:
 *   1. 공공 API에서 가공식품 데이터 페이지네이션으로 가져오기
 *   2. 어댑터로 변환
 *   3. Supabase에 upsert (brands, snacks, snack_nutritions)
 *
 * 멱등성: 같은 스크립트 여러 번 돌려도 데이터 중복 X
 *         (public_food_cd unique 제약 + upsert)
 */

import { createClient } from "@supabase/supabase-js";

import {
  adaptToSnack,
  adaptToSnackNutrition,
  extractBrandName,
  hasAnyNutrition,
} from "./adapters/public-api.adapter";
import type { PublicApiResponse } from "./types/public-api.types";

// ============================================================================
// 환경변수 검증
// ============================================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;
const FOOD_API_KEY = process.env.FOOD_API_KEY;
const FOOD_API_BASE_URL = "https://api.data.go.kr/openapi/tn_pubr_public_nutri_process_info_api";

if (!SUPABASE_URL || !SUPABASE_SECRET || !FOOD_API_KEY) {
  console.error("환경변수 누락: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, FOOD_API_KEY");
  process.exit(1);
}

// ============================================================================
// 설정
// ============================================================================

const CONFIG = {
  numOfRows: 100, // 페이지당 가져올 개수
  maxPages: 1, // 일단 1페이지만 (테스트용). 전체 적재 시 늘림
  foodLv3Cd: "01", // 과자류·빵류·떡류
  delayMs: 1000, // 페이지 간 딜레이 (rate limit 방지)
};

// ============================================================================
// Supabase 클라이언트
// ============================================================================

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    headers: {
      Authorization: `Bearer ${SUPABASE_SECRET}`,
    },
  },
});

// ============================================================================
// 공공 API 호출
// ============================================================================

async function fetchPage(pageNo: number): Promise<PublicApiResponse> {
  const url = new URL(FOOD_API_BASE_URL);
  url.searchParams.set("serviceKey", FOOD_API_KEY!);
  url.searchParams.set("foodLv3Cd", CONFIG.foodLv3Cd);
  url.searchParams.set("pageNo", String(pageNo));
  url.searchParams.set("numOfRows", String(CONFIG.numOfRows));
  url.searchParams.set("type", "json");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`API 호출 실패: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ============================================================================
// brands 자동 등록 (upsert)
// ============================================================================

const brandCache = new Map<string, number>();

async function getOrCreateBrand(brandName: string): Promise<number> {
  // 캐시 확인 (같은 페이지에 같은 브랜드 여러 번 안 조회하도록)
  if (brandCache.has(brandName)) {
    return brandCache.get(brandName)!;
  }

  // upsert (name unique 제약 활용)
  const { data, error } = await supabase
    .from("brands")
    .upsert({ name: brandName }, { onConflict: "name" })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`brand upsert 실패 (${brandName}): ${error?.message}`);
  }

  brandCache.set(brandName, data.id);
  return data.id;
}

// ============================================================================
// 한 아이템 적재
// ============================================================================

async function loadItem(raw: PublicApiResponse["response"]["body"]["items"][0]) {
  // 1. 브랜드 처리
  const brandName = extractBrandName(raw);
  const brandId = brandName ? await getOrCreateBrand(brandName) : null;

  // 2. snacks upsert
  const snackInsert = adaptToSnack(raw, brandId);
  const { data: snack, error: snackError } = await supabase
    .from("snacks")
    .upsert(snackInsert, { onConflict: "public_food_cd" })
    .select("id")
    .single();

  if (snackError || !snack) {
    throw new Error(`snack upsert 실패 (${raw.foodCd}): ${snackError?.message}`);
  }

  // 3. 영양정보 upsert (있을 때만)
  if (hasAnyNutrition(raw)) {
    const nutritionInsert = adaptToSnackNutrition(raw, snack.id);
    const { error: nutError } = await supabase
      .from("snack_nutritions")
      .upsert(nutritionInsert, { onConflict: "snack_id" });

    if (nutError) {
      throw new Error(`nutrition upsert 실패 (snack_id=${snack.id}): ${nutError.message}`);
    }
  }
}

// ============================================================================
// 메인 흐름
// ============================================================================

async function main() {
  console.log("🚀 ETL 시작");
  console.log(`설정: ${CONFIG.maxPages}페이지 × ${CONFIG.numOfRows}개`);

  let totalProcessed = 0;
  let totalErrors = 0;

  for (let pageNo = 1; pageNo <= CONFIG.maxPages; pageNo++) {
    console.log(`\n📄 페이지 ${pageNo} 가져오는 중...`);

    // 1. API 호출
    const response = await fetchPage(pageNo);

    // 2. 응답 검증
    if (response.response?.header?.resultCode !== "00") {
      console.error(`❌ API 오류: ${response.response?.header?.resultMsg}`);
      break;
    }

    const items = response.response.body.items ?? [];
    console.log(
      `   ${items.length}개 아이템 받음 (totalCount: ${response.response.body.totalCount})`,
    );

    // 3. 각 아이템 적재
    for (const raw of items) {
      try {
        await loadItem(raw);
        totalProcessed++;
        process.stdout.write("."); // 진행 표시
      } catch (err) {
        totalErrors++;
        console.error(`\n   ⚠️  ${raw.foodCd}: ${(err as Error).message}`);
      }
    }

    // 4. 페이지 간 딜레이
    if (pageNo < CONFIG.maxPages) {
      await new Promise((r) => setTimeout(r, CONFIG.delayMs));
    }
  }

  console.log(`\n\n✅ 완료: ${totalProcessed}개 적재, ${totalErrors}개 실패`);
}

main().catch((err) => {
  console.error("💥 치명적 오류:", err);
  process.exit(1);
});
