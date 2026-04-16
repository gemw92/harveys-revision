import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import RE from './RE.jsx'
import Exam from './Exam.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/re" element={<RE />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)