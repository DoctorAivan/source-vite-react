import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Home from './routes/Home'
import Users from './routes/Users'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='users' element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
