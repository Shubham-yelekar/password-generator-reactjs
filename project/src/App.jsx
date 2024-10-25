
import './App.css';
import {useState , useCallback, useEffect, useRef} from 'react';
import { FaRegClipboard } from "react-icons/fa";

function App() {

  const [password , setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowChar, setAllowChars] = useState(false)

  const PasswordRef = useRef(null)

  const generatePassword = useCallback(
    () => {
      let pass = "";
      let string = 'ABCDEFGHIJKLIMNOPQRSTUVWXYZabcefghijklmnopqristuvwxyz';
      if(allowNumbers){string += '0123456789' }
      if(allowChar){string += '!@#$%^&*'}

      for (let i = 1 ; i <= length; i++){
        const char = Math.floor(Math.random()*string.length + 1)
        pass += string.charAt(char)
      }

      setPassword(pass)

    },
    [length, allowNumbers, allowChar],
  )

  useEffect(()=>{
    generatePassword()
  },[length, allowNumbers, allowChar])

  const capturePassword = () => {
    navigator.clipboard.writeText(password)
    PasswordRef.current.select()
  }


  return (
    <div className='flex flex-col gap-2'>
      <div className='flex'>
        <input
        type="text"
        value={password}
        ref={PasswordRef}
        readOnly

        />
      <button  onClick={capturePassword} className='bg-purple-500  p-2'><FaRegClipboard color='white'/></button>
      </div>
      <div>
      <input name='length' value={length} type='range' min={6} max={25} onChange={(e)=>{
        setLength(e.target.value)
      }}  />
      <label htmlFor="length" className='text-white'>Length - {length}</label>
      </div>
      <div>
      <input name='numbers' defaultChecked = {allowNumbers} type='checkbox' onChange={()=>{setAllowNumbers((prev) => !prev)}} />
      <label htmlFor="numbers" className='text-white'>Add Numbers </label>
      </div>
      <div>
      <input name='character' defaultChecked = {allowChar} type='checkbox' onChange={()=>{setAllowChars((prev) => !prev)}}/>
      <label htmlFor="character" className='text-white'>Add Characters</label>
      </div>

    </div>
  )
}

export default App
