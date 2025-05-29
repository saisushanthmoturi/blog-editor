# Frontend Setup - Blog Editor

This frontend supports **two different routing approaches**:

## 🎯 Option 1: Next.js with File-based Routing (Recommended)

Uses Next.js framework with pages in the `src/pages/` directory.

### Start Next.js Development Server:
```bash
npm run dev:nextjs
# or
npm run dev
```

### Features:
- ✅ Server-side rendering (SSR)
- ✅ Automatic code splitting
- ✅ Built-in optimization
- ✅ File-based routing
- ✅ API routes support

### Pages:
- `/` → `src/pages/index.tsx` (Homepage)
- `/editor` → `src/pages/editor.tsx` (Blog Editor)
- `/blogs` → `src/pages/blogs.tsx` (Blog List)

---

## 🎯 Option 2: React SPA with React Router

Uses `src/App.tsx` with React Router for client-side routing.

### Start SPA Development Server:
```bash
npm run dev:spa
```

### Features:
- ✅ Single Page Application (SPA)
- ✅ Client-side routing
- ✅ Fast development with Vite
- ✅ Component-based routing

### Routes:
- `/` → Homepage component
- `/editor` → Editor page component  
- `/blogs` → Blogs page component

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js (default) |
| `npm run dev:nextjs` | Start Next.js explicitly |
| `npm run dev:spa` | Start Vite SPA |
| `npm run build` | Build Next.js for production |
| `npm run build:spa` | Build SPA for production |
| `npm run start` | Start Next.js production server |
| `npm run start:spa` | Preview SPA production build |

---

## 📁 File Structure

```
src/
├── App.tsx              # React Router setup (for SPA)
├── index.tsx            # Entry point (for SPA)
├── components/          # Shared components
│   ├── BlogEditor.tsx
│   ├── BlogList.tsx
│   ├── BlogItem.tsx
│   └── Notification.tsx
├── hooks/               # Custom React hooks
│   ├── useAutoSave.ts
│   └── useDebounce.ts
├── pages/               # Next.js pages (for SSR)
│   ├── _app.tsx
│   ├── index.tsx
│   ├── editor.tsx
│   └── blogs.tsx
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript definitions
│   └── blog.ts
└── utils/               # Utility functions
    └── constants.ts
```

---

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `vite.config.ts` - Vite configuration for SPA
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Choose your approach:**
   - For **Next.js**: `npm run dev:nextjs`
   - For **SPA**: `npm run dev:spa`

3. **Open your browser:**
   - http://localhost:3000

4. **Start the backend:**
   - Make sure the backend server is running on port 5000

---

## ⚡ Features

Both setups include:
- ✅ Auto-save functionality
- ✅ Draft management
- ✅ Blog publishing
- ✅ Responsive design
- ✅ TypeScript support
- ✅ API integration
- ✅ Error handling
- ✅ Real-time notifications

---

## 🤔 Which Option to Choose?

### Choose **Next.js** if you want:
- Server-side rendering
- Better SEO
- Production-ready optimization
- File-based routing simplicity

### Choose **React SPA** if you want:
- Pure client-side application
- Maximum control over routing
- Faster development hot-reload
- Traditional React app structure
