import Button from './components/Button/Button'
import {MouseEvent} from 'react'
import Input from './components/Input/Input'

function App() {
 const addCounter = (e: MouseEvent) => {
	 console.log(e)
 }
  return (
    <>
      <h1>Pizza</h1>
      <Button onClick={addCounter}>Кнопка</Button>
      <Button appearence='big' onClick={addCounter}>Кнопка</Button>
      <Input placeholder='email' />
    </>
  )
}

export default App
