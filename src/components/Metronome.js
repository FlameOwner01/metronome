import { useState, useRef, useEffect } from "react";
import audio from "../components/Knocking.mp3";





const Metronome  = () => {

   
    const [bpmValue, setBpmValue] = useState(40);
    const [buttonValue, setButtonValue] = useState("Start")
    const [playing, setPlaying] = useState(false);
    let soundRef = useRef(new Audio(audio));
   

    useEffect(() => {
      const interval = setInterval(() => {
        if(playing){
          soundRef.current.play();
        }else{
          soundRef.current.pause();
          soundRef.current.currentTime = 0
        }
        
      }, 100);
      return () => clearInterval(interval);
    }, [playing]);
    useEffect(() => {
      soundRef.current.playbackRate = bpmValue / 100;
    }, [bpmValue]);
   
    const start = () => {
        
     
      if(buttonValue === "Start"){
        setPlaying(true)
        setButtonValue("Stop");
      }else if(buttonValue ==="Stop"){
        setPlaying(false);
        setButtonValue("Start");
      }
      
    }


  const inputRange = (e) =>{
    setBpmValue(e.target.value);
    
  }
 


    return(
    <div className="App">
        <div className ="container">
            <h1>Metronome</h1>
              <p className= "bpm" > {bpmValue} BPS</p>
            <input type="range" className ="range" min= "40" max="200" onChange={inputRange}></input>
            <button id= "button" className="btn"onClick ={() => {
                   start();
                   }}>{buttonValue}</button>
        </div>

    </div>
    )
}

export default Metronome
