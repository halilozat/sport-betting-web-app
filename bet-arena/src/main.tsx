// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux' // Provider'ı import et
import { router } from './router'
import { store } from './store/store' // Store'umuzu import et
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Uygulamayı Provider ile sar */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)