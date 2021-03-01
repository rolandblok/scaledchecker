var glb = {}
glb.x = 1 // example


var canvas = document.getElementById("canvas");
window.addEventListener("resize", this.resize, false);
this.stats = new Stats();
document.body.appendChild(this.stats.dom);

var w = canvas.width;
var h = canvas.height;
var ctx = canvas.getContext("2d");
var pause = false;
var restart = true;
canvas.addEventListener('click', function() {
  //pause = !pause;
  restart = true;
}, false);

let image_data 
let image_buffer

function resize() {

  canvas.width  = window.innerWidth;
  w = canvas.width;
  canvas.height = window.innerHeight;
  h = window.innerHeight
  console.log("resize " + w + " " + h);        
  image_data = ctx.createImageData(w,h);
  image_buffer = new Uint32Array(image_data.data.buffer)
}

this.gui = new dat.GUI();
this.gui.add(glb, "x", 1)





// udpate loop program

var last_drw_time = 0;
var total_draw_time_ms = 0;

let stand = 0
  
function draw(ctx, d_time_ms) {

  
  // checker
  let size = 80
  let pixel_index = 0
  for (let yp = 0; yp < h; yp++) {
    for (let xp = 0; xp < w; xp++) {
      let x = xp - w/2
      let y = yp - h/2

      x = x - 0.1*y*Math.sin(total_draw_time_ms/1000) 
      y = y - 0.1*x*Math.sin(total_draw_time_ms/1000) 

      // checker
      let check_x = Math.round(Math.abs(x/size))
      let check_y = Math.round(Math.abs(y/size))
      let check = (check_x+check_y)%2
      image_buffer[pixel_index] = check?0xFF000000:0xFFFFFFFF
      
      pixel_index++
      


    }
  }

  ctx.putImageData(image_data,0,0)

  // draw walking test square
  ctx.fillStyle = '#00FF00';
  ctx.fillRect(stand, 0, 4, 4);
  stand += 1;
  if (stand > w) stand = 0;
  

}



function drawAndUpdate(cur_time) {
  this.stats.begin();
  
  d_time_ms = cur_time - last_drw_time

  if (restart) {
  	// if needed start code here
    restart = false;
    total_time = 0;
  }


  // update 
  if (pause) {
    d_time_ms = 0
  }
  total_draw_time_ms += d_time_ms

  draw(ctx, d_time_ms )
  
  last_drw_time = cur_time;

  requestAnimationFrame(drawAndUpdate);

  this.stats.end();

}



resize();

// start the whole thing up
drawAndUpdate(0);


    
    