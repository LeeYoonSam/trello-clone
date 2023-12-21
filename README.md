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
- prisma/schema.prisma 모델 수정
  - 모델 수정 후 prisma migrate
    - npx prisma migrate reset -> yes
    - npx prisma db push
    - npx prisma generate
- app/(platform)/(dashboard)/_components/navbar.tsx 수정
  - navbar 에서도 board 를 만들수 있도록 FormPopover 로 버튼 감싸기

### Note
- `asChild`: 컴포넌트의 렌더링을 단일 자식 엘리먼트에 위임합니다.

### dependencies
- npm i unsplash-js

## Board List
- app/(platform)/(dashboard)/organization/[organizationId]/_components/board-list.tsx 수정
  - BoardList 구현
- app/(platform)/(dashboard)/organization/[organizationId]/page.tsx 수정
  - Suspense 추가 및 스켈레톤 UI 적용

### Note
- `Suspense`: 
  - 무언가를 기다릴 때 사용합니다. 
  - **children**이 로딩되기 전에 **fallback**을 보여줄 수 있습니다.

## Board Page
- app/(platform)/(dashboard)/board/[boardId]/page.tsx 추가
- app/(platform)/(dashboard)/board/[boardId]/layout.tsx 추가
  - 배경 이미지 추가(화면에 가득찬 이미지 추가)
    ```
    <div className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{backgroundImage: `url(${board.imageFullUrl})`}}
    >
    ```
- app/(platform)/(dashboard)/board/[boardId]/_components/board-navbar.tsx 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/board-title-form.tsx 추가
- components/ui/button.tsx 수정
  - transparent variant 추가
- components/ui/input.tsx 수정
  - focus-visible:ring-offset-2 -> focus-visible:ring-offset-0 수정
- actions/delete-board 추가
  - index.ts
  - schema.ts
  - types.s
- app/(platform)/(dashboard)/board/[boardId]/_components/board-navbar.tsx 수정
  - 옵션 버튼 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/board-options.tsx 추가
  - 옵션 팝오버
  - 보드 삭제

### dependencies
- npm i lodash
  - array, collection, date 등 데이터의 필수적인 구조를 쉽게 다룰 수 있게끔 하는데에 사용
- npm i -D @types/lodash

## List Component
- prisma/schema.prisma 수정
  - List, Card 모델 추가
  - npx prisma migrate reset | npx prisma db push | npx prisma generate
- List 관련 컴포넌트 추가
  - app/(platform)/(dashboard)/board/[boardId]/_components/list-container.tsx
  - app/(platform)/(dashboard)/board/[boardId]/_components/list-form.tsx
  - app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper.tsx
- app/(platform)/(dashboard)/board/[boardId]/_components/list-form.tsx 수정
  - DB에 리스트 추가

## List Header
- app/(platform)/(dashboard)/board/[boardId]/_components/list-container.tsx 수정
- app/(platform)/(dashboard)/board/[boardId]/_components/list-item.tsx 추가
  - 리스트를 구성하는 개별 아이템 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/list-header.tsx 추가
  - 리스트 아이템 헤더
- actions/update-list 리스트 업데이트 액션 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/list-header.tsx 수정

## List Options
- app/(platform)/(dashboard)/board/[boardId]/_components/list-options.tsx 추가
  - 옵션 컴포넌트 생성
- Action 추가 
  - actions/delete-list
  - actions/copy-list
- app/(platform)/(dashboard)/board/[boardId]/_components/list-header.tsx 수정
  - 옵션 컴포넌트 추가

## Card Form
- app/(platform)/(dashboard)/board/[boardId]/_components/list-header.tsx 수정
- app/(platform)/(dashboard)/board/[boardId]/_components/list-item.tsx 수정
  - 카드 컴포넌트 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/card-form.tsx 추가
  - 카드 컴포넌트 구현
- components/form/form-textarea.tsx
  - textarea form 컴포넌트 구현
- Action 추가
  - actions/create-card
- app/(platform)/(dashboard)/board/[boardId]/_components/list-item.tsx 수정
  - CardItem 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/card-item.tsx
  - CardItem 컴포넌트 생성
- app/(platform)/(dashboard)/board/[boardId]/_components/card-form.tsx 수정
  - 카드를 추가 할수 있도록 Action 연결
  
### dependencies
- npx shadcn-ui@latest add textarea

### Note
- useFormStatus()
  - 마지막 form 제출의 상태 정보를 제공하는 훅입니다.

## Drag n' Drop
- app/(platform)/(dashboard)/board/[boardId]/_components/list-container.tsx 수정
  - 컨테이너에 DragDropContext 추가, 리스트를 드래그 하기 위해 ListItem 에 Droppable 컴포넌트 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/list-item.tsx 수정
  - 리스트 아이템을 드래그 할 수 있게 Draggable 추가
  - 리스트 아이템의 카드 드래그 하기 위해 CardItem 영역에 Droppable 컴포넌트 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/card-item.tsx 수정
  - CardItem을 드래그 할 수 있게 Draggable 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/list-container.tsx 수정
  - onDragEnd 구현으로 리스트 이동, 카드 이동, 카드를 다른 리스트로 이동등의 드래그앤드롭 기능 추가
- Actions 추가
  - actions/update-list-order
    - 리스트의 이동 시 데이터 저장
  - actions/update-card-order
    - 카드의 이동 시 데이터 저장
  - app/(platform)/(dashboard)/board/[boardId]/_components/list-container.tsx 수정
    - execute 실행 및 드래그로 순서 변경

### dependencies
- npm i @hello-pangea/dnd
  - React 드래그 앤 드롭

## Card Modal
- hooks/use-card-modal.ts 생성
  - card modal 커스텀 훅 생성
- components/modals/card-modal/index.tsx 생성
  - 공통으로 사용 할 CardModal 컴포넌트 추가
  - use-card-modal 커스텀 훅을 사용해서 모달 구성
- components/providers/modal-provider.tsx 생성
  - CardModal 을 감싸고 있는 컴포넌트
- app/(platform)/layout.tsx 수정
  - 하위 페이지에서 공통으로 모달을 사용 할 수 있게 상위 layout 에 ModalProvider 컴포넌트를 추가
- app/(platform)/(dashboard)/board/[boardId]/_components/card-item.tsx 수정
  - useCardModal 을 사용해서 카드 클릭시 모달이 뜨도록 변경
- components/ui/dialog.tsx 수정
  - DialogOverlay(다이얼로그 박스 바깥 배경 영역) 색상 변경
- components/providers/query-provider.tsx 생성
  - react-query 를 사용하기 위한 프로바이더
- app/(platform)/layout.tsx 수정
  - QueryProvider 를 추가
- app/api/cards/[cardId]/route.ts 생성
  - 카드 타이틀 조회용 Get API 추가
- lib/fetchers.ts 생성
  - url 을 전달해서 응답을 받아오는 lib 추가
- components/modals/card-modal/index.tsx 수정
  - API 로 타이틀 가져와서 표시
- components/modals/header.tsx 생성
  - 카드모달 헤더 구성
  - 스켈레톤 생성
- actions/update-card 생성
  - 카드 타이틀 업데이트를 위한 action
- components/modals/header.tsx 수정
  - 헤더에 카드 타이틀 업데이트 액션 연동

### dependencies
- npx shadcn-ui@latest add dialog
- npm i @tanstack/react-query
  - TS/JS, React, Solid, Vue 및 Svelte를 위한 강력한 비동기 상태 관리

### Note
- Array.splice(start, deleteCount) : 엘리먼트를 배열에서 삭제하거나 그 자리에 새로운 엘리먼트 삽입, 반환값은 삭제된 엘리먼트

## Card Actions
- components/modals/card-modal/description.tsx 생성
  - textarea 추가
- components/modals/card-modal/actions.tsx 생성
  - copy, delete 액션 추가
- components/modals/card-modal/index.tsx 수정
  - Description 추가
  - Actions 추가
- actions/update-card/schema.ts 수정
  - schema title 옵셔널로 수정
- components/ui/button.tsx 수정
  - variant - gray 추가
  - size - inline 추가
- actions/copy-card 생성
  - 카드 복사 기능
- actions/delete-card 생성
  - 카드 삭제 기능

## Activity / Audit Logs
## Stripe & Board Limits
## 30 Deployment
