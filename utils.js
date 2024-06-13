const utils = {
  withGrid(n) {
    return n*16;
  },
  withChunk(n) {
    return n*16*49;
  },
  asGridCoord(x,y) {
    return `${x*16},${y*16}`;
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "up") {
      y -= size;
    }
    else if (direction === "down") {
      y += size;
    }
    else if (direction === "left") {
      x -= size;
    }
    else if (direction === "right") {
      x += size;
    }
    return {x,y};
  },
  
  oppositeDirection(direction) {
    if (direction === "left") { return "right"}
    if (direction === "up") { return "down"}
    if (direction === "right") { return "left"}
    return "up"
  },
  
  wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms)
    })
  },
  
  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
          detail
        });
        document.dispatchEvent(event);
  },
  
  getRandomInt(max) {
    return Math.floor(Math.random()*max);
  },
  getInput(element) {
    return element.value;
  },
  shuffleArray(array) {
    var counter = array.length;
    while (counter > 0) {
      var ind = Math.floor(Math.random() * counter);
      counter--;
      var temp = array[counter];
      array[counter] = array[ind];
      array[ind] = temp;
    }
  },
  removeFromArray(array, x) {
    
  },
  
  howManyPlayerSpells() {
    return window.playerState.items.length
  },
  drawFraction(num, den) {
    
    return `<math><mfrac><mn>${num}</mn><mn>${den}</mn></mfrac></math>`;
  },
  simplify(num, den) {
    if(num % 2 === 0 && den % 2 === 0) {
        num /= 2;
        den /= 2;
    }
    if(num % 3 === 0 && den % 3 === 0) {
        num /= 3;
        den /= 3;
    }
    if(num % 5 === 0 && den % 5 === 0) {
        num /= 5;
        den /= 5;
    }
    if(num % 7 === 0 && den % 7 === 0) {
        num /= 7;
        den /= 7;
    }
    if(num % 11 === 0 && den % 11 === 0) {
        num /= 11;
        den /= 11;
    }
    if(num % 13 === 0 && den % 13 === 0) {
        num /= 13;
        den /= 13;
    }
    if(num % 17 === 0 && den % 17 === 0) {
        num /= 17;
        den /= 17;
    }
    if(num % 19 === 0 && den % 19 === 0) {
        num /= 19;
        den /= 19;
    }
    if(num % 23 === 0 && den % 23 === 0) {
        num /= 23;
        den /= 23;
    }
    if(num % 29 === 0 && den % 29 === 0) {
        num /= 29;
        den /= 29;
    }
    return [num, den]
},
  drawVariable(num) {
    return `<math><mi>${num}</mi></math>`
  },
  drawLimit(num, approachVal) {
    return `<math><mstyle><munder><mi>lim</mi><mrow><mi>${num}</mi><mo>&#x2192;</mo><mn>${approachVal}</mn></mrow></munder></mstyle></math>`
  },
  draw2DVector(a, b) {
    return `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${a}</mn></mtd></mtr><mtr><mtd><mn>${b}</mn></mtd></mtr></mtable></mfenced></math>`;
  },
  
  describeArc(x,y,radius,startAngle,endAngle) {
      function polarToCartesian(centerX, centerY, radius, angle) {
        var angleInRadians = (angle) * Math.PI /180;
        return {
            x: centerX + (radius*Math.cos(angleInRadians)),
            y: centerY + (radius*Math.sin(angleInRadians))
        };
      }
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
      var d = [
          "M", start.x, start.y,
          "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
          "L", x,y,
          "L", start.x, start.y
      ].join(" ");
      return d;
  },
  getChunkPos(x, y) {
    var relX = x % 16*49;
    var relY = y % 16*49;
    return [relX, relY]
  },
  
  
};