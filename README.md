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
## Organizations
## Sidebar
## Workspace Settings
## Server Actions
## useAction abstraction
## Form Components
## Board Popover Form
## Board Server Action
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
