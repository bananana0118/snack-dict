-- ============================================================================
-- categories: 카테고리 마스터 테이블
-- ============================================================================
-- 스낵, 비스킷, 파이/케이크 등 과자 분류를 관리합니다.
-- 데이터 출처: 마이그레이션 시 시드 데이터로 8개 미리 등록

create table categories (
  id            bigint generated always as identity primary key,
  code          text not null unique,
  name          text not null,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

-- code로 코드에서 자주 참조하므로 인덱스
create index idx_categories_code on categories (code);

-- UI 정렬용
create index idx_categories_display_order on categories (display_order);

comment on table categories is '과자 카테고리 마스터';
comment on column categories.code is '코드 식별자 (코드에서 참조용, 변경 X)';
comment on column categories.name is '표시 이름 (UI 노출용, 변경 가능)';
comment on column categories.display_order is 'UI 정렬 순서 (작은 값이 앞)';

-- ============================================================================
-- 시드 데이터: MVP 1차 카테고리 8개
-- ============================================================================

insert into categories (code, name, display_order) values
  ('SNACK',     '스낵',         1),
  ('BISCUIT',   '비스킷',       2),
  ('PIE',       '파이/케이크',  3),
  ('CHOCOLATE', '초콜릿',       4),
  ('JELLY',     '젤리',         5),
  ('CANDY_GUM', '캔디&껌',      6),
  ('BREAD',     '빵',           7),
  ('RICE_CAKE', '떡',           8);