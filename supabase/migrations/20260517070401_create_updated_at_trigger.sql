-- ============================================================================
-- updated_at 자동 갱신 트리거
-- ============================================================================
-- UPDATE 시 updated_at을 자동으로 현재 시간으로 갱신하는 트리거입니다.
-- updated_at 컬럼이 있는 모든 테이블에 적용합니다.

-- 1) 트리거가 실행할 함수 정의
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function set_updated_at() is 'UPDATE 시 updated_at을 현재 시간으로 자동 갱신';

-- 2) 각 테이블에 트리거 적용
create trigger trg_brands_updated_at
  before update on brands
  for each row execute function set_updated_at();

create trigger trg_stores_updated_at
  before update on stores
  for each row execute function set_updated_at();

create trigger trg_snacks_updated_at
  before update on snacks
  for each row execute function set_updated_at();

create trigger trg_snack_nutritions_updated_at
  before update on snack_nutritions
  for each row execute function set_updated_at();