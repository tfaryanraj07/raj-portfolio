// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   base: '/raj-portfolio/',  // GitHub repo name
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use production base only when building for production (e.g. GitHub Pages).
// During `npm run dev`, base will be '/' which keeps local dev server working.
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  return {
    base: isProd ? '/raj-portfolio/' : '/',
    plugins: [react()],
  }
})


