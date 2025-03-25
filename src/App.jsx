import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ButtonState, setButtonState] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const [startCount, setStartCount] = useState(false)

  const [breakTime, setBreakTime] = useState(false)
  const [breakSec, setBreakSec] = useState(0)
  const [breakMin, setBreakMin] = useState(5)

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)

  const changeButton = () => {
    setButtonState(!ButtonState)
    setStartCount(!startCount)
    setRepeat(true)
    setBreakTime(false)
    setBreakSec(0)
    setBreakMin(5)
  }
  const breakButton = () => {
    setStartCount(!startCount)
    if(minutes === 0 && seconds === 0) return
    setBreakTime(true)
    setButtonState(!ButtonState)
  }
  const repeatButton = () => {
    setBreakSec(60)
    setBreakMin(5)
    setMinutes(25)
    setSeconds(0)
    setBreakTime(false)
    setStartCount(false)
    setButtonState(false)
    setRepeat(false)
  }

  // break
  useEffect(() => {
    if(!breakTime || minutes === 0) return
    const intervalBreak = setInterval(() => {
      if(breakMin === 0 && breakSec === 0){
        setBreakTime(false)
        setStartCount(true)
        setButtonState(true)
      }
      if(breakSec > 0){
        setBreakSec(breakSec-1)
      }else{
        setBreakSec(59)
        if(breakMin > 0) setBreakMin(breakMin-1)
        else setBreakMin(5)
      }
    }, 1000);
  
    return () => {
      clearInterval(intervalBreak)
    }
  }, [breakTime,breakSec])
  

  // Cronometro
  useEffect(() => {
    if(!startCount) return
    const interval = setInterval( () => {
      //logica del cronometro
      if(minutes === 0 && seconds === 0) return
      if(seconds > 0){
        setSeconds(seconds-1)
      }else{
        setSeconds(59)
        setMinutes(minutes-1)
      }
      //
    }, 1000)
  
    return () => {
        clearInterval(interval)
      }
  }, [startCount, seconds])
  

  return (
    <>
      <section>
        {
          breakTime === true && <h2 className='breakText'> Break time: {breakMin}:{breakSec} </h2>
        }
      </section>

      <section>
        <h1 style={{fontSize: 100}}>{minutes}:{seconds}</h1>
      </section>
      
      <section>
        <div>
          {
            ButtonState === false ? 
            ( <button onClick={changeButton}> Start </button> ) :
            ( <button className='breakButton' onClick={breakButton}> Break </button> )
          }
          {
            repeat === true && (
              <div>
                <button style={{marginTop: "10px"}} onClick={repeatButton} >Repeat</button>
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default App
