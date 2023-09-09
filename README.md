## STORE-ID

https://wmall-admin.vercel.app/api/stores/64d5a71149393292611f0a41

# E-Commerce Admin Page

Next.js 13 App Router, React, Tailwind, Prisma, MySQL

## Video

[![Video Label](http://img.youtube.com/vi/-Snlr2dZY4g/0.jpg)](https://youtu.be/-Snlr2dZY4g)

## Key Features:

### **Admin 페이지**

-   관리자 페이지를 통해 Store, Billboard, Category, Product, Color, Size를 추가, 업데이트 및 삭제할 수 있습니다.
-   결제된 상품에 대한 개요를 볼 수 있는 Admin 대시보드 구현 가능합니다.
-   Cloudinary CDN을 활용하여 제품 이미지를 업로드하고 관리할 수 있습니다.

### Store 페이지

-   Color 및 Size 속성을 사용하여 Store 페이지에서 제품 필터링 및 검색이 가능합니다.
-   토스 페이먼츠(Toss Payments)를 통해 안전하고 편리한 결제 시스템을 구현합니다.

### **UI 디자인**

-   TailwindCSS 및 ShadcnUI를 사용하여 ui 디자인
-   반응형 디자인을 통해 다양한 디바이스 및 화면 크기에 대응합니다.

## Technologies Used

-   **Next.js**: 서버 렌더링 애플리케이션을 구축하기 위한 React 프레임워크.
-   **Prisma**: Node.js용 데이터베이스 툴킷 및 ORM(Object-Relational Mapping).
-   **Clerk**: 인증 및 사용자 관리를 위한 라이브러리.
-   **Zustand**: 상태 관리 라이브러리.
-   **Tailwind CSS**: 스타일링을 위한 유틸리티 중심의 CSS 프레임워크.
-   **TypeScript**: 정적 타입 지원을 갖춘 JavaScript의 확장 버전.
-   **shadcn/ui**: Radix UI와 Tailwind CSS를 사용하여 만든 재사용 가능한 컴포넌트.
-   **Cloudinary CDN:** 이미지 업로드

### Cloning the repository

```shell
git clone https://github.com/weeeeey/wmall---admin.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js


NEXT_PUBLIC_API_URL ="https://wmall-admin.vercel.app/api/stores/64d5a71149393292611f0a41"

NEXT_PUBLIC_TOSS_API_CLIENT =
NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY =


NEXT_PUBLIC_ACCESS_KEY =



```

### Connect to MongoDB and Push Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```
