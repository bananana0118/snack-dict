/**
 * 전국통합식품영양성분정보(가공식품) API 관련 상수
 * 출처: 공공데이터포털 (data.go.kr)
 */

/** 공공데이터포털 식품영양성분 API 기본 URL */
export const FOOD_API_BASE_URL =
  "https://api.data.go.kr/openapi/tn_pubr_public_nutri_process_info_api";

/**
 * 식품대분류(foodLv3Cd) 카테고리 코드 - "01" (과자류·빵류 또는 떡류)
 * 공공데이터포털 식품영양성분 API 응답 기준에서 개별 과자의 식별 코드가 아닌,
 * 식품을 대분류로 나눌 때 사용하는 카테고리 코드입니다.
 */
export const FOOD_LV3_SNACK_CATEGORY_CODE = "01";

/** 공공데이터 API 정상 응답 코드 */
export const FOOD_API_SUCCESS_CODE = "00";
