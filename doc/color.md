## 🎨 Neo-Indigo (Light Mode / White Base)

### ✅ Base (배경 & 레이아웃)

```css
--bg-root:        #FAFAFA;   /* 전체 배경 */
--bg-surface:     #FFFFFF;   /* 카드, 패널 */
--bg-muted:       #F1F5F9;   /* 입력창, 서브 영역 */
```

---

### ✅ Text

```css
--text-primary:   #0F172A;   /* 메인 텍스트 */
--text-secondary: #475569;   /* 설명, placeholder */
--text-muted:     #94A3B8;   /* 비활성 */
```

---

### ✅ Brand (핵심 브랜드 컬러)

```css
--brand-primary:  #6366F1;   /* Indigo */
--brand-hover:    #4F46E5;
--brand-soft:     #EEF2FF;   /* 버튼/하이라이트 배경 */
```

👉 버튼 / 탭 / 활성 상태는 전부 이걸로 통일

---

### ✅ Accent (인터랙션 포인트)

```css
--accent-cyan:    #22D3EE;   /* 링크, 포커스 */
--accent-cyan-bg: #ECFEFF;
```

---

### ✅ State (검증 결과용 – 핵심)

```css
--state-success:  #22C55E;   /* valid */
--state-success-bg: #DCFCE7;

--state-error:    #EF4444;   /* invalid */
--state-error-bg: #FEE2E2;

--state-warning:  #F59E0B;
--state-warning-bg: #FEF3C7;
```

---

### ✅ Border & Divider

```css
--border-default: #E2E8F0;
--border-focus:   #6366F1;
```

---

## 🧩 컴포넌트 적용 예시

### 🔘 Primary Button

```css
.btn-primary {
  background: var(--brand-primary);
  color: white;
}
.btn-primary:hover {
  background: var(--brand-hover);
}
```

---

### 🧪 Regex / JSON Validation Result

```css
.result-valid {
  color: var(--state-success);
  background: var(--state-success-bg);
}

.result-error {
  color: var(--state-error);
  background: var(--state-error-bg);
}
```

---

### 📝 Input / Textarea (정규식, JSON 입력)

```css
.input {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
}
.input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 2px var(--brand-soft);
}
```

---

## ✨ 이 컬러셋의 장점

* 흰 배경이라 **가독성 최고**
* Indigo가 과하지 않고 **브랜드 기억 잘 남음**
* 정규식 / JSON / base64 등 **결과 상태 표현 깔끔**
* 나중에 다크모드 만들기 쉬움 (거의 반전만 하면 됨)

