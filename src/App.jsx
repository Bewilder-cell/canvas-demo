import { useEffect, useRef, useState } from 'react'
import './App.css'
import canvasFunc from './canvasFunc'
const color=["#250656","#1e1e1e","#3182ff","#43dd6c","#949a9c"]
function App() {
  
  const canvasRef=useRef(null)
  const [bgcColor,setBgcColor]=useState(color[0])

            useEffect(()=>{
            let width =canvasRef.current.width = window.innerWidth||{};
            let height = canvasRef.current.height = window.innerHeight||{};
            let ctx = canvasRef.current.getContext("2d");

            canvasFunc(width,height,ctx,bgcColor)
            }),[bgcColor]
 
            const handleColor=()=>{
              const radomColor=color[Math.random()*color.length|0]
              setBgcColor(radomColor)
              canvasRef.current.style.background=bgcColor
                }

      return (
     <>
      <canvas className='myCanvas' ref={canvasRef} style={{background:"#250656",position:"absolute",zIndex:-1}}>
      </canvas>
      <h1 onClick={handleColor} style={{textAlign:"center",fontSize:"100px"}}>换颜色</h1>
      <h1 style={{color:"white",textAlign:"center",fontSize:"100px"}}>流畅写标题</h1>
    </>
  )
}

export default App
