/**
 * 공공 API raw 데이터 → DB INSERT 형태로 변환하는 어댑터
 *
 * 책임:
 * - 필드명 매핑 (foodNm → name, enerc → calories 등)
 * - 타입 변환 (string → number, 안전 처리)
 * - 정규화 (trim, 빈 값을 null로)
 *
 * 책임 아님:
 * - DB 통신 (메인 ETL 스크립트의 역할)
 * - API 호출 (메인 ETL 스크립트의 역할)
 * - 비즈니스 로직 (예: "건강한 과자인지 판단" 같은 거 X)
 */

import type { PublicApiRawItem } from "../types/public-api.types";

// ============================================================================
// 출력 타입
// ============================================================================

export type SnackInsert = {
  name: string;
  public_food_cd: string;
  brand_id?: number | null;
};

export type SnackNutritionInsert = {
  snack_id: number;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  saturated_fat: number | null;
  trans_fat: number | null;
  carbs: number | null;
  sugar: number | null;
  sodium: number | null;
  cholesterol: number | null;
  serving_size: string | null;
  source: "public_api";
  source_food_cd: string;
  synced_at: string;
};

// ============================================================================
// 헬퍼 함수 (안전한 변환)
// ============================================================================

/**
 * 문자열을 숫자로 변환. 빈 값/비숫자는 null 반환.
 *
 * 예:
 *   "165.5" → 165.5
 *   "" → null
 *   undefined → null
 *   "abc" → null
 */
function toNumberOrNull(value: string | undefined | null): number | null {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * 문자열 trim. 빈 값은 null 반환.
 */
function toTextOrNull(value: string | undefined | null): string | null {
  if (value === undefined || value === null) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

// ============================================================================
// 어댑터 함수
// ============================================================================

/**
 * raw → snacks INSERT 형태로 변환
 *
 * @param raw 공공 API 한 아이템
 * @param brandId 미리 조회/생성한 brand의 ID (없으면 null)
 */
export function adaptToSnack(raw: PublicApiRawItem, brandId: number | null): SnackInsert {
  return {
    name: raw.foodNm.trim(),
    public_food_cd: raw.foodCd.trim(),
    brand_id: brandId,
  };
}

/**
 * raw → snack_nutritions INSERT 형태로 변환
 *
 * @param raw 공공 API 한 아이템
 * @param snackId 위에서 INSERT된 snack의 ID
 */
export function adaptToSnackNutrition(
  raw: PublicApiRawItem,
  snackId: number,
): SnackNutritionInsert {
  return {
    snack_id: snackId,
    calories: toNumberOrNull(raw.enerc),
    protein: toNumberOrNull(raw.prot),
    fat: toNumberOrNull(raw.fatce),
    saturated_fat: toNumberOrNull(raw.fasat),
    trans_fat: toNumberOrNull(raw.fatrn),
    carbs: toNumberOrNull(raw.chocdf),
    sugar: toNumberOrNull(raw.sugar),
    sodium: toNumberOrNull(raw.nat),
    cholesterol: toNumberOrNull(raw.chole),
    serving_size: toTextOrNull(raw.srvSize),
    source: "public_api",
    source_food_cd: raw.foodCd,
    synced_at: new Date().toISOString(),
  };
}

/**
 * raw에서 제조사명 추출 (brands 자동 등록용)
 *
 * 빈 값이면 null 반환 → 브랜드 등록 skip
 */
export function extractBrandName(raw: PublicApiRawItem): string | null {
  return toTextOrNull(raw.mfrNm);
}

/**
 * 영양정보가 하나라도 있는지 확인
 * 모두 NULL이면 snack_nutritions row를 INSERT하지 않음 (선택 사항)
 */
export function hasAnyNutrition(raw: PublicApiRawItem): boolean {
  const fields = [
    raw.enerc,
    raw.prot,
    raw.fatce,
    raw.fasat,
    raw.fatrn,
    raw.chocdf,
    raw.sugar,
    raw.nat,
    raw.chole,
  ];
  return fields.some((f) => toNumberOrNull(f) !== null);
}
