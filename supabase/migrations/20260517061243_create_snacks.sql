-- ============================================================================
-- snacks: 과자 상품 마스터 테이블 (서비스 핵심)
-- ============================================================================
-- 과자의 모든 큐레이션 정보를 관리합니다.
-- 데이터 출처: 공공 API (자동) + 수동 큐레이션 (가격, 카테고리, 맛 매핑 등)
-- 맛 정보는 snack_flavors 테이블에서 다대다로 관리합니다.

create table snacks (
  id              bigint generated always as identity primary key,

  -- 기본 정보
  name            text not null,
  brand_id        bigint references brands(id) on delete restrict,
  category_id     bigint references categories(id) on delete restrict,

  -- 큐레이션 정보 (수동 입력)
  price           integer,
  description     text,
  image_url       text,
  released_at     timestamptz,

  -- 판매 상태
  sale_status     text not null default 'on_sale',

  -- 공공 API 연결 키 (ETL upsert용)
  public_food_cd  text unique,

  -- 메타데이터
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- 판매 상태는 정해진 값만 허용
  constraint snacks_sale_status_check
    check (sale_status in ('on_sale', 'sold_out', 'discontinued'))
);

create index idx_snacks_brand_id on snacks (brand_id);
create index idx_snacks_category_id on snacks (category_id);
create index idx_snacks_released_at on snacks (released_at desc);
create index idx_snacks_sale_status on snacks (sale_status);
create index idx_snacks_public_food_cd on snacks (public_food_cd);

comment on table snacks is '과자 상품 마스터';
comment on column snacks.name is '제품명';
comment on column snacks.brand_id is '브랜드 ID (FK → brands.id)';
comment on column snacks.category_id is '카테고리 ID (FK → categories.id)';
comment on column snacks.description is '상품 설명 (마케팅 문구, 맛 설명 등 자유 텍스트)';
comment on column snacks.price is '가격 (원, 정수)';
comment on column snacks.released_at is '출시일 (신상 여부 판단용)';
comment on column snacks.sale_status is '판매 상태: on_sale | sold_out | discontinued';
comment on column snacks.public_food_cd is '공공 API 식품코드 (foodCd) - ETL upsert 키';