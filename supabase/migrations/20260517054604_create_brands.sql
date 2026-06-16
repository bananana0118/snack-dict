-- ============================================================================
-- brands: 브랜드 마스터 테이블
-- ============================================================================
-- 크라운, 오리온 등 제조사 정보를 관리합니다.
-- 데이터 출처: 공공 API의 mfrNm 필드에서 자동 추출 + 수동 큐레이션

create table brands (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  logo_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 브랜드명 인덱스 추가
create index idx_brands_name on brands (name);

-- 테이블 코멘트 (Studio에서 보임)
comment on table brands is '브랜드(제조사) 마스터';
comment on column brands.name is '브랜드명 (예: 오리온, 크라운)';
comment on column brands.logo_url is '브랜드 로고 이미지 URL (선택)';