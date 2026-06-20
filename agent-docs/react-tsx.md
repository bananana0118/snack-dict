## React 주의 규칙

### useEffect 내 setState 동기 호출 금지

`useEffect` 본문에서 `setState`를 동기적으로 호출하면 cascading render를 유발한다.

```typescript
// ❌ 금지 — cascading render 발생
useEffect(() => {
  setState(value);
}, [dependency]);

// ❌ 금지 — 렌더 중 ref.current 접근 (컴포넌트가 예상대로 업데이트되지 않을 수 있음)
// https://react.dev/reference/react/useRef
const prevRef = useRef(dependency);
if (prevRef.current !== dependency) {
  prevRef.current = dependency; // ❌ 렌더 중 ref 쓰기/읽기 금지
  setState(value);
}

// ✅ 권장 — useState로 이전 값 추적 (React 공식 권장 패턴)
// https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
const [prevDependency, setPrevDependency] = useState(dependency);
if (prevDependency !== dependency) {
  setPrevDependency(dependency);
  setState(value);
}
```

외부 시스템 연동(소켓, DOM, 외부 라이브러리)이 아닌 순수 state 초기화는 `useEffect` 대신 렌더 중 비교 패턴을 사용한다.

## TypeScript 주의 규칙

### `React.FC` 사용 지양

컴포넌트를 정의할 때 `React.FC` (또는 `React.FunctionComponent`) 타입의 사용을 지양한다. 대신 일반적인 함수 선언(Function Declaration)과 Props 타입을 명시적으로 지정하는 방식을 사용한다.

**이유:**

- `children` 속성이 명시적이지 않아 의도치 않은 타입 허용이나 에러가 발생할 수 있다.
- 제네릭(Generic) 컴포넌트를 작성하기 어렵다.
- 함수 선언식(`function`)이 호이스팅(Hoisting) 및 가독성 측면에서 더 유리하다.

```typescript
// ❌ 금지 — React.FC 사용
const MyComponent: React.FC<MyProps> = ({ title, children }) => {
  return <div>{title}{children}</div>;
};

// ✅ 권장 — 일반 함수 선언문과 명시적 Props
interface MyProps {
  title: string;
  children?: React.ReactNode;
}

export function MyComponent({ title, children }: MyProps) {
  return <div>{title}{children}</div>;
}
```

---

## SOLID 원칙 기반 설계

컴포넌트 및 커스텀 훅을 설계할 때 다음 SOLID 원칙을 고려한다.

### 1. SRP (단일 책임 원칙)

- 하나의 컴포넌트는 하나의 시각적 역할 또는 로직만 담당한다.
- 거대한 컴포넌트는 더 작은 단위로 분리하고, 복잡한 비즈니스 로직이나 데이터 패칭은 커스텀 훅(Custom Hook)으로 분리하여 렌더링 로직과 결합되지 않도록 한다.

### 2. OCP (개방-폐쇄 원칙)

- 컴포넌트의 내부 코드를 직접 수정하지 않고도 동작이나 레이아웃을 확장할 수 있어야 한다.
- `children`, `render props`, 다형성(`as` prop) 패턴 등을 적극 활용하여 컴포넌트의 확장 가능성을 열어 둔다(Open).

### 3. LSP (리스코프 치환 원칙)

- 기본 HTML 요소를 감싸는 래퍼 컴포넌트(예: Button)는 기본 HTML 요소의 속성을 모두 지원해야 한다.
- `ComponentPropsWithoutRef<"button">` 등을 상속받아 표준 HTML 속성(onClick, disabled 등)을 그대로 넘겨받을 수 있게 설계한다.

### 4. ISP (인터페이스 분리 원칙)

- 컴포넌트는 자신이 실제로 렌더링에 사용하는 Props 데이터에만 의존해야 한다.
- 백엔드 API에서 내려온 거대한 객체를 통째로 Props로 넘기지 말고, 해당 UI 컴포넌트가 필요로 하는 최소한의 필드 단위로 쪼개어 전달한다.

### 5. DIP (의존성 역전 원칙)

- UI 컴포넌트 안에서 직접 외부 API를 호출하는 등 구체적인 구현에 의존하지 않는다.
- UI 컴포넌트는 Props로 데이터를 주입받거나, 상태 관리 스토어 및 커스텀 훅과 같은 추상화된 계층에 의존하도록 설계하여 테스트와 재사용을 용이하게 한다.
