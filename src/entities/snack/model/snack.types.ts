/**
 * 전국통합식품영양성분정보(가공식품) 표준데이터 API 관련 타입 정의
 * 출처: 공공데이터포털 (data.go.kr)
 */

/** 공공데이터 API 응답의 개별 식품 영양성분 항목 (58개 필드) */
export interface FoodNutritionItem {
  /** 식품코드 */
  foodCd: string;
  /** 식품명 */
  foodNm: string;
  /** 데이터 구분 코드 */
  dataCd: string;
  /** 유형명 (가공식품) */
  typeNm: string;
  /** 식품원산지 코드 */
  foodOriginCd: string;
  /** 식품원산지명 */
  foodOriginNm: string;
  /** 식품대분류 코드 */
  foodLv3Cd: string;
  /** 식품대분류명 */
  foodLv3Nm: string;
  /** 식품중분류 코드 */
  foodLv4Cd: string;
  /** 식품중분류명 */
  foodLv4Nm: string;
  /** 식품소분류 코드 */
  foodLv5Cd: string;
  /** 식품소분류명 */
  foodLv5Nm: string;
  /** 식품세분류 코드 */
  foodLv6Cd: string;
  /** 식품세분류명 */
  foodLv6Nm: string;
  /** 식품세세분류 코드 */
  foodLv7Cd: string;
  /** 식품세세분류명 */
  foodLv7Nm: string;
  /** 영양성분 함량 기준량 (예: "100g") */
  nutConSrtrQua: string;
  /** 에너지 (kcal) */
  enerc: string;
  /** 수분 (g) */
  water: string;
  /** 단백질 (g) */
  prot: string;
  /** 지방 (g) */
  fatce: string;
  /** 회분 (g) */
  ash: string;
  /** 탄수화물 (g) */
  chocdf: string;
  /** 당류 (g) */
  sugar: string;
  /** 식이섬유 (g) */
  fibtg: string;
  /** 칼슘 (mg) */
  ca: string;
  /** 철 (mg) */
  fe: string;
  /** 인 (mg) */
  p: string;
  /** 칼륨 (mg) */
  k: string;
  /** 나트륨 (mg) */
  nat: string;
  /** 비타민A (μg RAE) */
  vitaRae: string;
  /** 레티놀 (μg) */
  retol: string;
  /** 베타카로틴 (μg) */
  cartb: string;
  /** 티아민/비타민B1 (mg) */
  thia: string;
  /** 리보플라빈/비타민B2 (mg) */
  ribf: string;
  /** 니아신 (mg) */
  nia: string;
  /** 비타민C (mg) */
  vitc: string;
  /** 비타민D (μg) */
  vitd: string;
  /** 콜레스테롤 (mg) */
  chole: string;
  /** 포화지방산 (g) */
  fasat: string;
  /** 트랜스지방 (g) */
  fatrn: string;
  /** 출처 코드 */
  srcCd: string;
  /** 출처명 */
  srcNm: string;
  /** 1회 제공량 */
  servSize: string;
  /** 총 내용량 */
  foodSize: string;
  /** 품목제조보고번호 */
  itemMnftrRptNo: string;
  /** 제조사명 */
  mfrNm: string;
  /** 수입업체명 */
  imptNm: string;
  /** 유통업체명 */
  distNm: string;
  /** 수입 여부 (Y/N) */
  imptYn: string;
  /** 원산지 코드 */
  cooCd: string;
  /** 원산지명 */
  cooNm: string;
  /** 데이터 생산 코드 */
  dataProdCd: string;
  /** 데이터 생산명 */
  dataProdNm: string;
  /** 생성 일자 (YYYY-MM-DD) */
  crtYmd: string;
  /** 기준 일자 (YYYY-MM-DD) */
  crtrYmd: string;
  /** 기관 코드 */
  insttCode: string;
  /** 기관명 */
  insttNm: string;
}

/** 공공데이터 API 응답 헤더 */
export interface FoodApiResponseHeader {
  /** 결과 코드 ("00" = 정상) */
  resultCode: string;
  /** 결과 메시지 */
  resultMsg: string;
  /** 응답 타입 */
  type: string;
}

/** 공공데이터 API 응답 본문 */
export interface FoodApiResponseBody {
  /** 식품 영양성분 항목 목록 */
  items: FoodNutritionItem[];
  /** 전체 데이터 수 */
  totalCount: string;
  /** 페이지당 항목 수 */
  numOfRows: string;
  /** 현재 페이지 번호 */
  pageNo: string;
}

/** 공공데이터 API 전체 응답 구조 */
export interface FoodApiRawResponse {
  response: {
    header: FoodApiResponseHeader;
    body: FoodApiResponseBody;
  };
}

/** Route Handler에서 클라이언트로 반환하는 정규화된 성공 응답 */
export interface FoodNutritionSuccessResponse {
  success: true;
  data: FoodNutritionItem[];
  totalCount: number;
  pageNo: number;
  numOfRows: number;
}

/** Route Handler에서 클라이언트로 반환하는 에러 응답 */
export interface FoodNutritionErrorResponse {
  success: false;
  message: string;
}

/** Route Handler 응답 유니온 타입 */
export type FoodNutritionResponse = FoodNutritionSuccessResponse | FoodNutritionErrorResponse;
