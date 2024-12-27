import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from "./views/Homepage.jsx"
import NewBook from "./views/NewBook.jsx"
import ModBook from './views/ModBook.jsx'

const App = ()=> {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/newbook' element={<NewBook/>}/>
      <Route path='/modbook/:isbn' element={<ModBook/>}/>
      
    </Routes>
    </>
  )
}

export default App
