import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PackagesList from './pages/PackagesList'
import PackageDetails from './pages/PackageDetails'
import CreatePackage from './pages/CreatePackage'
import BookingsList from './pages/BookingsList'
import CreateBooking from './pages/CreateBooking'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<PackagesList />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/packages/create" element={<CreatePackage />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/bookings/create/:packageId" element={<CreateBooking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
