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