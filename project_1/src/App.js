import './App.css';
import {useEffect, useRef} from "react";

function Circle(x,y,dx,dy,radius,c){
this.x=x;
this.y=y;
this.dx=dx;
this.dy=dy;
this.radius=radius;

this.draw=function (){
  c.beginPath();
  c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
  c.strokeStyle="yellow";
  c.lineWidth=5;
  c.fillStyle="black";
  c.fill();
  c.stroke();
};

this.update=function (){
  if(this.x+this.radius>window.innerWidth || this.x-this.radius<0){
    this.dx = - this.dx;
  }
  if(this.y+this.radius>window.innerHeight || this.y-this.radius<0){
    this.dy = - this.dy;
  }
  this.x+=this.dx;
  this.y+=this.dy;
  this.draw();
 }

}




function App() {
  const ref=useRef();
  let CircleArray=[];
  function Init(context) {
    for(let i=0;i<60;i++){
    let x=Math.random()*window.innerWidth;
    let y=Math.random()*window.innerHeight;
    let dx=Math.random()*8;
    let dy=Math.random()*8;
    let circle=new Circle(x,y,dx,dy,10,context);
    CircleArray.push(circle);
  }

}

useEffect(()=>{
  const canvas=ref.current;
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const ctx=canvas.getContext("2d");
  Init(ctx);
  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    CircleArray.forEach((i)=>{
    i.update();
    });
  };

  animate();
});
  return (
    <div className="App">
      <canvas ref={ref} style={{width:"100%",height:"100%"}}/>
    </div>
  );
}

export default App;
