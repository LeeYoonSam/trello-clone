# Trello Clone
작업 공간, 보드, 목록, 카드, 감사 로그/활동 및 구성원 역할을 모두 갖춘 엔드투엔드 풀스택과 트렐로 클론을 만드는 방법을 배웁니다.

### 기술 스펙
- Tailwind
- React.js
- Next.js (14)
- Prisma
- MySQL

## Reference
- [Github & Live Website](https://www.codewithantonio.com/)

## Environment Setup
### next app 생성
```base
npx create-next-app@latest trello-clone
Need to install the following packages:
create-next-app@14.0.3
Ok to proceed? (y) y
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
```

### shadcn-ui 설치
```baseh
npx shadcn-ui@latest init
✔ Would you like to use TypeScript (recommended)? … no / yes
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Neutral
✔ Where is your global CSS file? … app/globals.css
✔ Would you like to use CSS variables for colors? … no / yes
✔ Where is your tailwind.config.js located? … tailwind.config.ts
✔ Configure the import alias for components: … @/components
✔ Configure the import alias for utils: … @/lib/utils
✔ Are you using React Server Components? … no / yes
✔ Write configuration to components.json. Proceed? … yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed.
```

## Folders Setup
- 폴더와 관련한 Route 시스템 설명
  - folder/page.tsx: /folder 의 page 표시
  - (folder)/page.tsx: 폴더명이 없는것과 동일
  - (folder)/layout.tsx: children 으로 ReactNode 를 선언해야 하위 폴더 적용(공통 작업 구현 이점)
    - (folder)/folder1/page.tsx: /folder1 의 page 표시
    - (folder)/folder2/page.tsx: /folder2 의 page 표시
  - api/folder/route.ts: ts 로 파일을 생성
    - /api/folder 로 route 에 있는 method 로 API 호출
    
## Marketing Page
- [layout 추가](app/(marketing)/layout.tsx)
  - navbar, footer 추가
- [page 작업](app/(marketing)/page.tsx)
  - layout 안에 들어가는 ReactNode
  - 컨텐츠 구성
    - font, ui 구현
- [Navbar 추가](app/(marketing)/_components/navbar.tsx)
- [Footer 추가](app/(marketing)/_components/footer.tsx)
- [Logo 컴포넌트 추가](components/logo.tsx)
  - svg 이미지 적용
- next/font/local
  ```
  const headingFont = localFont({
    src: "../public/fonts/font.woff2",
  });

  사용: cn("some class names", headingFont.className)
  ```
- next/font/google
  ```
  const textFont = Poppins({
    subsets: ["latin"],
    weight: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ],
  });

  사용: cn("some class names", textFont.className)
  ```

## Authentication

### [Site Info 추가](config/site.ts)
- 메타 데이터에 들어갈 name, description 추가

### [Clerk 설정]
- 프로젝트 생성
- [디펜던시 설치](https://clerk.com/docs/quickstarts/nextjs?_gl=1*1mt122c*_gcl_au*MTIxNzc3MzQ0OC4xNjkzNDQyMTU1)
  - `npm install @clerk/nextjs`
  - .env 작성
- `ClerkProvider` 추가
- `middleware` 추가
  ```
  export default authMiddleware({
    publicRoutes: ["/"]
  });
  ```
  - authMiddleware `publicRoutes` 추가
- `sign-in/up` 페이지 추가
  - [sign-in](app/(platform)/(clerk)/sign-in/[[...sign-in]]/page.tsx)
  - [sign-up](app/(platform)/(clerk)/sign-up/[[...sign-up]]/page.tsx)
- .env - Sign 관련 URL 추가

## Organizations
- Clerk 대시보드에서 Organization 활성화
- app/(platform)/(clerk)/select-org/[[...select-org]]/page.tsx 추가
- app/(platform)/(dashboard)/organization/[organizationId]/page.tsx 추가
- app/(platform)/(dashboard)/layout.tsx 추가
- middleware.ts
  - afterAuth 추가
- components/ui/button.tsx
  - variant primary 생성

## Sidebar
- app/(platform)/(dashboard)/organization/layout.tsx 추가
  - 사이드바 추가를 위한 상위 레이아웃
- app/(platform)/(dashboard)/_components/mobile-sidebar.tsx 추가
- app/(platform)/(dashboard)/organization/[organizationId]/_components/org-control.tsx 추가
- app/(platform)/(dashboard)/_components/sidebar.tsx 추가
- hooks/use-mobile-sidebar.ts 추가

### dependencies
- npm i usehooks-ts
  - 타입스크립트로 작성되어 바로 사용할 수 있는 React 후크 라이브러리.
- npx shadcn-ui@latest add skeleton
  - 콘텐츠가 로드되는 동안 플레이스홀더를 표시하는 데 사용합니다.
- npx shadcn-ui@latest add accordion
  - 콘텐츠의 섹션을 각각 표시하는 세로로 쌓인 대화형 제목 집합입니다.
- npx shadcn-ui@latest add separator
  - 콘텐츠를 시각적 또는 의미론적으로 구분합니다.
- npm i zustand
  - 단순화된 플럭스 원리를 사용하는 작고 빠르며 확장 가능한 베어본 상태 관리 솔루션
- npx shadcn-ui@latest add sheet
  - 대화 상자 구성 요소를 확장하여 화면의 기본 콘텐츠를 보완하는 콘텐츠를 표시합니다.

## Workspace Settings
- app/(platform)/(dashboard)/organization/[organizationId]/settings/page.tsx 추가

## Server Actions
- npx prisma init
- create database - mysql 데터베이스 생성
- prisma.prisma 모델(테이블) 추가
- app/(platform)/(dashboard)/organization/[organizationId]/page.tsx 수정
- app/(platform)/(dashboard)/organization/[organizationId]/board.tsx 추가
- app/(platform)/(dashboard)/organization/[organizationId]/form.tsx 추가
- app/(platform)/(dashboard)/organization/[organizationId]/form-input.tsx 추가

### dependencies
- npm i -D prisma
- npm i @prisma/client
- npm i zod
- npx shadcn-ui@latest add input

## useAction abstraction
- lib/create-safe-action.ts 추가
  - 서버 액션 관련 정의
- hooks/use-action.ts 추가
  - 서버 액션 정의를 사용하는 훅
- 추상화된 액션을 사용해서 보드 만들기 리팩토링
  - actions/create-board/index.ts 추가
  - actions/create-board/schema.ts 추가
  - actions/create-board/types.ts 추가
- app/(platform)/(dashboard)/organization/[organizationId]/form.tsx 수정

## Form Components

- app/(platform)/(dashboard)/organization/[organizationId]/form.tsx 수정
  - FormInput, FormSubmit 교체
- Form 관련 컴포넌트 분리
  - components/form/form-errors.tsx
  - components/form/form-input.tsx
  - components/form/form-submit.tsx

### dependencies
- npx shadcn-ui@latest add label

## Board Popover Form
- app/(platform)/(dashboard)/organization/[organizationId] 폴더 파일 정리
  - form 관련 컴포넌트 제거
- app/(platform)/(dashboard)/organization/[organizationId]/page.tsx 수정
- app/(platform)/(dashboard)/organization/[organizationId]/_components/info.tsx 추가
  - 보드 정보
- app/(platform)/(dashboard)/organization/[organizationId]/_components/board-list.tsx 추가
- components/hint.tsx 툴팁 추가
- components/form/form-popover.tsx 팝오버 추가
- components/ui/popover.tsx 수정
  - PopoverClose 추가
- app/(platform)/layout.tsx 토스트 추가

### dependencies
- npx shadcn-ui@latest add tooltip
- npx shadcn-ui@latest add popover
- npm i sonner
  - 토스트

## Board Server Action
- [unsplash](https://unsplash.com/ko) 앱 생성
  - 이미지 제공
- lib/unsplash.ts 추가
  - unsplash API 를 사용해서 이미지 가져오기
- components/form/form-picker.tsx 추가
  - 랜덤 이미지 선택
- components/form/form-popover.tsx 수정
  - form-picker 사용
- next.config.js 수정
  - 이미지 remotePatterns 추가
- constants/images.ts 추가
  - 기본 이미지 추가(오류 발생시 사용할 기본 이미지 추가)


### dependencies
- npm i unsplash-js

## Board List
## Board Page
## List Component
## List Header
## List Options
## Card Form
## Drag n' Drop
## Card Modal
## Card Actions
## Activity / Audit Logs
## Stripe & Board Limits
## 30 Deployment
