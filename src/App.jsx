import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import WeekSchedule from './pages/WeekSchedule'
import AllSchedule from './pages/AllSchedule'
import AddSchedule from './pages/AddSchedule'

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path='' element={<MainPage />}/>
        <Route path='weekSchedule' element={<WeekSchedule />}/>
        <Route path='/allSchedule' element={<AllSchedule />}/>
        <Route path='/addSchedule' element={<AddSchedule />}/>
      </Routes>
    </>
  )
}

export default App
