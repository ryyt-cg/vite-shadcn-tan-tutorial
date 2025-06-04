# Vite React Tutorial
This tutorial will guide you through setting up a React application from ground up.
It will cover the following technologies:
- Vite
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- TanStack Router
- TanStack Query


## Lesson 1: Setting Up Vite with React and TypeScript
```bash
pnpm create vite@latest vite-shadcn-tan-tutorial --template react-ts
cd vite-shadcn-tan-tutorial
pnpm install
pnpm run dev
```

## Lesson 2: [Adding Shadcn/UI](https://ui.shadcn.com/docs/installation/vite)

```bash
pnpm add tailwindcss @tailwindcss/vite
```
Replace everything in src/index.css with the following:
```css
@import "tailwindcss";
```
Edit tsconfig.json file
```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Edit tsconfig.app.json file
```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

Update vite.config.ts

```bash
pnpm add -D @types/node
```

Edit vite.config.ts
```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

Edit src/app.tsx
```tsx
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```
Run the development server
```bash
pnpm run dev
```
You should see a button styled with Shadcn/UI.
![shadcb-button.png](docs/shadcb-button.png)

## Lesson 3: [Adding TanStack Router](https://tanstack.com/router/latest)
Install TanStack Router
```bash
pnpm add @tanstack/react-router
pnpm add -D @tanstack/react-router-devtools
pnpm add -D @tanstack/router-plugin
```

Configure the Vite Plugin
```tsx
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    // ...,
  ],
})
```
Create the following directories and files:
```text
src/features/about/index.tsx
src/features/home/index.tsx

src/routes/__root.tsx (with two '_' characters)
src/routes/index.tsx
src/routes/(authenticated)/index.tsx
src/routes/(authenticated)/about/index.tsx
```

File-Based Routing

| Filename          | Route Path | Component Output  |
|-------------------|------------|-------------------|
| ʦ __root.tsx      |            | <Root>            |
| ʦ index.tsx       | /(exact)   | <Root><RootIndex> |
| ʦ about.tsx       | /about     | <Root><About>     |
| ʦ about/index.tsx | /about     | <Root><About>     |

Put routes under (authenticated) directory

| Filename                         | Route Path | Component Output  |
|----------------------------------|------------|-------------------|
| ʦ __root.tsx                     |            | <Root>            |
| ʦ (authenticate)/index.tsx       | /(exact)   | <Root><RootIndex> |
| ʦ (authenticate)/about.tsx       | /about     | <Root><About>     |
| ʦ (authenticate)/about/index.tsx | /about     | <Root><About>     |

**features** folder contains the components for the pages.

---

Add Shadcn/UI sonner
```bash
 pnpm dlx shadcn@latest add sonner
```
src/features/about/index.tsx
```tsx
const About = () => {
    return (
        <div>
            About Page
        </div>
    );
};

export default About;
````

src/features/home/index.tsx
```tsx
const Home = () => {
    return (
        <div>
            Home Page
        </div>
    );
};

export default Home;
````

src/routes/__root.tsx
```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {Toaster} from "sonner";

export const Route = createRootRoute({
    component: () => (
        <>
            {/*<NavigationProgress />*/}
            <Outlet />
            <Toaster duration={50000} />
            {import.meta.env.MODE === 'development' && (
                <>
                    {/*<ReactQueryDevtools buttonPosition='bottom-left' />*/}
                    <TanStackRouterDevtools position='bottom-right' />
                </>
            )}
        </>
    ),
})
```
src/routes/(authenticated)/route.tsx
```tsx
import {createFileRoute, Outlet} from "@tanstack/react-router";
// import Layout from "@/components/layout/layout.tsx";

export const Route = createFileRoute('/(authenticated)')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            {/*<Layout>*/}
            <Outlet />
            {/*</Layout>*/}
        </>
    );
}
````

src/routes/(authenticated)/index.tsx
```tsx
import { createFileRoute } from '@tanstack/react-router'
import Home from '@/features/home'

export const Route = createFileRoute('/(authenticated)/')({
    component: Home,
})
```
src/routes/(authenticated)/about/index.tsx`
```tsx
import { createFileRoute } from '@tanstack/react-router'
import About from '@/features/about'

export const Route = createFileRoute('/(authenticated)/about/')({
    component: About,
})
````

Replace all content in app.tsx with the following:
```tsx
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from '@/routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
```
Try<br/>
http://localhost:5173<br/>
http://localhost:5173/about<br/>
You would see the home page and about page.