-- ============================================================================
-- brands: 브랜드 마스터 테이블
-- ============================================================================
-- 크라운, 오리온 등 제조사 정보를 관리합니다.
-- 데이터 출처: 공공 API의 mfrNm 필드에서 자동 추출 + 수동 큐레이션

create table if not exists public.brands (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  logo_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_brands_name
on public.brands (name);

comment on table public.brands is '브랜드(제조사) 마스터';
comment on column public.brands.name is '브랜드명 (예: 오리온, 크라운)';
comment on column public.brands.logo_url is '브랜드 로고 이미지 URL (선택)';

-- ============================================================================
-- Data API 권한
-- ============================================================================
-- 서버 ETL script가 service role key로 접근할 수 있게 허용

grant usage on schema public to service_role;

grant select, insert, update, delete
on table public.brands
to service_role;

grant usage, select, update
on all sequences in schema public
to service_role;