-- ============================================================================
-- snack_flavors: 과자 × 맛 매핑 테이블 (다대다)
-- ============================================================================
-- 한 과자는 여러 맛을 가질 수 있고, 한 맛은 여러 과자에 적용됩니다.
-- intensity로 맛의 강도(1~5)를 함께 관리합니다.
-- 데이터 출처: 수동 큐레이션

create table snack_flavors (
  snack_id    bigint not null references snacks(id) on delete cascade,
  flavor_id   bigint not null references flavors(id) on delete restrict,

  intensity   smallint not null default 3,

  created_at  timestamptz not null default now(),

  -- 복합 PK: (snack_id, flavor_id) 조합은 유일
  primary key (snack_id, flavor_id),

  -- 강도는 1~5 사이만 허용
  constraint snack_flavors_intensity_check
    check (intensity between 1 and 5)
);

-- flavor_id로 역방향 검색용 (특정 맛의 과자 찾기)
create index idx_snack_flavors_flavor_id on snack_flavors (flavor_id);

comment on table snack_flavors is '과자 × 맛 매핑 (다대다, 강도 포함)';
comment on column snack_flavors.snack_id is '과자 ID (FK)';
comment on column snack_flavors.flavor_id is '맛 ID (FK)';
comment on column snack_flavors.intensity is '맛의 강도 (1: 약함 ~ 5: 매우 강함)';