import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { syncSeoUrls } from './config/site'
import { injectStructuredData } from './lib/seo'
import './index.css'

// Keeps canonical/OG URLs and JSON-LD aligned with src/config/site.ts.
syncSeoUrls()
injectStructuredData()

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
