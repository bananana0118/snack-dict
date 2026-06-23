/**
 * 공공데이터포털 가공식품 영양정보 API 응답 타입
 *
 * 엔드포인트: GET /openapi/tn_pubr_public_nutri_process_info_api
 * 매핑 문서: docs/etl-field-mapping.md
 *
 * 주의: 모든 영양 수치는 string으로 옵니다. number 변환은 어댑터에서 처리.
 */

/**
 * 응답의 한 아이템 (식품 한 개)
 *
 * 실제 응답 보면서 필드 추가/수정 필요.
 * (?) 표시된 필드는 응답 확인 후 확정.
 */
export type PublicApiRawItem = {
  // === 식품 기본 정보 (snacks 테이블) ===
  foodCd: string; // → snacks.public_food_cd (upsert 키)
  foodNm: string; // → snacks.name
  mfrNm: string; // → brands.name (자동 등록 후 brand_id 매핑)

  // === 영양 정보 (snack_nutritions 테이블) ===
  enerc?: string; // → calories (kcal)
  prot?: string; // → protein (g)
  fatce?: string; // → fat (g)
  fasat?: string; // → saturated_fat (g)
  fatrn?: string; // → trans_fat (g)
  chocdf?: string; // → carbs (g)
  sugar?: string; // → sugar (g)
  nat?: string; // → sodium (mg)
  chole?: string; // → cholesterol (mg)

  // === 1회 제공량 ===
  srvSize?: string; // → snack_nutritions.serving_size

  // 외 50여 개 필드는 우리가 사용 안 함 (제외)
  // 실제 필드명이 다르면 응답 보면서 위 필드명들 수정 필요
};

/**
 * API 응답 전체 구조
 */
export type PublicApiResponse = {
  response: {
    header: {
      resultCode: string; // "00"이면 정상
      resultMsg: string;
    };
    body: {
      items: PublicApiRawItem[];
      totalCount: number;
      pageNo: number;
      numOfRows: number;
    };
  };
};
