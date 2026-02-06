# 🛒 E-Commerce Platform

Modern full-stack e-commerce application with admin dashboard, secure checkout, and responsive design.

## 🔹 Features

- User Authentication via **Supabase**
- Admin Panel for product and order management
- Shopping Cart & **Stripe** Checkout
- Order Management (users + admin)
- Responsive Design (mobile + desktop)
- Data Validation using **Zod**
- Efficient Data Fetching & Caching with **TanStack Query**

## 🛠️ Tech Stack

| Layer            | Technologies                              |
|------------------|-------------------------------------------|
| Frontend         | Next.js 14+, React, Tailwind CSS          |
| Backend          | Supabase (Auth, Database, Storage)        |
| Data Fetching    | TanStack Query (React Query)              |
| Validation       | Zod                                       |
| Payments         | Stripe                                    |
| Deployment       | Vercel                                    |

## 🚀 Installation

1. Clone the repository

```bash
git clone https://github.com/Natnsis/Ecommerce.git
cd Ecommerce
```
2. Install dependencies

```bash
npm install
```
3.Configure environment variables
-create .env.locals

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key          # anon/public key
NEXT_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4.Start the development server
```bash
npm run dev
```

Open http://localhost:3000

## 📂 Project Structure
```bash
ecommerce/
├── app/
│   ├── (root)/
│   │   ├── admin/
│   │   │   ├── add-product/
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── order-list/
│   │   │   ├── products/
│   │   │   └── users/
│   │   ├── auth/
│   │   ├── checkout/
│   │   ├── context/
│   │   ├── dashboard/
│   │   ├── finalize/
│   │   ├── learnMore/
│   │   ├── order/
│   │   └── success/
│   ├── api/
│   ├── controllers/
│   ├── provider/
│   │   └── TanstackProvider.tsx
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   └── product.schema.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
└── README.md
```

## ✅ Future Improvements

- Real-time order & stock notifications (Supabase Realtime)
- AI-powered product recommendations
- Multi-language / i18n support
- Wishlist / favorites feature
- Advanced search & filtering
- Discount codes & promotions system
- Full CI/CD pipeline (GitHub Actions → Vercel)
- Performance optimizations (image optimization, lazy loading, partial prerendering)
- Unit + integration tests (Vitest / Playwright)

## 📸 Quick Overview

<p align="center">
  <img src="/public/screenshots/landing.png" width="24%" alt="Landing"/>
  <img src="/public/screenshots/auth.png" width="24%" alt="Auth"/>
  <img src="/public/screenshots/products.png" width="24%" alt="Products"/> 
  <img src="/public/screenshots/admin.png" width="24%" alt="Admin"/>
  <img src="/public/screenshots/store.png" width="24%" alt="Cutomer-Dashobard"/>
  <img src="/public/screenshots/product-add.png" width="24%" alt="Add Product"/>
</p>




