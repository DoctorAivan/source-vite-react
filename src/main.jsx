import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './main.css'
import App from './App'

import UserProvider from './contexts/UserProvider'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
