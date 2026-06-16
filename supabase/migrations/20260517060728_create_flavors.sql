-- ============================================================================
-- flavors: 맛 마스터 테이블
-- ============================================================================
-- 단맛, 짠맛, 매콤 등 과자의 맛 분류를 관리합니다.
-- 데이터 출처: 마이그레이션 시 시드 데이터로 6개 미리 등록

create table flavors (
  id            bigint generated always as identity primary key,
  code          text not null unique,
  name          text not null,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

create index idx_flavors_code on flavors (code);
create index idx_flavors_display_order on flavors (display_order);

comment on table flavors is '과자 맛 마스터';
comment on column flavors.code is '코드 식별자 (코드에서 참조용, 변경 X)';
comment on column flavors.name is '표시 이름 (UI 노출용, 변경 가능)';

-- ============================================================================
-- 시드 데이터: MVP 1차 맛 6개
-- ============================================================================

insert into flavors (code, name, display_order) values
  ('SWEET',  '단맛',   1),
  ('SALTY',  '짠맛',   2),
  ('SPICY',  '매콤',   3),
  ('BITTER', '쌉쌀함', 4),
  ('SOUR',   '신맛',   5),
  ('OILY',   '느끼',   6); 