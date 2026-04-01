Here is a clean, professional README.md in English for your project.

🚚 Delivery App
A fast and responsive food delivery platform built with Next.js, TypeScript, and MongoDB. This application allows users to browse menus from different shops, manage a shopping cart, and track their order history.

✨ Features
Shop Navigation: Filter and browse products from various restaurants/shops.

Smart Cart (Zustand): Add/remove items, update quantities, and calculate totals in real-time.

Order History: Search and view past orders using Email or Phone number.

Repeat Order: Instantly re-add items from a previous order back into the cart with one click.

Responsive Design: Fully optimized for mobile and desktop using Tailwind CSS.

🛠 Tech Stack
Frontend: React 19, Next.js 15 (App Router), Tailwind CSS.

Backend: Next.js API Routes (Serverless).

Database: MongoDB with Mongoose ODM.

State Management: Zustand (Persisted cart state).

Form Handling: React Hook Form + Zod validation.

Type Safety: TypeScript (Strict mode, no any).

📦 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/rsovkovic/Delivery_app-.git
cd Delivery_app-
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root directory:

Фрагмент коду
MONGODB_URI=your_mongodb_connection_string
Run the development server:

Bash
npm run dev
Open http://localhost:3000 to view it in the browser.

🗄 Data Schema (Orders)
The application uses a structured Mongoose schema to ensure data integrity:

Customer: Object containing name, email, phone, and address.

Items: Array of products including productId, name, price, quantity, and image.

Metadata: totalPrice, status, and createdAt timestamps.
