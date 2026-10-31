import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource/instrument-serif/latin-400-italic.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/pages.css'

import App from './App'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root not found')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
