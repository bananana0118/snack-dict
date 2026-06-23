-- ============================================================================
-- service_role 권한 부여
-- ============================================================================
-- 목적:
-- - 서버 ETL 스크립트에서 Supabase service role key로 public 테이블 접근 허용
-- - 현재 존재하는 식품 데이터 관련 테이블에 명시적으로 권한 부여
-- - 앞으로 새로 생성되는 public 테이블/sequence에도 service_role 권한 자동 부여
--
-- 주의:
-- - anon, authenticated에는 권한을 주지 않음
-- - 서버 ETL 전용 권한만 service_role에 부여
-- ============================================================================


-- ============================================================================
-- 1. public schema 접근 권한
-- ============================================================================
-- table 권한이 있어도 schema usage 권한이 없으면 접근이 막힐 수 있음.

grant usage on schema public to service_role;


-- ============================================================================
-- 2. 현재 존재하는 ETL 대상 테이블에 명시적으로 권한 부여
-- ============================================================================
-- 이미지 기준 테이블 목록:
-- brands, categories, flavors, snack_flavors, snack_nutritions,
-- snack_stores, snacks, stores

grant select, insert, update, delete
on table
  public.brands,
  public.categories,
  public.flavors,
  public.snack_flavors,
  public.snack_nutritions,
  public.snack_stores,
  public.snacks,
  public.stores
to service_role;


-- ============================================================================
-- 3. 현재 존재하는 identity / sequence 권한 부여
-- ============================================================================
-- bigint generated always as identity, serial 등을 쓰는 테이블은
-- 내부적으로 sequence를 사용하므로 sequence 권한도 필요할 수 있음.

grant usage, select, update
on all sequences in schema public
to service_role;


-- ============================================================================
-- 4. 앞으로 새로 생성되는 테이블에 기본 권한 부여
-- ============================================================================
-- 이후 migration에서 postgres role이 public schema에 새 테이블을 만들면
-- service_role에 select/insert/update/delete 권한이 자동 부여됨.

alter default privileges for role postgres in schema public
grant select, insert, update, delete on tables to service_role;


-- ============================================================================
-- 5. 앞으로 새로 생성되는 sequence에 기본 권한 부여
-- ============================================================================
-- 이후 생성되는 identity/serial sequence에도 service_role 권한 자동 부여.

alter default privileges for role postgres in schema public
grant usage, select, update on sequences to service_role;


-- ============================================================================
-- 참고: public schema의 모든 현재 테이블에 한 번에 권한을 주고 싶을 때
-- ============================================================================
-- 아래 코드는 위의 "명시적 테이블 목록" 대신 사용할 수 있음.
-- 지금은 명시적으로 테이블을 지정했으므로 주석 처리.
--
-- grant select, insert, update, delete
-- on all tables in schema public
-- to service_role;
--
-- grant usage, select, update
-- on all sequences in schema public
-- to service_role;
-- ============================================================================