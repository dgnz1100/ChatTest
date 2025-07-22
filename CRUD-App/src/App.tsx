import './App.css'
import Chat from './components/Chat'
import Procedures from './components/Procedures'

function App() {
  //Creating Vite application to build out CRUD functionality
  return (
    <>
      <Procedures/>
      <h1>Chat Bot</h1>
      <Chat/>
    </>
  )
}

export default App
