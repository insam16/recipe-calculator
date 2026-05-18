# 천디파 계산기

> **온라인 게임 [엘소드(Elsword)](https://elsword.nexon.com) 길드 콘텐츠** — 길드 음식 제작에 필요한 **작물 수량**과 **ED 비용**을 자동으로 계산해주는 웹 앱입니다.

## 기능

- 목표 아이템과 수량을 입력하면 필요한 재료(음식/작물)와 총 ED 비용을 계산
- 음식 사진 클릭으로 목표 아이템 선택
- 음식 아이템 선택 시 하위 재료(음식 → 작물) 계층 계산

## 지원 아이템

| 아이템 | 재료 | ED |
|--------|------|-----|
| 천상의 디저트 파티 | 하모니 푸딩 ×1, 허니허니 와플 ×1, 달콤동동 화채 ×1 | 30,000 |
| 하모니 푸딩 | 눈꽃 열매 ×2, 천상의 멜론 ×2 | 18,000 |
| 허니허니 와플 | 스윗 스타 포테이토 ×2, 눈꽃 열매 ×1 | 12,000 |
| 달콤동동 화채 | 천상의 멜론 ×2, 큐어 토마토 ×2 | 18,000 |

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 프로젝트 구조

```
src/
└── features/
    └── calculator/
        ├── components/     # UI 컴포넌트 (ItemSelector, ItemButton)
        ├── constants/      # 레시피 데이터, 아이템 메타
        ├── hooks/          # useCalculator (계산 로직)
        └── types.ts
```
