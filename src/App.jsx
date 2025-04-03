import { useEffect, useState } from 'react'
import {ProgressBar} from './components/ProgressBar'
import './App.css'

function App() {
  const [ButtonState, setButtonState] = useState(false)
  const [countStarted, setCountStarted] = useState(false)

  const [startCount, setStartCount] = useState(false)

  const [breakTime, setBreakTime] = useState(false)
  const [breakSec, setBreakSec] = useState(0)
  const [breakMin, setBreakMin] = useState(5)

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)

  const [pauseButton, setPauseButton] = useState(true)
  const [starBreakButton, setStarBreakButton] = useState(false)

  const [displayPomodoro, setdisplayPomodoro] = useState("")
  const [displayBreak, setDisplayBreak] = useState("none")

  const [pauseTextButton, setPauseTextButton] = useState("Pause pomodoro")

  const [pomodoroCounter, setPomodoroCounter] = useState(0)
  const [breakCounter, setBreakCounter] = useState(0)

  const [showresults, setShowresults] = useState("none")


  const changeButton = () => {
    setPomodoroCounter(pomodoroCounter+1)

    setPauseTextButton("Pause pomodoro")

    setButtonState(!ButtonState)
    setStartCount(!startCount)
    if(countStarted === true){
      setdisplayPomodoro("")
      setDisplayBreak("none")
    } 

    setPauseButton(false)
    setCountStarted(true)
    setBreakTime(false)

    setBreakSec(0)
    setBreakMin(5)
  }
  const breakButton = () => {
    setBreakCounter(breakCounter+1)

    setDisplayBreak("")
    setdisplayPomodoro("none")

    setStartCount(false)

    setPauseTextButton("Pause break")

    if(minutes === 0 && seconds === 0) return
    setBreakTime(true)

    setButtonState(!ButtonState)

    setSeconds(0)
    setMinutes(25)
  }

  const pausePomodoro = () => {
    if(pauseTextButton === "Pause pomodoro" || pauseTextButton === "Restore pomodoro"){
      if(pauseTextButton === "Restore pomodoro"){
        setPauseTextButton("Pause pomodoro")
        setStartCount(!startCount)
      }else{
        setStartCount(!startCount)
        setPauseTextButton("Restore pomodoro")
      }
      
    }
    if(pauseTextButton === "Pause break" || pauseTextButton === "Restore break"){
      if(pauseTextButton === "Restore break"){
        setPauseTextButton("Pause break")
        setBreakTime(!breakTime)
      }else{
        setBreakTime(!breakTime)
        setPauseTextButton("Restore break")
      }
    }
  }

  // break
  useEffect(() => {
    if(!breakTime || minutes === 0) return
    const intervalBreak = setInterval(() => {
      if(breakMin === 0 && breakSec === 0){
        setPomodoroCounter(pomodoroCounter+1)
        setDisplayBreak("none")
        setdisplayPomodoro("")
        setPauseTextButton("Pause pomodoro")
        setBreakTime(false)
        setStartCount(true)
        setButtonState(true)
        setBreakSec(0)
        setBreakMin(5)
        return
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
      if(minutes === 0 && seconds === 0){
        setStarBreakButton(true)
        setShowresults("")
        return
      }
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
    <div className='background'>
      <h1 style={{fontSize: 25}}>Pomodoro Tracker</h1>
        
      <section>
        <div>
            <div style={{display: `${displayPomodoro}`}}>
              <h1 style={{fontSize: 100 , maxHeight: "30px"}}>
                {minutes < 10 && 0}{minutes}:{seconds < 10 && 0}{seconds}
              </h1>
              <div style={{padding: "20px"}}>
                { (pauseTextButton === "Pause pomodoro" || pauseTextButton === "Restore pomodoro") &&
                  <div>
                    <ProgressBar 
                      time={1500000} 
                      color='white' 
                      notPause={startCount}
                    />
                  </div>
                }
              </div>
            </div>
            <div style={{display: `${displayBreak}`}}>
              <h1 style={{color: 'orange', fontSize: 100 , maxHeight: "30px" }}> {breakMin < 10 && 0}{breakMin}:{breakSec < 10 && 0}{breakSec} </h1>
                { (pauseTextButton === "Pause break" || pauseTextButton === "Restore break") &&
                  <div style={{padding: "20px"}}>
                  <ProgressBar 
                    time={300000} 
                    color='orange' 
                    notPause={breakTime}
                  />
                  </div>
                }
            </div>
        </div>
      </section>
      
      <section>
        <div>
          {
            ButtonState === false ? 
            ( <button onClick={changeButton} style={{marginTop: "0", width: "200px"}}> Start pomodoro</button> ) :
            ( <button disabled={starBreakButton} className='breakButton' onClick={breakButton} style={{width: "200px"}}> Start break </button> )
          }
          <div>
            <button disabled={pauseButton} style={{marginTop: "10px" , width: "200px"}} onClick={pausePomodoro} >{pauseTextButton}</button>
          </div>
        </div>
      </section>

      <section>
        <div className='countersContent' style={{display: `${showresults}`}}>
          <div>
            <h2> Pomodoros: </h2>
            <h3> {pomodoroCounter} </h3>
          </div>

          <div>
            <h2> Breaks: </h2>
            <h3> {breakCounter} </h3>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
