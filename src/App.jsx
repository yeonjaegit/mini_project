import { Route, Routes } from 'react-router-dom'
import './App.css'
import Background from './components/Background'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import WeekSchedule from './pages/WeekSchedule'
import AllSchedule from './pages/AllSchedule'
import AddSchedule from './pages/AddSchedule'

function App() {
  return (
    <>
    <Header />
    <Background>
      <Routes>
        <Route path='/home' element={<MainPage />}/>
        <Route path='allSchedule' element={<AllSchedule />}/>
        <Route path='/addSchedule' element={<AddSchedule />}/>
      </Routes>
      </Background>
    </>
  )
}

export default App
