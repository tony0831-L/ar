import React from 'react'
import ReactDOM from 'react-dom/client'
import { Stats } from '@react-three/drei'
import './assets/index.scss'
import App from './App'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <>
    <App />
    <Stats />
  </>
);
