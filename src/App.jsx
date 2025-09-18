import './App.css'
import StudentForm from './components/StudentForm'
import { BrowserRouter, Route, Routes } from  'react-router-dom'
import StudentList from './components/StudentList'
import LoginForm from './components/LoginForm'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<StudentForm/>}/>
      <Route  path='/student-list' element={<StudentList/>}/>
      <Route  path='/login' element={<LoginForm/>}/>
    </Routes>
     
    </BrowserRouter>
   
    </>
  )
}

export default App
