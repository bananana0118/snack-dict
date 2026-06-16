-- ============================================================================
-- snack_nutritions: 과자 영양정보 테이블 (1:1)
-- ============================================================================
-- 한 과자엔 하나의 영양정보. snack_id가 PK이자 FK라서 자동으로 1:1 강제됨.
-- 데이터 출처: 공공 API의 영양성분 필드 → ETL로 자동 적재

create table snack_nutritions (
  snack_id        bigint primary key references snacks(id) on delete cascade,

  -- 1회 제공량 정보
  serving_size    text,

  -- 영양 성분 (numeric으로 부동소수점 오차 방지)
  calories        numeric(8, 2),
  protein         numeric(8, 2),
  fat             numeric(8, 2),
  saturated_fat   numeric(8, 2),
  trans_fat       numeric(8, 2),
  carbs           numeric(8, 2),
  sugar           numeric(8, 2),
  sodium          numeric(8, 2),
  cholesterol     numeric(8, 2),

  -- 데이터 출처 추적
  source          text not null default 'public_api',
  source_food_cd  text,
  synced_at       timestamptz,

  -- 메타데이터
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- 출처는 정해진 값만 허용
  constraint snack_nutritions_source_check
    check (source in ('public_api', 'manual'))
);

-- 공공 API 식품코드로 검색용 (ETL 시 사용)
create index idx_snack_nutritions_source_food_cd on snack_nutritions (source_food_cd);

comment on table snack_nutritions is '과자 영양정보 (1:1)';
comment on column snack_nutritions.snack_id is 'snacks 테이블 참조 (PK이자 FK)';
comment on column snack_nutritions.serving_size is '1회 제공량 (예: 30g, 한 봉지)';
comment on column snack_nutritions.calories is '열량 (kcal)';
comment on column snack_nutritions.protein is '단백질 (g)';
comment on column snack_nutritions.fat is '지방 (g)';
comment on column snack_nutritions.saturated_fat is '포화지방 (g)';
comment on column snack_nutritions.trans_fat is '트랜스지방 (g)';
comment on column snack_nutritions.carbs is '탄수화물 (g)';
comment on column snack_nutritions.sugar is '당류 (g)';
comment on column snack_nutritions.sodium is '나트륨 (mg)';
comment on column snack_nutritions.cholesterol is '콜레스테롤 (mg)';
comment on column snack_nutritions.source is '데이터 출처: public_api | manual';
comment on column snack_nutritions.source_food_cd is '공공 API 식품코드 (참조용 기록)';
comment on column snack_nutritions.synced_at is '마지막 동기화 시점';