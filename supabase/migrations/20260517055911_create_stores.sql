-- ============================================================================
-- stores: 판매처 마스터 테이블
-- ============================================================================
-- GS25, CU, 세븐일레븐 등 판매처 정보를 관리합니다.
-- 데이터 출처: 수동 입력

create table stores (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  logo_url    text,
  base_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 판매처명으로 검색용
create index idx_stores_name on stores (name);

comment on table stores is '판매처 마스터 (편의점, 마트, 온라인 등)';
comment on column stores.name is '판매처명 (예: GS25, CU)';
comment on column stores.logo_url is '판매처 로고 이미지 URL (선택)';
comment on column stores.base_url is '판매처 메인 사이트 URL (예: https://gs25.gsretail.com)';