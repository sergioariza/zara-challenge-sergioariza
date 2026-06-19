import { Route, Routes, useParams } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Cart } from './pages/Cart'
import { PhoneDetails } from './pages/PhoneDetails'
import { PhoneList } from './pages/PhoneList'

function PhoneDetailsRoute() {
  const { id } = useParams()
  return <PhoneDetails key={id} />
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PhoneList />} />
        <Route path="/phone/:id" element={<PhoneDetailsRoute />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
