# Next.js 15 Better Auth

A modern, full-stack authentication system built with Next.js 15, Better Auth, and MongoDB. This application provides a solid foundation for building secure, production-ready authentication flows with email/password and OAuth providers, along with note management features.

## ✨ Features

- 🔐 **Authentication** with Better Auth (Email/Password, Google OAuth)
- 🚀 **Next.js 15** with App Router
- 🗄 **MongoDB** with Prisma ORM
- 📝 **Note Management** - Create, read, update, and delete notes
- 🎨 **Modern UI** built with Radix UI and Tailwind CSS
- 📱 **Fully Responsive** design
- 🔄 **Form Handling** with React Hook Form and Zod validation
- 🔒 **Protected Routes** with middleware
- 👤 **User Profile** with image upload
- 🔄 **Session Management** with secure token handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm
- Git
- MongoDB connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/next15-better-auth.git
   cd next15-better-auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update the environment variables with your configuration:
     ```env
     # MongoDB Connection
     DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
     
     # Authentication
     NEXTAUTH_SECRET=your-secret-key
     NEXTAUTH_URL=http://localhost:3000
     
     # Google OAuth (optional)
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
.
├── app/                    # App Router
│   ├── actions/           # Server actions
│   ├── dashboard/         # Protected dashboard routes
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── server/            # Server actions
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard components
│   ├── shared/            # Shared UI components
│   ├── ui/                # UI components
│   └── user/              # User-related components
├── lib/                   # Utility functions and configs
│   ├── auth.ts            # Auth configuration
│   ├── auth-client.ts     # Auth client utilities
│   └── prisma.ts          # Prisma client
├── prisma/                # Prisma schema
└── public/                # Static files
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Database

This project uses MongoDB with Prisma. You'll need to set up a MongoDB database and update the `DATABASE_URL` in your `.env.local` file.

## 🛠 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `prisma:generate` - Generate Prisma client
- `prisma:studio` - Open Prisma Studio

## 🔒 Authentication

### Available Providers

- Email/Password
- Google OAuth

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Better Auth](https://github.com/vercel-community/better-auth)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
