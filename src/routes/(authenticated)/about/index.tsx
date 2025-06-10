import {createFileRoute} from '@tanstack/react-router'
import About from '@/features/about'

export const Route = createFileRoute('/(authenticated)/about/')({
  component: About,
})