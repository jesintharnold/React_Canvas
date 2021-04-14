import './App.css';
import {useEffect, useRef} from "react";


let mouse={
  x:undefined,
  y:undefined
}

let colors=[
    "#206a5d",
    "#81b214",
    "#ffcc29",
    "#f58634",
  "#eeebdd",
  "#ce1212",
  "#810000",
  "#1b1717"
];

let strokecolor=[
    "#ffcc29",
  "#f58634",
  "#eeebdd",
  "#1b1717"
];


function Circle(x,y,dx,dy,radius,c){


this.x=x;
this.y=y;
this.dx=dx;
this.dy=dy;
this.radius=radius;
this.color= colors[Math.floor(Math.random()*colors.length)];
this.stroke=strokecolor[Math.floor(Math.random()*strokecolor.length)];

this.draw=function (){
  c.beginPath();
  c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
  c.strokeStyle=this.stroke;
  c.lineWidth=3;
  c.fillStyle=this.color;
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

  if(mouse.x-this.x<50 && mouse.x-this.x>-50 &&mouse.y-this.y<50 && mouse.y-this.y>-50){

    if(this.radius<30){
       this.radius+=1;
     }

  }
  else if(this.radius>10){
    this.radius-=1;
  }

  this.draw();
 }

}




function App() {
  const ref=useRef();
  let CircleArray=[];


  function Init(context) {
    for(let i=0;i<300;i++){
    let x=Math.random()*window.innerWidth;
    let y=Math.random()*window.innerHeight;
    let dx=Math.random()*5;
    let dy=Math.random()*5;
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

  window.addEventListener("mousemove",function (event){
      mouse.x=event.clientX;
      mouse.y=event.clientY;
  })


    return ()=>window.removeEventListener("mousemove",function (event){
        mouse.x=event.clientX;
        mouse.y=event.clientY;
    });
});
  return (
    <div className="App">
      <canvas ref={ref} style={{width:"100%",height:"100%"}}/>
    </div>
  );
}

export default App;
