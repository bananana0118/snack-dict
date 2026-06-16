-- ============================================================================
-- snack_stores: 과자 × 판매처 매핑 테이블 (다대다)
-- ============================================================================
-- 한 과자는 여러 판매처에서 팔리고, 한 판매처는 여러 과자를 판매합니다.
-- 데이터 출처: 수동 큐레이션

create table snack_stores (
  snack_id      bigint not null references snacks(id) on delete cascade,
  store_id      bigint not null references stores(id) on delete restrict,

  store_url     text,
  is_exclusive  boolean not null default false,

  created_at    timestamptz not null default now(),

  -- 복합 PK: (snack_id, store_id) 조합은 유일해야 함
  primary key (snack_id, store_id)
);

-- store_id로 역방향 검색용 (특정 판매처에서 파는 과자 찾기)
create index idx_snack_stores_store_id on snack_stores (store_id);

-- 전용 상품 필터링용
create index idx_snack_stores_is_exclusive on snack_stores (is_exclusive) where is_exclusive = true;

comment on table snack_stores is '과자 × 판매처 매핑 (다대다)';
comment on column snack_stores.snack_id is '과자 ID (FK)';
comment on column snack_stores.store_id is '판매처 ID (FK)';
comment on column snack_stores.store_url is '해당 판매처에서의 개별 상품 URL';
comment on column snack_stores.is_exclusive is '전용상품 여부 (예: GS25 전용)';