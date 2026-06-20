/**
 * 전국통합식품영양성분정보(가공식품) 공공데이터 API Route Handler
 * 클라이언트에 API 키가 노출되지 않도록 서버 측 프록시 역할을 합니다.
 *
 * 전체 목록 조회
 * GET /api/snacks?pageNo=1&numOfRows=20
 *
 * 특정 식품명 조회
 * GET /api/snacks?foodNm=초코파이&pageNo=1&numOfRows=20
 */

import type { NextRequest } from "next/server";

import {
  FOOD_API_BASE_URL,
  FOOD_API_SUCCESS_CODE,
  FOOD_LV3_SNACK_CATEGORY_CODE,
  type FoodApiRawResponse,
  type FoodNutritionResponse,
} from "@/entities/snack";
import { DEFAULT_API_TIMEOUT_MS, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/shared/constants";

/** 요청 파라미터의 유효성을 검사하고 정규화된 값을 반환합니다 */
function parseSearchParams(searchParams: URLSearchParams): {
  foodNm: string;
  pageNo: number;
  numOfRows: number;
} | null {
  const foodNm = searchParams.get("foodNm") ?? "";
  const pageNo = Number(searchParams.get("pageNo") ?? "1");
  const numOfRows = Number(searchParams.get("numOfRows") ?? String(DEFAULT_PAGE_SIZE));

  if (!Number.isInteger(pageNo) || pageNo < 1) return null;
  if (!Number.isInteger(numOfRows) || numOfRows < 1 || numOfRows > MAX_PAGE_SIZE) return null;

  return { foodNm, pageNo, numOfRows };
}

export async function GET(request: NextRequest): Promise<Response> {
  const apiKey = process.env.FOOD_API_KEY;

  if (!apiKey) {
    const body: FoodNutritionResponse = {
      success: false,
      message: "API 키가 설정되지 않았습니다.",
    };
    return Response.json(body, { status: 500 });
  }

  const params = parseSearchParams(request.nextUrl.searchParams);

  if (!params) {
    const body: FoodNutritionResponse = {
      success: false,
      message:
        "잘못된 요청 파라미터입니다. pageNo는 1 이상, numOfRows는 1~100 사이의 정수여야 합니다.",
    };
    return Response.json(body, { status: 400 });
  }

  const { foodNm, pageNo, numOfRows } = params;

  /**
   * 공공데이터 API 요청 URL 생성
   * 디코딩된 서비스키를 사용하여 URL 객체가 표준 인코딩을 수행하도록 합니다.
   */
  const url = new URL(FOOD_API_BASE_URL);
  url.searchParams.set("serviceKey", apiKey);
  url.searchParams.set("foodLv3Cd", FOOD_LV3_SNACK_CATEGORY_CODE);
  url.searchParams.set("pageNo", String(pageNo));
  url.searchParams.set("numOfRows", String(numOfRows));
  url.searchParams.set("type", "json");

  if (foodNm) {
    url.searchParams.set("foodNm", foodNm);
  }

  const requestUrl = url.toString();

  try {
    const externalRes = await fetch(requestUrl, {
      signal: AbortSignal.timeout(DEFAULT_API_TIMEOUT_MS),
    });

    if (!externalRes.ok) {
      const body: FoodNutritionResponse = {
        success: false,
        message: `외부 API 호출에 실패했습니다. (status: ${externalRes.status})`,
      };
      return Response.json(body, { status: 502 });
    }

    const rawData: FoodApiRawResponse = await externalRes.json();
    const { header, body: responseBody } = rawData.response;

    /** 공공데이터 API 결과 코드 검증 */
    if (header.resultCode !== FOOD_API_SUCCESS_CODE) {
      const body: FoodNutritionResponse = {
        success: false,
        message: `공공데이터 API 오류: ${header.resultMsg}`,
      };
      return Response.json(body, { status: 502 });
    }

    const successBody: FoodNutritionResponse = {
      success: true,
      data: responseBody.items ?? [],
      totalCount: Number(responseBody.totalCount),
      pageNo: Number(responseBody.pageNo),
      numOfRows: Number(responseBody.numOfRows),
    };
    return Response.json(successBody, { status: 200 });
  } catch (error) {
    /** 타임아웃 또는 네트워크 오류 처리 */
    const isTimeout = error instanceof Error && error.name === "TimeoutError";
    const body: FoodNutritionResponse = {
      success: false,
      message: isTimeout
        ? "외부 API 요청이 시간 초과되었습니다."
        : "외부 API 호출 중 오류가 발생했습니다.",
    };
    return Response.json(body, { status: 502 });
  }
}
