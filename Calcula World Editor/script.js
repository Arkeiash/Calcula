var canvas = document.querySelector("canvas");
var tilesetContainer = document.querySelector(".tileset-container");
var tilesetSelection = document.querySelector(".tileset-container_selection");
var tilesetImage = document.querySelector("#tileset-source");

var selection = [0, 0];

var currentLayer = 0;
var layers = [
  {
    
    
    "0-0": [0,0]
  },
  {},
  {},
];


function draw() {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, canvas.width, canvas.height);
  var sizeOfCrop = 16;
  
  layers.forEach(layer => {
    Object.keys(layer).forEach(key => {
      var positionX = Number(key.split("-")[0]);
      var positionY = Number(key.split("-")[1]);
      var [tilesheetX, tilesheetY] =  layer[key];
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        tilesetImage,
          tilesheetX * 16,
          tilesheetY * 16,
          sizeOfCrop,
          sizeOfCrop,
          positionX * 16,
          positionY * 16,
          sizeOfCrop,
          sizeOfCrop
      )
      
    })
  })
}

function getCoords(e) {
   const { x, y } = e.target.getBoundingClientRect();
   const mouseX = e.clientX - x;
   const mouseY = e.clientY - y;
   return [Math.floor(mouseX / 16), Math.floor(mouseY / 16)];
}


tilesetContainer.addEventListener("mousedown", (event) => {
   selection = getCoords(event);
   tilesetSelection.style.left = selection[0] * 16 + "px";
   tilesetSelection.style.top = selection[1] * 16 + "px";
});

var isMouseDown = false;
canvas.addEventListener("mousedown", () => {
   isMouseDown = true;
});
canvas.addEventListener("mouseup", () => {
   isMouseDown = false;
});
canvas.addEventListener("mouseleave", () => {
   isMouseDown = false;
});
canvas.addEventListener("mousedown", addTile);
canvas.addEventListener("mousemove", (event) => {
   if (isMouseDown) {
      addTile(event);
   }
});

function addTile(mouseEvent) {
  var clicked = getCoords(event);
  var key = clicked[0] + "-" + clicked[1];
  if(mouseEvent.shiftKey) {
    
  } else {
    layers[currentLayer][key] = [selection[0], selection[1]]
  }
  
  draw();
}

function setLayer(newLayer) {
  currentLayer = newLayer;
  
  var oldActiveLayer = document.querySelector(".layer.active");
  if(oldActiveLayer) {
    oldActiveLayer.classList.remove("active");
  }
  document.querySelector(`[tile-layer="${currentLayer}"]`).classlist.add("active")
}

function clearCanvas() {
  layers = [{}, {}, {}];
  draw();
}

function exportImage() {
  var data = canvas.toDataURL({format: "png"});
  var image = new Image();
  image.src= data;
  var w = window.open("");
  w.document.write(image.outerHTML)
}

tilesetImage.onload = function() {
  draw();
  setLayer(0);
}



tilesetImage.src = "/Builder Template.png";