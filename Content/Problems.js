window.Constants = {
  A: null,
  B: null,
  C: null,
  D: null,
  E: null,
  F: null,
  G: null,
  H: null,
  I: null,
  
}
window.calcFunctions = [
  function(x, a) {return `<math><msup><mi>e</mi><mi>${x}</mi></msup></math>`;},
  function(x, a) {return`<math><mi>ln</mi><mfenced><mi>${x}</mi></mfenced></math>` ;},
  function(x, a) {return`<math><mi>sin</mi><mfenced><mi>${x}</mi></mfenced></math>` ;},
  function(x, a) {return`<math><mi>cos</mi><mfenced><mi>${x}</mi></mfenced></math>` ;},
  function(x, a) {return`<math><mi>tan</mi><mfenced><mi>${x}</mi></mfenced></math>` ;},
  function(x, a) {return`<math><msup><mi>${x}</mi><mi>${a}</mi></msup></math>` ;},
];
window.calcFunctionEvals = [
  function(x, a) {return Math.pow(Math.E, x);},
  function(x, a) {return Math.log(x);},
  function(x, a) {return Math.sin(x);},
  function(x, a) {return Math.cos(x);},
  function(x, a) {return Math.tan(x);},
  function(x, a) {return Math.pow(x, a);},
];
window.calcDerivatives = [
  function(x, a) {return `<math><msup><mi>e</mi><mi>${x}</mi></msup></math>`;},
  function(x, a) {return`<math><mfrac><mn>1</mn><mi>${x}</mi></mfrac></math>` ;},
  function(x, a) {return`<math><mi>cos</mi><mfenced><mi>${x}</mi></mfenced></math>` ;},
  function(x, a) {return`<math><mi>-sin</mi><mfenced><mi>${x}</mi></mfenced></math>` ;},
  function(x, a) {return`<math><mfrac><mn>1</mn><mrow><msup><mi>cos</mi><mn>2</mn></msup><mfenced><mi>${x}</mi></mfenced></mrow></mfrac></math>` ;},
  function(x, a) {return`<math><mi>${a}</mi><msup><mi>${x}</mi><mi>${a-1}</mi></msup></math>` ;},
];
window.calcDerivativeEvals = [
  function(x, a) {return Math.pow(Math.E, x);},
  function(x, a) {return 1/x;},
  function(x, a) {return Math.cos(x);},
  function(x, a) {return -Math.sin(x);},
  function(x, a) {return 1/(Math.pow(Math.cos(x), 2));},
  function(x, a) {return a*Math.pow(x, a-1);},
];
window.Choices = [];
window.Problems = {
  //Algebra and Operations
  "sweep1": {
    name:"Sweep 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12);
      window.Constants.B = utils.getRandomInt(12);
    },
    content: function() {
      return `${window.Constants.A} + ${window.Constants.B}`;
    },
    prompt: `<p>Add the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.A + window.Constants.B}`;
    },
    reward: function() {
    return {actionId: "Sweep1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 1,
    prop: "sweep1",
    dakek: "sweep",
  },
  "sweep2": {
    name:"Sweep 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(20)+10;
      window.Constants.B = utils.getRandomInt(20)+10;
    },
    content: function() {
      return `${window.Constants.A} + ${window.Constants.B}`;
    },
    prompt: `<p>Add the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.A + window.Constants.B}`;
    },
    reward: function() {
    return {actionId: "Sweep2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "sweep2",
    dakek: "sweep",
  },
  "sweep3": {
    name:"Sweep 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(9)+1;
      window.Constants.B = utils.getRandomInt(9)+1;
      window.Constants.C = utils.getRandomInt(5)+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var contentHTML = `<svg width="300" height="120">`;
      for(var i = 0; i < A; i++) {
        contentHTML += `<rect x="${i*8}" y="106" width="5" height="5" fill="purple"/>`;
      }
      for(i = 0; i < B; i++) {
        contentHTML += `<rect x="${i*8}" y="53" width="5" height="50" fill="blue"/>`;
      }
      for(i = 0; i < C; i++) {
        contentHTML += `<rect x="${i*53}" width="50" height="50" fill="green"/>`;
      }
      contentHTML+=`</svg>`
      return contentHTML;
    },
    prompt: `<p>The blocks are numbers in the ones, tens, and hundreds place. What number comes from putting all the blocks together?</p>`,
    getSolution: function() {
      return `${window.Constants.C}${window.Constants.B}${window.Constants.A}`;
    },
    reward: function() {
    return {actionId: "Sweep3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "sweep3",
    dakek: "sweep",
  },
  "sweep4": {
    name:"Sweep 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(99999)+1;
      window.Constants.B = utils.getRandomInt(99999)+1;
    },
    content: function() {
      return `${window.Constants.A} + ${window.Constants.B}`;
    },
    prompt: `<p>Add the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.A + window.Constants.B}`;
    },
    reward: function() {
    return {actionId: "Sweep4", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 5,
    prop: "sweep4",
    dakek: "sweep",
  },
  "sweep5": {
    name:"Sweep 5",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(10)+2;
      window.Constants.D = utils.getRandomInt(10)+2;
      window.Constants.E = utils.getRandomInt(10)+2;
    },
    content: function() {
      return `${utils.drawFraction(window.Constants.A, window.Constants.B)} + ${utils.drawFraction(window.Constants.C, window.Constants.D)}`;
      
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      window.Choices = [
      utils.drawFraction(utils.simplify(A+C, B+D)[0], utils.simplify(A+C, B+D)[1]),
      utils.drawFraction(utils.simplify(A+B, B*C)[0], utils.simplify(A+B, B*C)[1]),
      utils.drawFraction(utils.simplify(A*D+B*C, B*D)[0], utils.simplify(A*D+B*C, B*D)[1] ),
      utils.drawFraction(utils.simplify(A*E+B*C, E*D)[0], utils.simplify(A*E+B*C, E*D)[1] ),
      ];
      
    },
    prompt: `<p>Add the fractions</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      return utils.drawFraction(utils.simplify(A*D+B*C, B*D)[0], utils.simplify(A*D+B*C, B*D)[1] );
    },
    reward: function() {
    return {actionId: "Sweep5", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "sweep5",
    dakek: "sweep",
  },
  "sweep6": {
    name:"Sweep 6",
    inputType: "text",
    getRandoms: function() {
      var array = [utils.getRandomInt(999)+1, utils.getRandomInt(999)+1];
      array.sort(function(a, b) {
        return a - b;
      });
      window.Constants.A = array[1];
      window.Constants.B = array[0];
    },
    content: function() {
      return `${window.Constants.B} - ${window.Constants.A}`;
    },
    prompt: `<p>Add the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.B - window.Constants.A}`;
    },
    reward: function() {
    return {actionId: "Sweep6", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 6,
    prop: "sweep6",
    dakek: "sweep",
  },
  "blast1": {
    name:"Blast 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12);
      window.Constants.B = utils.getRandomInt(12);
    },
    content: function() {
      return `${window.Constants.A} <math><mo>&#xB7;</mo></math> ${window.Constants.B}`;
    },
    prompt: `<p>Multiply the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.A * window.Constants.B}`;
    },
    reward: function() {
    return {actionId: "Blast1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 4,
    prop: "blast1",
    dakek: "blast",
  },
  "blast2": {
    name:"Blast 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(99);
      window.Constants.B = utils.getRandomInt(99);
    },
    content: function() {
      return `${window.Constants.A} <math><mo>&#xB7;</mo></math> ${window.Constants.B}`;
    },
    prompt: `<p>Multiply the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.A * window.Constants.B}`;
    },
    reward: function() {
    return {actionId: "Blast2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 5,
    prop: "blast2",
    dakek: "blast",
  },
  "blast3": {
    name:"Blast 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(4999)/100;
      window.Constants.B = utils.getRandomInt(4999)/100;
    },
    content: function() {
      return `${window.Constants.A} <math><mo>&#xB7;</mo></math> ${window.Constants.B}`;
    },
    prompt: `<p>Multiply the numbers</p>`,
    getSolution: function() {
      return `${window.Constants.A * window.Constants.B}`;
    },
    reward: function() {
    return {actionId: "Blast3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 6,
    prop: "blast3",
    dakek: "blast",
  },
  "blast4": {
    name:"Blast 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(99);
      window.Constants.B = utils.getRandomInt(99);
      window.Constants.C = utils.getRandomInt(4);
      
    },
    content: function() {
      const C = window.Constants.C;
      if(C===0) {
        return `${window.Constants.A} <math><mo>&#xF7;</mo></math> ${window.Constants.B}`;
      }
      if(C===1) {
        return `(${window.Constants.A*-1}) <math><mo>&#xF7;</mo></math> ${window.Constants.B}`;
      }
      if(C===2) {
        return `${window.Constants.A} <math><mo>&#xF7;</mo></math> (${window.Constants.B*-1})`;
      }
      if(C===3) {
        return `(${window.Constants.A*-1}) <math><mo>&#xF7;</mo></math> (${window.Constants.B*-1})`;
      }
    },
    prompt: `<p>Divide the numbers.<br>Round your answer to the nearest hundredth.</p>`,
    getSolution: function() {
      const C = window.Constants.C;
      if(C===0) {
        return `${Math.round(100*(window.Constants.A / window.Constants.B))/100}`;
      }
      if(C===1) {
        return `${Math.round(100*(window.Constants.A / window.Constants.B*-1))/100}`;
      }
      if(C===2) {
        return `${Math.round(100*(window.Constants.A / window.Constants.B*-1))/100}`;
      }
      if(C===3) {
        return `${Math.round(100*(window.Constants.A / window.Constants.B))/100}`;
      }
    },
    reward: function() {
    return {actionId: "Blast4", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 7,
    prop: "blast4",
    dakek: "blast",
  },
  "flare1": {
    name:"Flare 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12);
      window.Constants.B = utils.getRandomInt(12);
      window.Constants.C = utils.getRandomInt(12);
    },
    content: function() {
      return `${window.Constants.A} + ${window.Constants.B} <math><mo>&#xB7;</mo></math> ${window.Constants.C}`;
    },
    prompt: `<p>Evaluate the expression</p>`,
    getSolution: function() {
      return `${window.Constants.A + (window.Constants.B*window.Constants.C)}`;
    },
    reward: function() {
    return {actionId: "Flare1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 5,
    prop: "flare1",
    dakek: "flare",
  },
  "flare2": {
    name:"Flare 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12);
      window.Constants.B = utils.getRandomInt(12);
      window.Constants.C = utils.getRandomInt(12);
      window.Constants.D = utils.getRandomInt(12);
    },
    content: function() {
      return `(${window.Constants.A} + ${window.Constants.B}) <math><mo>&#xF7;</mo></math> (${window.Constants.C} + ${window.Constants.D})`;
    },
    prompt: `<p>Evaluate the expression. <br>If necessary, round to the nearest hundredth.</p>`,
    getSolution: function() {
      return `${Math.round(100*(window.Constants.A + window.Constants.B)/(window.Constants.C + window.Constants.D))/100}`;
    },
    reward: function() {
    return {actionId: "Flare2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 6,
    prop: "flare2",
    dakek: "flare",
  },
  "flare3": {
    name:"Flare 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12)+2;
      window.Constants.B = utils.getRandomInt(12)+2;
      window.Constants.C = utils.getRandomInt(12)+2;
      window.Constants.D = utils.getRandomInt(12)+2;
      window.Constants.E = utils.getRandomInt(12)+2;
    },
    content: function() {
      return `(${window.Constants.A} + ${window.Constants.B}) <math><mo>&#xB7;</mo></math> ${window.Constants.C} <math><mo>&#xF7;</mo></math> (${window.Constants.D} + ${window.Constants.E})`;
    },
    prompt: `<p>Evaluate the expression. <br>If necessary, round to the nearest hundredth.</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      return `${Math.round(100*((A+B) * C / (D+E)))/100}`;
    },
    reward: function() {
    return {actionId: "Flare3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 7,
    prop: "flare3",
    dakek: "flare",
    
  },
  "flare4": {
    name:"Flare 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(30)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(100)+100;
    },
    content: function() {
      return `The robot TR-22 builds ${window.Constants.A} panels every ${window.Constants.B} weeks. How many weeks will it take TR-22 to build ${window.Constants.C} panels?`;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${Math.round(100*(C*B/A))/100}`;
    },
    reward: function() {
    return {actionId: "Flare4", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 8,
    prop: "flare4",
    dakek: "flare",
    
  },
  "flare5": {
    name:"Flare 5",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(8)+12;
      window.Constants.B = utils.getRandomInt(8)+12;
      window.Constants.C = utils.getRandomInt(8)+12;
      window.Constants.D = utils.getRandomInt(3)+3;
      window.Constants.E = utils.getRandomInt(3)+6;
      window.Constants.F = utils.getRandomInt(3)+9;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `Tara's yard has a length of <math><mn>${A}</mn><msup><mi>x</mi><mn>${D}</mn></msup></math> + <math><mn>${B}</mn><msup><mi>x</mi><mn>${E}</mn></msup></math> meters and a width of <math><mn>${C}</mn><msup><mi>x</mi><mn>${F}</mn></msup></math> meters. What is the total area of Tara's yard?`;
    },
    prompt: ``,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      window.Choices = [
        `<math><mstyle mathsize="16px"><mn>${A*C}</mn><msup><mi>x</mi><mn>${D+F}</mn></msup></math> + <math><mstyle mathsize="16px"><mn>${B*C}</mn><msup><mi>x</mi><mn>${E+F}</mn></msup><mstyle></math>`,
        `<math><mstyle mathsize="16px"><mn>${B*C}</mn><msup><mi>x</mi><mn>${D+F}</mn></msup></math> + <math><mstyle mathsize="16px"><mn>${B*D}</mn><msup><mi>x</mi><mn>${E+F}</mn></msup><mstyle></math>`,
        `<math><mstyle mathsize="16px"><mn>${A*C}</mn><msup><mi>x</mi><mn>${E+F}</mn></msup></math> + <math><mstyle mathsize="16px"><mn>${B*C}</mn><msup><mi>x</mi><mn>${D+F}</mn></msup><mstyle></math>`,
        `<math><mstyle mathsize="16px"><mn>${B*C}</mn><msup><mi>x</mi><mn>${E+F}</mn></msup></math> + <math><mstyle mathsize="16px"><mn>${B*C}</mn><msup><mi>x</mi><mn>${D+F}</mn></msup><mstyle></math>`,
        
      ];
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `<math><mstyle mathsize="16px"><mn>${A*C}</mn><msup><mi>x</mi><mn>${D+F}</mn></msup></math> + <math><mstyle mathsize="16px"><mn>${B*C}</mn><msup><mi>x</mi><mn>${E+F}</mn></msup><mstyle></math>`;
    },
    reward: function() {
    return {actionId: "Flare5", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 9,
    prop: "flare5",
    dakek: "flare",
    
  },
  "flare6": {
    name:"Flare 6",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(15)+2;
      window.Constants.B = utils.getRandomInt(15)+2;
      window.Constants.C = utils.getRandomInt(15)+2;
      window.Constants.D = utils.getRandomInt(15)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><mstyle mathsize="18px"><mfenced><mrow><mn>${A}</mn><mo>+</mo><mo>&#xA0;</mo><mn>${B}</mn><mi>i</mi></mrow></mfenced><mfenced><mrow><mn>${C}</mn><mo>+</mo><mn>${D}</mn><mi>i</mi></mrow></mfenced></mstyle></math>`;
    },
    prompt: `Multiply and simplify the complex numbers,`,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      window.Choices = [
        `<math><mstyle mathsize="18px"><mn>${A*C-B*D}</mn><mo>+</mo><mn>${A*D+B*C}</mn><mi>i</mi></mstyle></math>`,
        `<math><mstyle mathsize="18px"><mn>${A*B-D*C}</mn><mo>+</mo><mn>${A*D+C*B}</mn><mi>i</mi></mstyle></math>`,
        `<math><mstyle mathsize="18px"><mn>${A*C-B*D}</mn><mo>+</mo><mn>${C*D+A*B}</mn><mi>i</mi></mstyle></math>`,
        `<math><mstyle mathsize="18px"><mn>${A*B-D*C}</mn><mo>+</mo><mn>${C*D+A*B}</mn><mi>i</mi></mstyle></math>`,
      ];
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `<math><mstyle mathsize="18px"><mn>${A*C-B*D}</mn><mo>+</mo><mn>${A*D+B*C}</mn><mi>i</mi></mstyle></math>`;
    },
    reward: function() {
    return {actionId: "Flare6", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 10,
    prop: "flare6",
    dakek: "flare",
    
  },
  "scar1": {
    name:"Scar 1",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(6)+3;
      window.Constants.B = utils.getRandomInt(10)-5;
      window.Constants.C = utils.getRandomInt(10)-5;
      window.Constants.D = utils.getRandomInt(10)-5;
    },
    content: function() {
      const A = window.Constants.A;
      var D;
      if(A === 3) {D = "1,000"}
      if(A === 4) {D = "10,000"}
      if(A === 5) {D = "100,000"}
      if(A === 6) {D = "1,000,000"}
      if(A === 7) {D = "10,000,000"}
      if(A === 8) {D = "100,000,000"}
      if(A === 9) {D = "1,000,000,000"}
      return `Which of the following is equivelent to ${D}`;
    },
    prompt: ``,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      window.Choices = [
        `<math><msup><mn>10</mn><mn>${A}</mn></msup></math>`,
        `<math><msup><mn>10</mn><mn>${A+B}</mn></msup></math>`,
        `<math><msup><mn>10</mn><mn>${A+C}</mn></msup></math>`,
        `<math><msup><mn>10</mn><mn>${A+D}</mn></msup></math>`,
      ];
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      return `<math><msup><mn>10</mn><mn>${A}</mn></msup></math>`;
    },
    reward: function() {
    return {actionId: "Scar1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 6,
    prop: "scar1",
    dakek: "scar",
    
  },
  "scar2": {
    name:"Scar 2",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(7)+3;
      window.Constants.B = utils.getRandomInt(7)-3;
      window.Constants.C = utils.getRandomInt(2);
      window.Constants.D = utils.getRandomInt(7)+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><msqrt><mn>${A*A*B}</mn><msup><mi>x</mi><mn>${C+2*D}</mn></msup></msqrt></math>`;
    },
    prompt: `Simplify the following radical,`,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      if(C===1) {
        window.Choices = [
          `<math><mstyle mathsize="18px"><mn>${A}</mn><msup><mi>x</mi><mn>${D}</mn></msup><msqrt><mn>${B}</mn><mi>x</mi></msqrt></mstyle></math>`,
          `<math><mstyle mathsize="18px"><mn>${A*A}</mn><msup><mi>x</mi><mn>${D+C+1}</mn></msup><msqrt><mn>${B*B}</mn><mi>x</mi></msqrt></mstyle></math>`,
          `<math><mstyle mathsize="18px"><mn>${A*B}</mn><msup><mi>x</mi><mn>${D-C-1}</mn></msup><msqrt><mn>${A*D}</mn><mi>x</mi></msqrt></mstyle></math>`,
          `<math><mstyle mathsize="18px"><mn>${A*A*B}</mn><msup><mi>x</mi><mn>${B+2}</mn></msup><msqrt><mn>${D}</mn><mi>x</mi></msqrt></mstyle></math>`,
        ];
      }
      if(C===0) {
        window.Choices = [
          `<math><mstyle mathsize="18px"><mn>${A}</mn><msup><mi>x</mi><mn>${D}</mn></msup><msqrt><mn>${B}</mn></msqrt></mstyle></math>`,
          `<math><mstyle mathsize="18px"><mn>${A*A}</mn><msup><mi>x</mi><mn>${D+C+1}</mn></msup><msqrt><mn>${B*B}</mn></msqrt></mstyle></math>`,
          `<math><mstyle mathsize="18px"><mn>${A*B}</mn><msup><mi>x</mi><mn>${D-C-1}</mn></msup><msqrt><mn>${A*D}</mn></msqrt></mstyle></math>`,
          `<math><mstyle mathsize="18px"><mn>${A*A*B}</mn><msup><mi>x</mi><mn>${B+2}</mn></msup><msqrt><mn>${D}</mn></msqrt></mstyle></math>`,
        ];
      }
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      if(C===1) {
        return `<math><mstyle mathsize="18px"><mn>${A}</mn><msup><mi>x</mi><mn>${D}</mn></msup><msqrt><mn>${B}</mn><mi>x</mi></msqrt></mstyle></math>`;
      }
      if(C===0) {
        return `<math><mstyle mathsize="18px"><mn>${A}</mn><msup><mi>x</mi><mn>${D}</mn></msup><msqrt><mn>${B}</mn></msqrt></mstyle></math>`;
      }
    },
    reward: function() {
    return {actionId: "Scar2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 8,
    prop: "scar2",
    dakek: "scar",
    
  },
  "scar3": {
    name:"Scar 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(4)+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `<math><msup><mn>${A}</mn><mfrac><mn>${B+C}</mn><mn>${B}</mn></mfrac></msup></math>`;
    },
    prompt: `Evaluate the folowing rational exponent.<br>If necessary, round your answer to the nearest hundredth,`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${Math.round(100*(Math.pow(A, (B+C)/(B))))/100}`;
    },
    reward: function() {
    return {actionId: "Scar3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 10,
    prop: "scar3",
    dakek: "scar",
    
  },
  "scar4": {
    name:"Scar 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `<math><msub><mi>log</mi><mn>${A}</mn></msub><mfenced><mn>${B}</mn></mfenced></math>`;
    },
    prompt: `Evaluate the folowing Logarithm.<br>If necessary, round your answer to the nearest hundredth,`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `${Math.round(100*(Math.log(B)/Math.log(A)))/100}`;
    },
    reward: function() {
    return {actionId: "Scar4", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 15,
    prop: "scar4",
    dakek: "scar",
    
  },
  "singe1": {
    name:"Singe 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(18)+2;
      window.Constants.B = utils.getRandomInt(18)+2;
      window.Constants.C = utils.getRandomInt(18)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `Evaluate the expression <math><mfrac><mn>${A}</mn><mi>x</mi></mfrac><mo>+</mo><mn>${B}</mn></math> when <math><mi>x</mi><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mn>${C}</mn></math> <br>If necessary, round your number to the nearest hundredth.`;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${Math.round(100*((A/C)+B))/100}`;
    },
    reward: function() {
    return {actionId: "Singe1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 8,
    prop: "singe1",
    dakek: "singe",
    
  },
  "singe2": {
    name:"Singe 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(100)+2;
      window.Constants.B = utils.getRandomInt(100)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `<math><mi>x</mi><mo>+</mo><mn>${A}</mn><mo>=</mo><mn>${B}</mn></math>`;
    },
    prompt: `Solve for ${utils.drawVariable("x")} in the following equation,`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `${B-A}`;
    },
    reward: function() {
    return {actionId: "Singe2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 9,
    prop: "singe2",
    dakek: "singe",
    
  },
  "singe3": {
    name:"Singe 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(100)+2;
      window.Constants.B = utils.getRandomInt(100)+2;
      window.Constants.C = utils.getRandomInt(100)+2;
      window.Constants.D = utils.getRandomInt(10)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><mn>${A}</mn><mi>x</mi><mo>+</mo><mn>${B}</mn><mo>=</mo><mn>${C}</mn><mo>+</mo><mn>${A+D}</mn><mi>x</mi></math>`;
    },
    prompt: `Solve for ${utils.drawVariable("x")} in the following equation,`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `${Math.round(100*((B-C)/D))/100}`;
    },
    reward: function() {
    return {actionId: "Singe3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 10,
    prop: "singe3",
    dakek: "singe",
    
  },
  "singe4": {
    name:"Singe 4",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(100)+2;
      window.Constants.B = utils.getRandomInt(5)+2;
      window.Constants.C = utils.getRandomInt(5)+2;
      window.Constants.D = utils.getRandomInt(10)+15;
      window.Constants.E = utils.getRandomInt(5)+2;
      window.Constants.F = utils.getRandomInt(5)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const F = window.Constants.F;
      return `<math><mfenced open="|" close="|"><mrow><mn>${A}</mn><mi>x</mi><mo>+</mo><mn>${B}</mn></mrow></mfenced><mo>+</mo><mn>${C}</mn><mo>&gt;</mo><mn>${D}</mn><mo>+</mo><mn>${A+F}</mn><mi>x</mi></math>`;
    },
    prompt: `Solve for ${utils.drawVariable("x")} in the following inequality,`,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const F = window.Constants.F;
      if((D-C-B)/(-A*F) < (C-D-B)/(2*A+F)) {
        if(A*F % D-C-B === 0) {
          window.Choices = [
            `${utils.drawVariable("x")} < ${(D-C-B)/(-A*F)}`,
            `${utils.drawVariable("x")} < ${(C-D-B)/(2*A+F)}`,
            `${utils.drawVariable("x")} > ${(D-C-B)/(-A*F)}`,
            `${utils.drawVariable("x")} > ${(C-D-B)/(2*A+F)}`,
            
          ];
        } else {
          window.Choices = [
            `${utils.drawVariable("x")} < -${utils.drawFraction(utils.simplify(Math.abs(D-C-B), A*F)[0], utils.simplify(Math.abs(D-C-B), A*F)[1])}`,
            `${utils.drawVariable("x")} < -${utils.drawFraction(utils.simplify(Math.abs(C-D-B), 2*A+F)[0], utils.simplify(Math.abs(C-D-B), 2*A+F)[1])}`,
            `${utils.drawVariable("x")} > -${utils.drawFraction(utils.simplify(Math.abs(D-C-B), A*F)[0], utils.simplify(Math.abs(D-C-B), A*F)[1])}`,
            `${utils.drawVariable("x")} > -${utils.drawFraction(utils.simplify(Math.abs(C-D-B), 2*A+F)[0], utils.simplify(Math.abs(C-D-B), 2*A+F)[1])}`,
          ];
        }
      } else {
        if(2*A+F % C-D-B === 0) {
          window.Choices = [
            `${utils.drawVariable("x")} < ${(D-C-B)/(-A*F)}`,
            `${utils.drawVariable("x")} < ${(C-D-B)/(2*A+F)}`,
            `${utils.drawVariable("x")} > ${(D-C-B)/(-A*F)}`,
            `${utils.drawVariable("x")} > ${(C-D-B)/(2*A+F)}`,
          ];
        } else {
          window.Choices = [
            `${utils.drawVariable("x")} < -${utils.drawFraction(utils.simplify(Math.abs(D-C-B), A*F)[0], utils.simplify(Math.abs(D-C-B), A*F)[1])}`,
            `${utils.drawVariable("x")} < -${utils.drawFraction(utils.simplify(Math.abs(C-D-B), 2*A+F)[0], utils.simplify(Math.abs(C-D-B), 2*A+F)[1])}`,
            `${utils.drawVariable("x")} > -${utils.drawFraction(utils.simplify(Math.abs(D-C-B), A*F)[0], utils.simplify(Math.abs(D-C-B), A*F)[1])}`,
            `${utils.drawVariable("x")} > -${utils.drawFraction(utils.simplify(Math.abs(C-D-B), 2*A+F)[0], utils.simplify(Math.abs(C-D-B), 2*A+F)[1])}`,
          ];
        }
      }
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const F = window.Constants.F;
      if((D-C-B)/(-A*F) < (C-D-B)/(2*A+F)) {
        if(A*F % D-C-B === 0) {
          return `${utils.drawVariable("x")} < ${(D-C-B)/(-A*F)}`
        } else {
          return `${utils.drawVariable("x")} < -${utils.drawFraction(utils.simplify(Math.abs(D-C-B), A*F)[0], utils.simplify(Math.abs(D-C-B), A*F)[1])}`;
        }
      } else {
        if(2*A+F % C-D-B === 0) {
          return `${utils.drawVariable("x")} < ${(C-D-B)/(2*A+F)}`
        } else {
          return `${utils.drawVariable("x")} < -${utils.drawFraction(utils.simplify(Math.abs(C-D-B), 2*A+F)[0], utils.simplify(Math.abs(C-D-B), 2*A+F)[1])}`;
        }
      }
    },
    reward: function() {
    return {actionId: "Singe4", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 12,
    prop: "singe4",
    dakek: "singe",
    
  },
  "singe5": {
    name:"Singe 5",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(18)+2;
      window.Constants.B = utils.getRandomInt(18)+2;
      window.Constants.C = utils.getRandomInt(18)+2;
      window.Constants.D = utils.getRandomInt(3);
      
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      if(D===0) {
        return `What is the slope of the following equation?<br><math><mn>${A}</mn><mi>x</mi><mo>-</mo><mn>${B}</mn><mi>y</mi><mo>=</mo><mn>${C}</mn></math>`;
      }
      if(D===1) {
        return `What is the y-intercept of the following equation?<br><math><mn>${A}</mn><mi>x</mi><mo>-</mo><mn>${B}</mn><mi>y</mi><mo>=</mo><mn>${C}</mn></math>`;
      }
      if(D===2) {
        return `What is the x-intercept of the following equation?<br><math><mn>${A}</mn><mi>x</mi><mo>-</mo><mn>${B}</mn><mi>y</mi><mo>=</mo><mn>${C}</mn></math>`;
      }
      
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      if(D===0) {
        return `${Math.round(100*(A/B))/100}`;
      }
      if(D===1) {
        return `${Math.round(100*(-C/B))/100}`;
      }
      if(D===2) {
        return `${Math.round(100*(C/A))/100}`;
      }
    },
    reward: function() {
    return {actionId: "Singe5", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 15,
    prop: "singe5",
    dakek: "singe",
    
  },
  "scorch1": {
    name:"Scorch 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(10)+2;
      window.Constants.D = utils.getRandomInt(10)+2;
      window.Constants.E = utils.getRandomInt(10)+2;
      window.Constants.F = utils.getRandomInt(2);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      return `<math><mn>${A}</mn><mi>x</mi><mo>+</mo><mn>${B}</mn><mi>y</mi><mo>=</mo><mn>${C}</mn></math><br>
      <math><mi>y</mi><mo>=</mo><mn>${D}</mn><mi>x</mi><mo>+</mo><mn>${E}</mn></math><br>
      If necessary, round your answer to the nearest hundredth.`;
    },
    prompt: `At what x coordinate do these lines intersect?`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `${Math.round(100*((C-B*E)/(B*D+A)))/100}`;
    },
    reward: function() {
    return {actionId: "Scorch1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 16,
    prop: "scorch1",
    dakek: "scorch",
    
  },
  "scorch2": {
    name:"Scorch 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(14)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(40)+10;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `This year, there are ${A} systems infected by the galactic virus Nysis-3. Every year, the number of systems infected increases by ${B}%. How many systems will be infected ${C} years from now? Round to the nearest whole system.`;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${Math.round((A + A*Math.pow((1 + B/100), C)))}`;
    },
    reward: function() {
    return {actionId: "Scorch2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 18,
    prop: "scorch2",
    dakek: "scorch",
    
  },
  "scorch3": {
    name:"Scorch 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(20)+2;
      window.Constants.B = utils.getRandomInt(7)+1;
      window.Constants.C = utils.getRandomInt(8)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><mn>${C}</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>${C*2*A+C*B}</mn><mi>x</mi><mo>+</mo><mn>${C*A*A + C*A*B}</mn><mo>=</mo><mn>0</mn></math>`;
    },
    prompt: `Find most negative of the two x solutions to this quadratic.`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${A}`
    },
    reward: function() {
    return {actionId: "Scorch3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 20,
    prop: "scorch3",
    dakek: "scorch",
    
  },
  "scorch4": {
    name:"Scorch 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = (utils.getRandomInt(100)+2)/10;
      window.Constants.B = (utils.getRandomInt(100)+2)/10;
      window.Constants.C = (utils.getRandomInt(10)+1)/10;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `<math><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>${A+B}</mn><mi>x</mi><mo>+</mo><mn>${A*B-C*C}</mn><mo>=</mo><mn>0</mn></math><br>
      If necessary, round your answer to the nearest hundredth.`;
    },
    prompt: `Find the greatest of the two solutions to this quadratic by completing the square.`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      if(A>B) {return `${A}`;}
      if(A<B) {return `${B}`;}
    },
    reward: function() {
    return {actionId: "Scorch4", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 24,
    prop: "scorch4",
    dakek: "scorch",
    
  },
  "raze1": {
    name:"Raze 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(15)+2;
      window.Constants.B = utils.getRandomInt(15)+2;
      window.Constants.C = utils.getRandomInt(10)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `<math><mn>${C}</mn><msup><mi>x</mi><mn>3</mn></msup><mo>+</mo><mn>${C*(A+B)}</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>${C*A*B}</mn><mi>x</mi><mo>=</mo><mn>0</mn></math>`;
    },
    prompt: `Find the biggest root of this polynomial.`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      if(A>B) {return `${B}`;}
      if(A<B) {return `${A}`;}
    },
    reward: function() {
    return {actionId: "Raze1", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 26,
    prop: "raze1",
    dakek: "raze",
    
  },
  "raze2": {
    name:"Raze 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+11;
      window.Constants.B = utils.getRandomInt(18)+2;
      window.Constants.C = utils.getRandomInt(8)+2;
      window.Constants.D = utils.getRandomInt(18)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><msqrt><mn>${A}</mn><mi>x</mi><mo>+</mo><mn>${B}</mn></msqrt><mo>-</mo><msqrt><mn>${A-C}</mn><mi>x</mi><mo>+</mo><mn>${D}</mn></msqrt><mo>=</mo><mn>0</mn></math>`;
    },
    prompt: `Solve for x,`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `${Math.round(100*((D-B)/C))/100}`;
    },
    reward: function() {
    return {actionId: "Raze2", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 28,
    prop: "raze2",
    dakek: "raze",
    
  },
  "raze3": {
    name:"Raze 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(100)+50;
      window.Constants.B = utils.getRandomInt(200)+101;
      window.Constants.C = utils.getRandomInt(9)+2;
      window.Constants.D = utils.getRandomInt(50)+50;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `Mercy is in a Ferris Wheel. She will reach the ${A} foot peak ${B} seconds after she starts her ride. If she is ${C} feet off the ground at the start, how high will she be ${D} seconds into the ride? Round your answer to the nearest foot.`;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `${Math.round(-((A-C)/2)*Math.cos((3.14159*D)/(B))+C+((A-C)/2))}`;
    },
    reward: function() {
    return {actionId: "Raze3", dakek: "R", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 30,
    prop: "raze3",
    dakek: "raze",
    
  },
  
  //Geometry
  "aid1": {
    name:"Aid 1",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(4));
      
    },
    content: function() {
      const A = window.Constants.A;
      if(A === 0) {
        return `<svg width="100" height="100" fill="yellow"><polygon points="30, 0, 60, 51.96, 0, 51.96"/></svg>`;
      }
      if(A === 1) {
        return `<svg width="100" height="100" fill="blue"><circle cx="30" cy="30" r="30"/></svg>`;
      }
      if(A === 2) {
        return `<svg width="100" height="100" fill="red"><rect x="0" y="0" width="60" height="60"/></svg>`;
      }
      if(A === 3) {
        return `<svg width="100" height="100" fill="purple"><rect x="0" y="0" width="80" height="50"/></svg>`;
      }
        
      
    },
    getChoices() {
      window.Choices = [
      "Square",
      "Triangle",
      "Circle",
      "Rectangle",
      ];
      
    },
    prompt: `<p>What is this shape?</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      if(A === 0) {
        return "Triangle";
      }
      if(A === 1) {
        return "Circle";
      }
      if(A === 2) {
        return "Square";
      }
      if(A === 3) {
        return "Rectangle";
      }
    },
    reward: function() {
    return {actionId: "Aid1", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "aid1",
    dakek: "aid",
  },
  "aid2": {
    name:"Aid 2",
    inputType: "2choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(2));
      
    },
    content: function() {
      const A = window.Constants.A;
      if(A === 0) {
        return `<svg width="300" height="130">
          <rect width="100" height="100" fill="blue"/>
          <rect x="120" width="120" height="120" fill="red"/>
        </svg>`;
      }
      if(A === 1) {
        return `<svg width="300" height="130">
          <rect width="120" height="120" fill="blue"/>
          <rect x="120" width="100" height="100" fill="red"/>
        </svg>`;
      }
        
      
    },
    getChoices() {
      window.Choices = [
      "The red square is bigger than the blue square",
      "The blue square is bigger than the red square",
      ];
      
    },
    prompt: `<p>Which statement is true about these shapes?</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      if(A === 0) {
        return "The red square is bigger than the blue square";
      }
      if(A === 1) {
        return "The blue square is bigger than the red square";
      }
    },
    reward: function() {
    return {actionId: "Aid2", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "aid2",
    dakek: "aid",
  },
  "aid3": {
    name:"Aid 3",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(4));
      window.Constants.B = utils.getRandomInt(4);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      var color;
      if(B === 0) {
        color = "red";
      }
      if(B === 1) {
        color = "magenta";
      }
      if(B === 2) {
        color = "yellow";
      }
      if(B === 3) {
        color = "green";
      }
      if(A === 0) {
        return `<svg width="100" height="100" fill=${color}><polygon points="25, 20, 0, 50, 75, 50, 100, 20"/><line x1="60" y1="16" x2="60" y2="25" stroke="black"/><line x1="47" y1="45" x2="47" y2="54" stroke="black"/><line x1="63" y1="16" x2="63" y2="25" stroke="black"/><line x1="44" y1="45" x2="44" y2="54" stroke="black"/><line x1="10" y1="32" x2="20" y2="35" stroke="black"/><line x1="83" y1="32" x2="93" y2="35" stroke="black"/>`;
      }
      if(A === 1) {
        return `<svg width="100" height="100" fill=${color}><polygon points="25, 10, 0, 50, 100, 50, 75, 10"/><line x1="9" y1="27" x2="20" y2="31" stroke="black"/><line x1="81" y1="31" x2="93" y2="27" stroke="black"/></svg>`;
      }
      if(A === 2) {
        return `<svg width="100" height="100" fill=${color}><polygon points="25, 20, 0, 90.71, 75, 90.71, 100, 20"/><line x1="58" y1="15" x2="58" y2="27" stroke="black"/><line x1="94" y1="58" x2="82" y2="55" stroke="black"/><line x1="6" y1="55" x2="18" y2="58" stroke="black"/><line x1="40" y1="96" x2="40" y2="84" stroke="black"/></svg>`;
      }
      if(A === 3) {
        return `<svg width="100" height="100" fill=${color}><polygon points="0, 10, 0, 50, 75, 50, 75, 10"/><line x1="64" y1="10" x2="64" y2="21" stroke="black"/><line x1="64" y1="21" x2="75" y2="21" stroke="black"/><line x1="12" y1="39" x2="12" y2="50" stroke="black"/><line x1="0" y1="39" x2="12" y2="39" stroke="black"/></svg>`;
      }
        
      
    },
    getChoices() {
      window.Choices = [
      "Parallelogram",
      "Trapezoid",
      "Rhombus",
      "Rectangle",
      ];
      
    },
    prompt: `<p>What is this shape?</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      if(A === 0) {
        return "Parallelogram";
      }
      if(A === 1) {
        return "Trapezoid";
      }
      if(A === 2) {
        return "Rhombus";
      }
      if(A === 3) {
        return "Rectangle";
      }
    },
    reward: function() {
    return {actionId: "Aid3", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 3,
    prop: "aid3",
    dakek: "aid",
  },
  "aid4": {
    name:"Aid 4",
    inputType: "3choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(3));
      window.Constants.B = utils.getRandomInt(4);
      window.Constants.C = utils.getRandomInt(2);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var color;
      if(B === 0) {
        color = "red";
      }
      if(B === 1) {
        color = "magenta";
      }
      if(B === 2) {
        color = "yellow";
      }
      if(B === 3) {
        color = "green";
      }
      if(A === 0) {
        return `<svg width="100" height="100" fill=${color}><polygon points="25, 0, 0, 43.87, 50, 43.87"/><line x1="8" y1="20" x2="19" y2="25" stroke="black"/><line x1="43" y1="20" x2="32" y2="25" stroke="black"/><line x1="25" y1="37" x2="25" y2="50" stroke="black"/></svg>`;
      }
      if(A === 1) {
        return `<svg width="100" height="100" fill=${color}><polygon points="10, 0, 10, 43.87, 90, 43.87"/><line x1="5" y1="25" x2="19" y2="25" stroke="black"/><line x1="5" y1="28" x2="19" y2="28" stroke="black"/><line x1="52" y1="16" x2="44" y2="25" stroke="black"/><line x1="45" y1="37" x2="45" y2="50" stroke="black"/><line x1="48" y1="37" x2="48" y2="50" stroke="black"/><line x1="42" y1="37" x2="42" y2="50" stroke="black"/><line x1="10" y1="36.87" x2="17" y2="36.87" stroke="black" /><line x1="17" y1="36.87" x2="17" y2="43.87" stroke="black" /></svg>`;
      }
      if(A === 2) {
        return `<svg width="100" height="100" fill=${color}><polygon points="0, 0, 25, 43.3, 75, 43.3"/><line x1="9" y1="27" x2="21" y2="20" stroke="black"/><line x1="11" y1="30" x2="23" y2="23" stroke="black"/><line x1="42" y1="18" x2="34" y2="28" stroke="black"/><line x1="50" y1="37" x2="50" y2="50" stroke="black"/><line x1="46" y1="37" x2="46" y2="50" stroke="black"/></svg>`;
      }
        
      
    },
    getChoices() {
      const C = window.Constants.C;
      if(C === 0) {
        window.Choices = [
        "Obtuse",
        "Right",
        "Acute",
        ];
      }
      if(C === 1) {
        window.Choices = [
        "Scalene",
        "Obtuse",
        "Equilateral",
        ];
      }
    },
    prompt: `<p>What is this shape?</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      if(A === 0) {
          if(C === 0){return "Acute";} else {return "Equilateral";}
      }
      if(A === 1) {
          if(C === 0){return "Right";} else {return "Scalene";}
      }
      if(A === 2) {
          if(C === 0){return "Obtuse";} else {return "Isosceles";}
      }
    },
    reward: function() {
    return {actionId: "Aid4", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "aid4",
    dakek: "aid",
  },
  "aid5": {
    name:"Aid 5",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(200)-100;
      window.Constants.B = utils.getRandomInt(200)-100;
      window.Constants.C = utils.getRandomInt(200)-100;
      window.Constants.D = utils.getRandomInt(200)-100;
      window.Constants.E = utils.getRandomInt(200)-100;
      window.Constants.F = utils.getRandomInt(200)-100;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `After a translation of the coordinate plane, point (${A}, ${B}) is now located at (${A+C}, ${B+D}). Where would the point (${E}, ${F}) be located under this translation?`;
    },
    prompt: ``,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      window.Choices = [
      `(${C+E}, ${F+D})`,
      `(${A+E}, ${F+B})`,
      `(${C+E+A}, ${F+D+B})`,
      `(${E-C}, ${F-D})`,
      ];
      
    },
    getSolution: function() {
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `(${C+E}, ${F+D})`;
    },
    reward: function() {
    return {actionId: "Aid5", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "aid5",
    dakek: "aid",
  },
  "aid6": {
    name:"Aid 6",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(7);
      window.Constants.B = utils.getRandomInt(7);
      window.Constants.C = utils.getRandomInt(7);
      window.Constants.D = ["Translation", "Rotation", "Scale", "Horizontal Stretch", "Vertical Stretch", "Reflection about the x-axis", "Reflection about the y-axis"];
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      
      return `${D[A]},
      <br> ${D[B]},
      <br> ${D[C]},`;
    },
    prompt: `What features would be preserved after the following sequence of transformations?`,
    getChoices() {
      window.Choices = [
      "Both angles and side lengths",
      "Only side lengths",
      "Only angles",
      "Neither angles nor side lengths",
      ];
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      if(A === 3 || B === 3 || C === 3 || A === 4 || B === 4 || C === 4) {
        return "Neither angles nor side lengths";
      } else if (A === 2 || B === 2 || C === 2) {
        return "Only angles";
      } else {return "Both angles and side lengths";}
    },
    
    reward: function() {
    return {actionId: "Aid6", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "aid6",
    dakek: "aid",
  },
  "vive1": {
    name:"Vive 1",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(8);
      window.Constants.B = [30, 45, 60, 90, 120, 135, 150, 180]
      window.Constants.C = utils.getRandomInt(8);
      window.Constants.D = utils.getRandomInt(8);
      window.Constants.E = utils.getRandomInt(8);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      var path = utils.describeArc(70, 60, 14, 360-B[A], 0, 50)
      if(A!== 3) {
        return `<svg height="70" fill="none"><path d="${path}" stroke="black"></path><line x1="70" y1="60" x2="100" y2="60" stroke="black" /><line x1="70" y1="60" x2="${70+30*Math.cos((360-B[A])*Math.PI/180)}" y2="${60+30*Math.sin((360-B[A])*Math.PI/180)}" stroke="black" /></svg>`;
      } else {
        return `<svg fill="none"><line x1="70" y1="54" x2="76" y2="54" stroke="black" /><line x1="76" y1="60" x2="76" y2="54" stroke="black"/><line x1="70" y1="60" x2="100" y2="60" stroke="black" /><line x1="70" y1="60" x2="${70+30*Math.cos((360-B[A])*Math.PI/180)}" y2="${60+30*Math.sin((360-B[A])*Math.PI/180)}" stroke="black" /></svg>`;
      }
    },
    prompt: `Identify the angle,`,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      window.Choices = [
      `${B[A]}\u00B0`,
      `${B[C]}\u00B0`,
      `${B[D]}\u00B0`,
      `${B[E]}\u00B0`,
      ];
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `${B[A]}\u00B0`;
    },
    reward: function() {
    return {actionId: "Vive1", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "vive1",
    dakek: "vive",
  },
  "vive2": {
    name:"Vive 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(24)+30;
    },
    content: function() {
      var angle = window.Constants.A;
      var height = (168.003)*Math.sin(angle*2*Math.PI/360)
      var mHeight = (84.0015)*Math.sin(angle*2*Math.PI/360)
      var length = (168.003)*Math.cos(angle*2*Math.PI/360)
      var mLength = (84.0015)*Math.cos(angle*2*Math.PI/360)
      var path1 = utils.describeArc(50+length, 150-height, 10, 180-(angle), 180, 50)
      var path2 = utils.describeArc(50+mLength, 150-mHeight, 10, 270+90-(angle), 90, 50)
      return `<p style="position: absolute; left: 43px; top: ${125+150-height}px;">A</p>
            <p style="position: absolute; left: ${70+length}px; top: ${125+150-height}px;">B</p>
            <p style="position: absolute; left: ${14+length+20*Math.sin(angle*2*Math.PI/360)}px; top: ${134+150-height}px;">${angle}\u00B0</p>
            <p style="position: absolute; left: 43px; top: 278px;">C</p>
            <p style="position: absolute; left: ${70+length}px; top: 278px;">D</p>
            <p style="position: absolute; left: ${62+mLength}px; top: 290px;">E</p>
            <p style="position: absolute; left: ${58+mLength}px; top: ${116+150-mHeight}px;">F</p>
            
            <svg height="250" fill="none"><line x1="50" y1="${150-height}" x2="${50+length}" y2="${150-height}" stroke="black"/>
            
            <path d="${path1}" stroke="black"></path>
            <path d="${path2}" stroke="black"></path>
            
            <line x1="50" y1="150" x2="${50+length}" y2="${150-height}" stroke="black"/>
            <line x1="50" y1="150" x2="${50+length}" y2="150" stroke="black"/>
            <line x1="${50+mLength}" y1="${150-mHeight}" x2="${50+mLength}" y2="150" stroke="black"/>
            <line x1="${50+mLength-10}" y1="140" x2="${50+mLength}" y2="140" stroke="black"/>
            <line x1="${50+mLength-10}" y1="140" x2="${50+mLength-10}" y2="150" stroke="black"/>
            <circle cx="50" cy="${150-height}" r="2" fill="black"/>
            <circle cx="${50+length}" cy="${150-height}" r="2" fill="black"/>
            <circle cx="${50+mLength}" cy="${150-mHeight}" r="2" fill="black"/>
            <circle cx="${50+length}" cy="150" r="2" fill="black"/>
            <circle cx="50" cy="150" r="2" fill="black"/>
            <circle cx="${50+mLength}" cy="150" r="2" fill="black"/>
            
                
            </svg>`;
      
    },
    prompt: `AB and CD are parallel. What is angle BFE? Write your answer in degrees.`,

    getSolution: function() {
      angle = window.Constants.A;
      return `${90+angle}`
    },
    reward: function() {
    return {actionId: "Vive2", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "vive2",
    dakek: "vive",
  },
  "vive3": {
    name:"Vive 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(13)+6;
      window.Constants.B = utils.getRandomInt(13)+6;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = Math.sqrt(A*A + B*B);
      const angle = Math.atan(A/B)
      return `<p style="position: absolute; left: 10px; top: ${130+5*A}px;">${A}</p>
      <p style="position: absolute; left: ${20+5*B}px; top: ${135+10*A}px;">${B}</p>
      
      <svg width="200" height="200" fill="red"><polygon points="10, 0, 10, ${10*A}, ${10+10*B}, ${10*A}"/>
      
      <line x1="10" y1="${10*A-10}" x2="20" y2="${10*A-10}" stroke="black" />
      <line x1="20" y1="${10*A-10}" x2="20" y2="${10*A}" stroke="black" /></svg>`;
    },
    prompt: `Find the missing side length. Round your answer to the nearest hundredth,`,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `${Math.round(100*Math.sqrt(A*A + B*B))/100}`;
    },
    reward: function() {
    return {actionId: "Vive3", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 5,
    prop: "vive3",
    dakek: "vive",
  },
  "heal1": {
    name:"Heal 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(13)+6;
      window.Constants.B = utils.getRandomInt(13)+6;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `<svg width="100" height="100" fill="green"><polygon points="0, 10, 0, ${10+5*A}, ${5*B}, ${10+5*A}, ${5*B}, 10"/></svg>
      <p style="position: absolute; left: -5px; top: ${90+5*A/2}px;">${A}</p>
      <p style="position: absolute; left: ${5+5*B/2}px; top: ${103+5*A}px;">${B}</p>`;
    },
    prompt: `Find the area,`,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `${A*B}`;
    },
    reward: function() {
    return {actionId: "Heal1", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 5,
    prop: "heal1",
    dakek: "heal",
  },
  "heal2": {
    name:"Heal 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(7)+6;
      window.Constants.B = utils.getRandomInt(7)+6;
      window.Constants.C = utils.getRandomInt(4)+3;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const diag = Math.sqrt(2)/3;
      return `
      <p style="position: absolute; left: 5px; top: ${120+5*B/2}px;">${B}</p>
      <p style="position: absolute; left: ${20+5*A/2}px; top: ${135+5*B}px;">${A}</p>
      <p style="position: absolute; left: ${30+5*A+5*C*diag}px; top: ${120-5*C*diag/2}px;">${C}</p>
      <svg width="200" height="150">
        <line x1="10" y1="40" x2="${10+5*A}" y2="40" stroke="black" />
        <line x1="10" y1="40" x2="10" y2="${40+5*B}" stroke="black" />
        <line x1="${10+5*A}" y1="40" x2="${10+5*A}" y2="${40+5*B}" stroke="black" />
        <line x1="10" y1="${40+5*B}" x2="${10+5*A}" y2="${40+5*B}" stroke="black" />
        
        <line x1="10" y1="40" x2="${10+diag*5*C}" y2="${40-diag*5*C}" stroke="black" />
        <line x1="${10+5*A}" y1="${40}" x2="${10+5*A+diag*C*5}" y2="${40-diag*5*C}" stroke="black" />
        <line x1="${10+5*A}" y1="${40+5*B}" x2="${10+5*A+diag*C*5}" y2="${40+5*B-diag*5*C}" stroke="black" />
        
        <line x1="${10+diag*5*C}" y1="${40-diag*5*C}" x2="${10+5*A+diag*C*5}" y2="${40-diag*5*C}" stroke="black" />
        <line x1="${10+5*A+diag*C*5}" y1="${40-diag*5*C}" x2="${10+5*A+diag*C*5}" y2="${40+5*B-diag*5*C}" stroke="black" />
      </svg>`;
    },
    prompt: `Find the volume of the shape,`,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${A*B*C}`;
    },
    reward: function() {
    return {actionId: "Heal2", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 5,
    prop: "heal2",
    dakek: "heal",
  },
  "heal3": {
    name:"Heal 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(50)+10;
      window.Constants.B = utils.getRandomInt(2);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      var contentHTML;
      if(B===0) {contentHTML = `<p>Find the circumference,<br>Round your answer to the nearest tenth.</p>`}
      if(B===1) {contentHTML = `<p>Find the area,<br>Round your answer to the nearest tenth.</p></p>`}
      contentHTML += `
      <p style="position: absolute; left: 120px; top: 200px;">${utils.drawVariable("r")} = ${A}</p>
      
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="black" fill="none" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="black"/>
        <circle cx="50" cy="50" r="1" fill="black" />
      </svg>`;
      return contentHTML;
    },
    
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      if(B===0) {return `${Math.round(100*(2*Math.PI*A))/100}`}
      if(B===1) {return `${Math.round(100*(Math.PI*A*A))/100}`}
    },
    reward: function() {
    return {actionId: "Heal3", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 7,
    prop: "heal3",
    dakek: "heal",
  },
  "heal4": {
    name:"Heal 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(300)+30;
      window.Constants.B = utils.getRandomInt(2);
      window.Constants.C = utils.getRandomInt(30)+10;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const path1 = utils.describeArc(50, 50, 30, 360-(A), 360, 50)
      const path2 = utils.describeArc(50, 50, 5, 360-(A), 360, 50)
      var contentHTML;
      if(B===0) {contentHTML = `<p>Find the arc length,<br>Round your answer to the nearest tenth.</p>`}
      if(B===1) {contentHTML = `<p>Find the area,<br>Round your answer to the nearest tenth.</p></p>`}
      contentHTML += `
      <p style="position: absolute; left: 120px; top: 175px;">${utils.drawVariable("r")} = ${C}<br> angle = ${A}\u00B0</p>
      
      <svg width="100" height="100">
        <path d="${path1}" stroke="black" fill="none"></path>
        <path d="${path2}" stroke="black" fill="none"></path>
        <line x1="50" y1="50" x2="80" y2="50" stroke="black"/>
        
        <circle cx="50" cy="50" r="1" fill="black" />
        <circle cx="80" cy="50" r="1" fill="black" />
        <circle cx="${50+30*Math.cos(A*Math.PI/180)}" cy="${50-30*Math.sin(A*Math.PI/180)}" r="1" fill="black" />
        
      </svg>`;
      return contentHTML;
    },
    
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const ratio = A/360;
      if(B===0) {return `${Math.round(100*(2*Math.PI*C*ratio))/100}`}
      if(B===1) {return `${Math.round(100*(Math.PI*C*C*ratio))/100}`}
    },
    reward: function() {
    return {actionId: "Heal4", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 7,
    prop: "heal4",
    dakek: "heal",
  },
  "heal5": {
    name:"Heal 5",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(13)+1;
      window.Constants.B = utils.getRandomInt(13)+1;
      window.Constants.C = utils.getRandomInt(22)+1;
      window.Constants.D = utils.getRandomInt(22)+1;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><mfrac><msup><mfenced><mrow><mi>x</mi><mo>-</mo><mn>${C}</mn></mrow></mfenced><mn>2</mn></msup><mn>${A*A}</mn></mfrac><mo>+</mo><mfrac><msup><mfenced><mrow><mi>y</mi><mo>-</mo><mn>${D}</mn></mrow></mfenced><mn>2</mn></msup><mn>${B*B}</mn></mfrac><mo>=</mo><mn>1</mn></math>`
    },
    prompt: `Find the coordinates for the foci of the following ellipse`,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      var dist;
      if(A<B) {dist = Math.sqrt(B*B-A*A)}
      if(A>B) {dist = Math.sqrt(A*A-B*B)}
      window.Choices = [
      `(${Math.round(100*(C-dist))/100}, ${Math.round(100*(D-dist))/100}), (${Math.round(100*(C+dist))/100}, ${Math.round(100*(D+dist))/100})`,
      `(${Math.round(100*(A+dist))/100}, ${Math.round(100*(B+dist))/100}), (${Math.round(100*(A-dist))/100}, ${Math.round(100*(B-dist))/100})`,
      `(${Math.round(100*(C-dist))/100}, ${D}), (${Math.round(100*(C+dist))/100}, ${D})`,
      `(${C}, ${Math.round(100*(D-dist))/100}), (${C}, ${Math.round(100*(D+dist))/100})`,
      ];
      
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      var dist;
      if(A<B) {
        dist = Math.sqrt(B*B-A*A);
        return `(${C}, ${Math.round(100*(D-dist))/100}), (${C}, ${Math.round(100*(D+dist))/100})`;
        
      }
      if(A>B) {
        dist = Math.sqrt(A*A-B*B);
        return `(${Math.round(100*(C-dist))/100}, ${D}), (${Math.round(100*(C+dist))/100}, ${D})`;
      }
    },
    reward: function() {
    return {actionId: "Heal5", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 2,
    prop: "heal5",
    dakek: "heal",
  },
  "rush1": {
    name:"Rush 1",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(8)+3;
      window.Constants.B = utils.getRandomInt(8)+3;
      window.Constants.D = utils.getRandomInt(4);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const D = window.Constants.D;
      const angle = Math.atan(A/B)*180/Math.PI
      const path1 = utils.describeArc(10*B+8.5, 10*A-0.5, 10, 180, 180+angle, 50)
      
      var contentHTML;
      if(D===0) {contentHTML = `Which of the following is equal to <math><mi>sin</mi><mfenced><mi>&#x3B8;</mi></mfenced></math>`}
      if(D===1) {contentHTML = `Which of the following is equal to <math><mi>cos</mi><mfenced><mi>&#x3B8;</mi></mfenced></math>`}
      if(D===2) {contentHTML = `Which of the following is equal to <math><mi>tan</mi><mfenced><mi>&#x3B8;</mi></mfenced></math>`}
      if(D===3) {contentHTML = `Which of the following is equal to <math><mi>sec</mi><mfenced><mi>&#x3B8;</mi></mfenced></math>`}
      if(D===4) {contentHTML = `Which of the following is equal to <math><mi>csc</mi><mfenced><mi>&#x3B8;</mi></mfenced></math>`}
      if(D===5) {contentHTML = `Which of the following is equal to <math><mi>cot</mi><mfenced><mi>&#x3B8;</mi></mfenced></math>`}
      contentHTML += `
      <p style="position: absolute; left: 10px; top: ${105+5*A}px;">A</p>
      <p style="position: absolute; left: ${20+5*B}px; top: ${115+10*A}px;">B</p>
      <p style="position: absolute; left: ${25+5*B}px; top: ${100+5*A}px;">C</p>
      <p style="position: absolute; left: ${30+10*B}px; top: ${105+10*A}px;">&#x3B8;</p>
      
      <svg width="200" height="200" fill="red"><polygon points="10, 0, 10, ${10*A}, ${10+10*B}, ${10*A}"/>
      <path d="${path1}" stroke="black" fill="none"></path>
      <line x1="10" y1="${10*A-10}" x2="20" y2="${10*A-10}" stroke="black" />
      <line x1="20" y1="${10*A-10}" x2="20" y2="${10*A}" stroke="black" /></svg>
        `;
      return contentHTML;
    },
    
    prompt: ``,
    getChoices() {
      const D = window.Constants.D;
     if(D===0) { window.Choices = [
      `<math><mfrac><mn>A</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>A</mn><mn>C</mn></mfrac></math>`,
      ];}
      if(D===1) { window.Choices = [
      `<math><mfrac><mn>B</mn><mn>C</mn></mfrac></math>`,
      `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>A</mn></mfrac></math>`,
      ];}
      if(D===2) { window.Choices = [
      `<math><mfrac><mn>A</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>A</mn><mn>C</mn></mfrac></math>`,
      ];}
      if(D===3) { window.Choices = [
      `<math><mfrac><mn>A</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>A</mn><mn>C</mn></mfrac></math>`,
      ];}
      if(D===4) { window.Choices = [
      `<math><mfrac><mn>B</mn><mn>C</mn></mfrac></math>`,
      `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>A</mn><mn>C</mn></mfrac></math>`,
      ];}
      if(D===5) { window.Choices = [
      `<math><mfrac><mn>A</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`,
      `<math><mfrac><mn>C</mn><mn>B</mn></mfrac></math>`,
      `<math><mfrac><mn>A</mn><mn>C</mn></mfrac></math>`,
      ];}
     
      
    },
    getSolution: function() {
      const D = window.Constants.D;
      
      
      if(D===0) {return `<math><mfrac><mn>A</mn><mn>C</mn></mfrac></math>`;}
      if(D===1) {return `<math><mfrac><mn>B</mn><mn>C</mn></mfrac></math>`;}
      if(D===2) {return `<math><mfrac><mn>A</mn><mn>B</mn></mfrac></math>`;}
      if(D===3) {return `<math><mfrac><mn>C</mn><mn>B</mn></mfrac></math>`;}
      if(D===4) {return `<math><mfrac><mn>C</mn><mn>A</mn></mfrac></math>`;}
      if(D===5) {return `<math><mfrac><mn>B</mn><mn>A</mn></mfrac></math>`;}
      
    },
    reward: function() {
    return {actionId: "Rush1", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 7,
    prop: "rush1",
    dakek: "rush",
  },
  "rush2": {
    name:"Rush 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(8)+3;
      window.Constants.B = utils.getRandomInt(8)+3;
      window.Constants.D = utils.getRandomInt(2);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const D = window.Constants.D;
      const angle = Math.atan(A/B)*180/Math.PI
      const path1 = utils.describeArc(10*B+8.5, 10*A-0.5, 10, 180, 180+angle, 50)
      
      var contentHTML;
      if(D===0) {contentHTML = `<p style="position: absolute; left: 5px; top: ${130+5*A}px;">${A}</p>`}
      if(D===1) {contentHTML = `<p style="position: absolute; left: ${20+5*B}px; top: ${135+10*A}px;">${B}</p>`}
     
      contentHTML += `
      <p style="position: absolute; left: ${25+5*B}px; top: ${115+5*A}px;">${utils.drawVariable("x")}</p>
      <p style="position: absolute; left: ${30+10*B}px; top: ${120+10*A}px;">${Math.round(100*angle)/100}\u00B0</p>
      
      <svg width="200" height="110" fill="cyan"><polygon points="10, 0, 10, ${10*A}, ${10+10*B}, ${10*A}"/>
      <path d="${path1}" stroke="black" fill="none"></path>
      <line x1="10" y1="${10*A-10}" x2="20" y2="${10*A-10}" stroke="black" />
      <line x1="20" y1="${10*A-10}" x2="20" y2="${10*A}" stroke="black" /></svg>
        `;
      return contentHTML;
    },
    
    prompt: `Find the side length ${utils.drawVariable("x")}. Round your answer to the nearest tenth.`,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return Math.round(10*Math.sqrt(A*A + B*B))/10;
    },
    reward: function() {
    return {actionId: "Rush2", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 7,
    prop: "rush2",
    dakek: "rush",
  },
  "rush3": {
    name:"Rush 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = (utils.getRandomInt(30)+20)/10;
      window.Constants.B = (utils.getRandomInt(30)+20)/10;
      const sum = window.Constants.A + window.Constants.B;
      const diff = Math.abs(window.Constants.A - window.Constants.B);
      window.Constants.C = (utils.getRandomInt(sum*10-diff*10-5)+diff*10+5)/10
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `The Death Star's laser cannon is aimed directly at Alderaan. The Death Star is ${A} lightyears away from Alderaan and ${B} lightyears away from Kashyyk. Kashyyk is ${C} lightyears away from Alderaan. How many radians must the Death Star rotate in order to be aimed directly at Kashyyk? Round your answer to the nearest hundredth of a radian.`;
      
    },
    
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const num = C*C - A*A - B*B;
      const den = -2*A*B;
      return `${Math.round(100*(Math.acos(num / den)))/100}`
    },
    reward: function() {
    return {actionId: "Rush3", dakek: "B", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"}
      
    },
    penalty: 7,
    prop: "rush3",
    dakek: "rush",
  },
  
  //Data Analysis
  "flect1": {
    name:"Flect 1",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = [3, 28, 53, 78];
      window.Constants.B = [100, 80, 60, 40];
      utils.shuffleArray(window.Constants.B);
      
    },
    content: function() {
      const lineFirsts = window.Constants.A;
      const lineLasts = window.Constants.B;
      
      return `<svg height="100" width="100">
      <line x1="0" y1="${lineFirsts[0]}" x2="${lineLasts[0]}" y2="${lineFirsts[0]}" stroke="black" stroke-width="5"/>
      <line x1="0" y1="${lineFirsts[1]}" x2="${lineLasts[1]}" y2="${lineFirsts[1]}" stroke="black" stroke-width="5"/>
      <line x1="0" y1="${lineFirsts[2]}" x2="${lineLasts[2]}" y2="${lineFirsts[2]}" stroke="black" stroke-width="5"/>
      <line x1="0" y1="${lineFirsts[3]}" x2="${lineLasts[3]}" y2="${lineFirsts[3]}" stroke="black" stroke-width="5"/>
      </svg>`
        
      
    },
    getChoices() {
      window.Choices = [
      "Line 1",
      "Line 2",
      "Line 3",
      "Line 4",
      ];
      
    },
    prompt: `<p>Which line is longest?</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      if(B[0] === 100) {
        return "Line 1";
      }
      if(B[1] === 100) {
        return "Line 2";
      }
      if(B[2] === 100) {
        return "Line 3";
      }
      if(B[3] === 100) {
        return "Line 4";
      }
    },
    reward: function() {
    return {actionId: "Flect1", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "flect1",
    dakek: "flect",
  },
   "flect2": {
    name:"Flect 2",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = [3, 36, 69,];
      window.Constants.B = [100, 70, 40];
      utils.shuffleArray(window.Constants.B);
      
    },
    content: function() {
      const lineFirsts = window.Constants.A;
      const lineLasts = window.Constants.B;
      
      return `<svg height="100" width="100">
      <line x1="0" y1="${lineFirsts[0]}" x2="${lineLasts[0]}" y2="${lineFirsts[0]}" stroke="black" stroke-width="5"/>
      <line x1="0" y1="${lineFirsts[1]}" x2="${lineLasts[1]}" y2="${lineFirsts[1]}" stroke="black" stroke-width="5"/>
      <line x1="0" y1="${lineFirsts[2]}" x2="${lineLasts[2]}" y2="${lineFirsts[2]}" stroke="black" stroke-width="5"/>
      </svg>`
        
      
    },
    getChoices() {
      const B = window.Constants.B;
      if(B[0]===40 || B[1]===40) {
        window.Choices = [
        "Line 1, Line 2, Line 3",
        "Line 2, Line 1, Line 3",
        "Line 2, Line 3, Line 1",
        "Line 1, Line 3, Line 2",
        ];
      } else {
        window.Choices = [
        "Line 1, Line 2, Line 3",
        "Line 3, Line 1, Line 2",
        "Line 3, Line 2, Line 1",
        "Line 2, Line 3, Line 1",
        ];
      }
      
    },
    prompt: `<p>Which choice orders the lines from shortest to longest?</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      if(B[0] === 40 && B[1]===70) {
        return "Line 1, Line 2, Line 3";
      }
      if(B[0] === 40 && B[2]===70) {
        return "Line 1, Line 3, Line 2";
      }
      if(B[1] === 40 && B[0]===70) {
        return "Line 2, Line 1, Line 3";
      }
      if(B[1] === 40 && B[2]===70) {
        return "Line 2, Line 3, Line 1";
      }
      if(B[2] === 40 && B[0]===70) {
        return "Line 3, Line 1, Line 2";
      }
      if(B[2] === 40 && B[1]===70) {
        return "Line 3, Line 2, Line 1";
      }
    },
    reward: function() {
    return {actionId: "Flect2", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "flect2",
    dakek: "flect",
  },
   "flect3": {
    name:"Flect 3",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(17)+3;
      window.Constants.B = utils.getRandomInt(17)+3;
      window.Constants.C = utils.getRandomInt(8)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var contentHTML = `<p>The red line is ${A*C} units long. What is the best estimate for the length of the blue line?</p>`;
      contentHTML += `<svg height="100" width="100">
      <line x1="0" y1="30" x2="${A*5}" y2="30" stroke="red" stroke-width="5"/>
      <line x1="0" y1="70" x2="${B*5}" y2="70" stroke="blue" stroke-width="5"/>
      </svg>`;
      return contentHTML;
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      window.Choices = [
      `${B*(C)}`,
      `${B*(C+A)}`,
      `${B*(C-1)}`,
      `${B+A*(C*2)}`,
      ]
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${C*B}`
    },
    reward: function() {
    return {actionId: "Flect3", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "flect3",
    dakek: "flect",
  },
  "flect4": {
    name:"Flect 4",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = [
        "the surface area of a grain of rice?",
        "the area of the face of a die?",
        "the area of a sheet of paper?",
        "the area of the palm of your hand?",
        "the area of a football field?",
        "the area of someone's backyard?",
        "the area of California?",
        "the area of South Africa?",
      ];
      window.Constants.B = utils.getRandomInt(8);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `Which of the following is the most reasonable unit to measure ${A[B]}`;
    },
    getChoices() {
      window.Choices = [
        `square milimeters`,
        `square centimeters`,
        `square meters`,
        `square kilometers`,
      ]
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      if (B === 0 || B===1) {return `square milimeters`}
      if (B === 2 || B===2) {return `square centimeters`}
      if (B === 4 || B===5) {return `square meters`}
      if (B === 6 || B===7) {return `square kilometers`}
    },
    reward: function() {
    return {actionId: "Flect4", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "flect4",
    dakek: "flect",
  },
  "flect5": {
    name:"Flect 5",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(50)+10;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(55)+1;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `Titus's trip to work takes ${A} minutes. If he needs to be there by ${B}:${C}, what time should he leave his house?`;
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var hr;
      var min;
      if(A>C) {min = 60-A+C; hr = B-1}
      if(C>A) {min = C-A; hr = B}
      
      window.Choices = [
        `${hr}:${min}`,
        `${hr}:${60-A}`,
        `${hr}:${A}`,
        `${hr}:${min+4}`,
      ];
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var hr;
      var min;
      if(A>C) {min = 60-A+C; hr = B-1}
      if(C>A) {min = C-A; hr = B}
      return `${hr}:${min}`
    },
    reward: function() {
    return {actionId: "Flect5", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "flect5",
    dakek: "flect",
  },
  "block1": {
    name:"Block 1",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(50)+10;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(55)+1;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var contentHTML;
      contentHTML =
      `
      <p>What time does this clock display?</p>
      <svg height="102px" width="102px">
          <ellipse cx="51" cy="51" rx="50" fill ="none" stroke="black" stroke-width="2px"/>
          <line x1="51" y1="51" x2="${51+35*Math.cos((B*2*Math.PI)/12-(Math.PI/2)+((A*Math.PI)/(720)))}" y2="${51-35*Math.sin((B*2*Math.PI)/(12)+(Math.PI/2)+((A*Math.PI)/(720)))}" stroke="black" stroke-width="2px"/>
          <line x1="51" y1="51" x2="${51+45*Math.cos(((A*2*Math.PI)/(60))-(Math.PI/2))}" y2="${51-45*Math.sin(((A*2*Math.PI)/(60))+(Math.PI/2))}" stroke="black" stroke-width="1px"/>`
      for(var i=0; i<12; i++) {
        contentHTML += `<line x1="${51+48*Math.cos((i*2*Math.PI)/(12))}" y1="${51-48*Math.sin((i*2*Math.PI)/(12))}" x2="${51+50*Math.cos((i*2*Math.PI)/(12))}" y2="${51-50*Math.sin((i*2*Math.PI)/(12))}"/>`
      }
      contentHTML += `</svg>`
      return contentHTML;
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var hr;
      var min;
      if(A>C) {min = 60-A+C; hr = B-1}
      if(C>A) {min = C-A; hr = B}
      
      window.Choices = [
        `${12-B}:${min}`,
        `${hr}:${60-A}`,
        `${hr}:${A}`,
        `${12-B}:${min+4}`,
      ];
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var hr;
      var min;
      if(A>C) {min = 60-A+C; hr = B-1}
      if(C>A) {min = C-A; hr = B}
      return `${B}:${A}`
    },
    reward: function() {
    return {actionId: "Block1", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "block1",
    dakek: "block",
  },
  "block2": {
    name:"Block 2",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+1;
      window.Constants.B = utils.getRandomInt(10)+1;
      window.Constants.C = utils.getRandomInt(10)+1;
      window.Constants.D = utils.getRandomInt(10)+1;
      window.Constants.E = utils.getRandomInt(30)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      return `Kiara has ${A} quarters, ${B} dimes, ${C} nickels, and ${D} pennies. If she gets ${E} more cents, how much money will she have in total?`;
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      window.Choices = [
        `$${Math.round(100*(A*0.25+B*0.1+C*0.05+D*0.01+E*0.01))/100}`,
        `$${Math.round(100*(D*0.25+A*0.1+B*0.05+C*0.01))/100}`,
        `$${Math.round(100*(C*0.25+D*0.1+A*0.05+B*0.01))/100}`,
        `$${Math.round(100*(A*0.25+B*0.1+C*0.05+D*0.01))/100}`,
      ];
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      return `$${Math.round(100*(A*0.25+B*0.1+C*0.05+D*0.01+E*0.01))/100}`;
    },
    reward: function() {
    return {actionId: "Block2", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "block2",
    dakek: "block",
  },
  "vert1": {
    name:"Vert 1",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(5)+1;
      window.Constants.B = utils.getRandomInt(5)+1;
      window.Constants.C = utils.getRandomInt(5)+1;
      window.Constants.D = utils.getRandomInt(5)+1;
      window.Constants.E = utils.getRandomInt(11)+1;
      window.Constants.G = utils.getRandomInt(4);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = ["fairies", "nixies", "pixies", "trolls"];
      const G = window.Constants.G;
      var contentHTML;
      contentHTML =
      `
      <p>The following graph shows how many of each creature lives in the Fairy Forest. How many ${F[G]} live in the Fairy Forest?</p>
      <svg height="130px" width="202px">
            <line x1="101" y1="100" x2="190" y2="100" stroke="black" />
            <line x1="101" y1="1" x2="101" y2="100" stroke="black" />
            <line x1="115" y1="1" x2="115" y2="100" stroke="black" />
            <line x1="130" y1="1" x2="130" y2="100" stroke="black" />
            <line x1="145" y1="1" x2="145" y2="100" stroke="black"/>
            <line x1="160" y1="1" x2="160" y2="100" stroke="black"/>
            <line x1="175" y1="1" x2="175" y2="100" stroke="black"/>
            <line x1="190" y1="1" x2="190" y2="100" stroke="black"/>
            <rect x="101.5" y="5" height="15px" width="${15*A-1}" fill="red"/>
            <rect x="101.5" y="30" height="15px" width="${15*B-1}" fill="red"/>
            <rect x="101.5" y="55" height="15px" width="${15*C-1}" fill="red"/>
            <rect x="101.5" y="80" height="15px" width="${15*D-1}" fill="red"/>
            </svg>
            <p style="position: absolute; left: 45px; top: 199px;"> Fairies</p>
            <p style="position: absolute; left: 45px; top: 224px;"> Nixies</p>
            <p style="position: absolute; left: 45px; top: 249px;"> Pixies</p>
            <p style="position: absolute; left: 45px; top: 274px;"> Trolls</p>
            <p style="position: absolute; left: 111px; top: 299px;">0</p>
            <p style="position: absolute; left: 153px; top: 299px;"> ${E*3}</p>
            <p style="position: absolute; left: 195px; top: 299px;"> ${E*6}</p>
            `
      return contentHTML;
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const G = window.Constants.G;
      if(G===0) {return `${A*E}`}
      if(G===1) {return `${B*E}`}
      if(G===2) {return `${C*E}`}
      if(G===3) {return `${D*E}`}
    },
    reward: function() {
    return {actionId: "Vert1", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "vert1",
    dakek: "vert",
  },
  "vert2": {
    name:"Vert 2",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(5)+1;
      window.Constants.B = utils.getRandomInt(5)+1;
      window.Constants.C = utils.getRandomInt(5)+1;
      window.Constants.D = utils.getRandomInt(5)+1;
      window.Constants.E = utils.getRandomInt(11)+1;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      var contentHTML;
      contentHTML =
      `
      <p>The following graph shows how many thousands of dollars of goods Blackbeard stole from a royal vessel. What is the total value of goods stolen in thousands of dollars?</p>
      <svg height="130px" width="202px">
            <line x1="101" y1="100" x2="190" y2="100" stroke="black" />
            <line x1="101" y1="1" x2="101" y2="100" stroke="black" />
            <line x1="115" y1="1" x2="115" y2="100" stroke="black" />
            <line x1="130" y1="1" x2="130" y2="100" stroke="black" />
            <line x1="145" y1="1" x2="145" y2="100" stroke="black"/>
            <line x1="160" y1="1" x2="160" y2="100" stroke="black"/>
            <line x1="175" y1="1" x2="175" y2="100" stroke="black"/>
            <line x1="190" y1="1" x2="190" y2="100" stroke="black"/>
            <rect x="101.5" y="5" height="15px" width="${15*A-1}" fill="red"/>
            <rect x="101.5" y="30" height="15px" width="${15*B-1}" fill="red"/>
            <rect x="101.5" y="55" height="15px" width="${15*C-1}" fill="red"/>
            <rect x="101.5" y="80" height="15px" width="${15*D-1}" fill="red"/>
            </svg>
            <p style="position: absolute; left: 35px; top: 240px;"> Gold</p>
            <p style="position: absolute; left: 35px; top: 265px;"> Weapons</p>
            <p style="position: absolute; left: 35px; top: 290px;"> Spices</p>
            <p style="position: absolute; left: 35px; top: 315px;"> Cotton</p>
            <p style="position: absolute; left: 111px; top: 340px;">0</p>
            <p style="position: absolute; left: 153px; top: 340px;"> ${E*3}</p>
            <p style="position: absolute; left: 195px; top: 340px;"> ${E*6}</p>
            `
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      return `${(A+B+C+D)*E}`
      
    },
    reward: function() {
    return {actionId: "Vert2", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "vert2",
    dakek: "vert",
  },
  "vert3": {
    name:"Vert 3",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(5)+1;
      window.Constants.B = utils.getRandomInt(5)+1;
      window.Constants.C = utils.getRandomInt(5)+1;
      window.Constants.D = utils.getRandomInt(5)+1;
      window.Constants.E = utils.getRandomInt(11)+1;
      window.Constants.G = utils.getRandomInt(10)+2;
      window.Constants.H = utils.getRandomInt(2);
      window.Constants.I = utils.getRandomInt(2)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = ["creepers", "skeletons", "zombies", "spiders"];
      const G = window.Constants.G;
      const H = window.Constants.H;
      const I = window.Constants.I;
      var contentHTML;
      contentHTML =
      `
      <p>The following graph shows how many of each creature are in a dark cave. If ${G} more ${F[H]} enter the cave, what will be the combined number of ${F[H]} and ${F[I]}?</p>
      <svg height="130px" width="202px">
            <line x1="101" y1="100" x2="190" y2="100" stroke="black" />
            <line x1="101" y1="1" x2="101" y2="100" stroke="black" />
            <line x1="115" y1="1" x2="115" y2="100" stroke="black" />
            <line x1="130" y1="1" x2="130" y2="100" stroke="black" />
            <line x1="145" y1="1" x2="145" y2="100" stroke="black"/>
            <line x1="160" y1="1" x2="160" y2="100" stroke="black"/>
            <line x1="175" y1="1" x2="175" y2="100" stroke="black"/>
            <line x1="190" y1="1" x2="190" y2="100" stroke="black"/>
            <rect x="101.5" y="5" height="15px" width="${15*A-1}" fill="red"/>
            <rect x="101.5" y="30" height="15px" width="${15*B-1}" fill="red"/>
            <rect x="101.5" y="55" height="15px" width="${15*C-1}" fill="red"/>
            <rect x="101.5" y="80" height="15px" width="${15*D-1}" fill="red"/>
            <text x="8" y="17"> Creepers</text>
            <text x="8" y="42"> Skeletons</text>
            <text x="8" y="67"> Zombies</text>
            <text x="8" y="92"> Spiders</text>
            <text x="95" y="115">0</text>
            <text x="138" y="115"> ${E*3}</text>
            <text x="182" y="115"> ${E*6}</text>
            </svg>
            `
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const G = window.Constants.G;
      const H = window.Constants.H;
      const I = window.Constants.I;
      if(H===0 && I===2) {return `${A*E+C*E+G}`}
      if(H===1 && I===2) {return `${B*E+C*E+G}`}
      if(H===0 && I===3) {return `${A*E+D*E+G}`}
      if(H===1 && I===3) {return `${B*E+D*E+G}`}
    },
    reward: function() {
    return {actionId: "Vert3", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "vert3",
    dakek: "vert",
  },
  "vert4": {
    name:"Vert 4",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(4);
      window.Constants.C = ["microwave oven", "tiger", "car", "space shuttle",];
    },
    content: function() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      return `What is the most reasonable estimate for the mass of a ${C[A]}?`
    },
    prompt: ``,
    getChoices() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      window.Choices = [
        `15 kilograms`,
        `150 kilograms`,
        `1,500 kilograms`,
        `150,000 kilograms`,
      ];
    },
    getSolution: function() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      if(A===0) {return `15 kilograms`}
      if(A===1) {return `150 kilograms`}
      if(A===2) {return `1,500 kilograms`}
      if(A===3) {return `150,000 kilograms`}
    },
    reward: function() {
    return {actionId: "Vert4", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "vert4",
    dakek: "vert",
  },
  "vert5": {
    name:"Vert 5",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(9)+1;
      window.Constants.B = utils.getRandomInt(5)+1;
      window.Constants.C = utils.getRandomInt(3)+1;
      window.Constants.E = utils.getRandomInt(9)+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const E = window.Constants.E;
      var contentHTML;
      contentHTML =
      `
      <p>The line plot shows the number of pounds of donuts stolen by six different donut stealers. How many pounds were stolen in total? Write your answer as a decimal.</p>
      <svg height="102px" width="207px">
            <line x1="3" y1="50" x2="202" y2="50" stroke="black" stroke-width="2"/>
            <line x1="3" y1="45" x2="3" y2="55" stroke="black" stroke-width="2"/>
            <line x1="203" y1="45" x2="203" y2="55" stroke="black" stroke-width="2"/>
            <circle cx="${A*10+3}" cy="40" r="4" fill="blue"/>
            <circle cx="${A*10+3}" cy="30" r="4" fill="blue"/>
            <circle cx="${A*10+3}" cy="20" r="4" fill="blue"/>
            <circle cx="${(B+A)*10+3}" cy="30" r="4" fill="blue"/>
            <circle cx="${(A+B)*10+3}" cy="40" r="4" fill="blue"/>
            <circle cx="${(A+B+C)*10+3}" cy="40" r="4" fill="blue"/>
            `
      for(var i = 1; i<20; i++) {
        contentHTML += `
        <line x1="${10*i+3}" y1="45" x2="${10*i+3}" y2="50" stroke="black" stroke-width="1"/>
        `
      }
      for(var i = 1; i<5; i++) {
        contentHTML += `
        <line x1="${50*i+3}" y1="45" x2="${50*i+3}" y2="55" stroke="black" stroke-width="1"/>
        `
      }
      for(var i = 0; i<4; i++) {
        contentHTML += `
        <text x="${i*50}" y="75">${i*E}</text>
        `
      }
      contentHTML += `</svg>`
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const E = window.Constants.E;
      return `${((E/5)*(A+B+C)) + ((E/5)*(A+B)*2) + ((E/5)*A*3)}`;
    },
    reward: function() {
    return {actionId: "Vert5", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "vert5",
    dakek: "vert",
  },
  "fract1": {
    name:"Fract 1",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(4);
      window.Constants.C = ["45", "90", "135", "180",];
    },
    content: function() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      return `A certain angle is ${C[A]} degrees. What sort of angle is it?`
    },
    prompt: ``,
    getChoices() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      window.Choices = [
        `Acute Angle`,
        `Right Angle`,
        `Obtuse Angle`,
        `Straight Angle`,
      ];
    },
    getSolution: function() {
      const A = window.Constants.A;
      const C = window.Constants.C;
      if(A===0) {return `Acute Angle`}
      if(A===1) {return `Right Angle`}
      if(A===2) {return `Obtuse Angle`}
      if(A===3) {return `Straight Angle`}
    },
    reward: function() {
    return {actionId: "Fract1", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "fract1",
    dakek: "fract",
  },
  "fract2": {
    name:"Fract 2",
    inputType: "2choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+200;
      window.Constants.B = utils.getRandomInt(10)+200;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `Lightning McQueen and Francesco Bernoulli finished their race. Lightning's average speed during the race was ${A} miles per hour, while Francesco's average speed was ${Math.round(B/0.621)} kilometers per hour. Which racer had the highest average speed?`
    },
    prompt: ``,
    getChoices() {
      window.Choices = [
        `Lightning McQueen`,
        `Francesco Bernoulli`,
      ];
    },
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      if(A>B) {return `Lightning McQueen`;}
      if(A<B) {return `Francesco Bernoulli`;}
    },
    reward: function() {
    return {actionId: "Fract2", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "fract2",
    dakek: "fract",
  },
  "fract3": {
    name:"Fract 3",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = (utils.getRandomInt(30)+70)/10;
      window.Constants.B = utils.getRandomInt(100)+150;
      window.Constants.C = utils.getRandomInt(20)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `An MTT can carry ${A} imperial tons of battle droids. Each battle droid weighs ${B} pounds. If there are ${C} battle droids already on the MTT, how many more can the MTT carry? Make sure your answer is a whole number that does not exceed the carrying limit.`
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${Math.floor(((A*2240)-(C*B)) / (B))}`;
    },
    reward: function() {
    return {actionId: "Fract3", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "fract3",
    dakek: "fract",
  },
  "guard1": {
    name:"Guard 1",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(20000)+200;
      window.Constants.B = utils.getRandomInt(Math.round(window.Constants.A/30))+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `A sample of ${A} students were asked whether they prefer chocolate or vanilla ice cream. Which is a reasonable estimate for the number of students that chose vanilla?`
    },
    prompt: ``,
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      window.Choices = [
        `${Math.round(A/2 + B)}`,
        `${Math.round((A*2)/3 - B)}`,
        `${Math.round(A/3 + B)}`,
        `${Math.round((A*3)/4 - B)}`,
      ];
      
    },
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return `${Math.round(A/2 + B)}`;
    },
    reward: function() {
    return {actionId: "Guard1", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "guard1",
    dakek: "guard",
  },
  "guard2": {
    name:"Guard 2",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(20)+10;
      window.Constants.B = utils.getRandomInt(20)+10;
      window.Constants.C = utils.getRandomInt(20)+10;
      window.Constants.D = utils.getRandomInt(20)+10;
      window.Constants.E = utils.getRandomInt(20)+10;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      var contentHTML;
      contentHTML =
      `
      <p>The chart shows the number of goals Cassius scored in five Quidditch games. What is the average number of goals Cassius scored in a game? Round your answer to the nearest whole number.</p>
      <svg height="50px" width="402px">
            <rect x="10" width="60" height="30" fill="none" stroke="black"/>
            <rect x="70" width="60" height="30" fill="none" stroke="black"/>
            <rect x="130" width="60" height="30" fill="none" stroke="black"/>
            <rect x="190" width="60" height="30" fill="none" stroke="black"/>
            <rect x="250" width="60" height="30" fill="none" stroke="black"/>
            <text x="35" y="20" >${A}</text>
            <text x="95" y="20" >${B}</text>
            <text x="155" y="20" >${C}</text>
            <text x="215" y="20" >${D}</text>
            <text x="275" y="20" >${E}</text>
        </svg>`;
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      return `${Math.round((A+B+C+D+E)/5)}`;
    },
    reward: function() {
    return {actionId: "Guard2", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "guard2",
    dakek: "guard",
  },
  "guard3": {
    name:"Guard 3",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(20)+10;
      window.Constants.B = utils.getRandomInt(50)+10;
      window.Constants.C = utils.getRandomInt(50)+10;
      window.Constants.D = utils.getRandomInt(20)+10;
      window.Constants.E = utils.getRandomInt(15);
      window.Constants.F = utils.getRandomInt(15);
      window.Constants.G = utils.getRandomInt(4);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      var contentHTML;
      contentHTML = `<p>Samples of men and women were interviewed about their favorite kind of movie. According to the table, `;
      if(G === 0) {contentHTML += `what percentage of the sample were men? Round your answer to the nearest </p>`;}
      if(G === 1) {contentHTML += `what percentage of the sample were women?</p>`;}
      if(G === 2) {contentHTML += `what percentage of the sample did NOT prefer action movies?</p>`;}
      if(G === 3) {contentHTML += `what percentage of the sample preferred romance movies?</p>`;}
      contentHTML +=
      `<svg height="130px" width="402px">
            <rect x="80" y="30" width="60" height="30" fill="none" stroke="black"/>
            <rect x="140" y="30" width="60" height="30" fill="none" stroke="black"/>
            <rect x="80" y="60" width="60" height="30" fill="none" stroke="black"/>
            <rect x="140" y="60" width="60" height="30" fill="none" stroke="black"/>
            <rect x="80" y="90" width="60" height="30" fill="none" stroke="black"/>
            <rect x="140" y="90" width="60" height="30" fill="none" stroke="black"/>
            <text x="105" y="50" >${A}</text>
            <text x="165" y="50" >${B}</text>
            <text x="105" y="80" >${C}</text>
            <text x="165" y="80" >${D}</text>
            <text x="105" y="110" >${E}</text>
            <text x="165" y="110" >${F}</text>
            <text x="155" y="20" >Men</text>
            <text x="85" y="20" >Women</text>
            <text x="14" y="50" >Action</text>
            <text x="1" y="80" >Romance</text>
            <text x="13" y="110" >Other</text>
        </svg>`;
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      if(G===0) {return `${(B+D+F)/(A+B+C+D+E+F)}`;}
      if(G===1) {return `${(A+C+E)/(A+B+C+D+E+F)}`;}
      if(G===2) {return `${(C+D+E+F)/(A+B+C+D+E+F)}`;}
      if(G===3) {return `${(C+D)/(A+B+C+D+E+F)}`;}
    },
    reward: function() {
    return {actionId: "Guard3", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "guard3",
    dakek: "guard",
  },
  "guard4": {
    name:"Guard 4",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(4)+1;
      window.Constants.B = utils.getRandomInt(4)+1;
      window.Constants.C = utils.getRandomInt(4)+1;
      window.Constants.D = utils.getRandomInt(3)+1;
      window.Constants.E = utils.getRandomInt(9)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      var contentHTML;
      contentHTML =
      `
      <p>The line plot shows the hours of combat training logged by a sample of Hunger Games tributes. What is the percentile rank of a tribute who logged ${D*E} hours of combat training? Enter your answer as a number between 0 and 1 rounded to the nearest hundredth.</p>
      <svg height="102px" width="207px">
            <line x1="3" y1="50" x2="202" y2="50" stroke="black" stroke-width="2"/>
            <line x1="3" y1="45" x2="3" y2="55" stroke="black" stroke-width="2"/>
            <line x1="203" y1="45" x2="203" y2="55" stroke="black" stroke-width="2"/>
            <circle cx="4" cy="40" r="4" fill="blue"/>
            <circle cx="203" cy="40" r="4" fill="blue"/>
            `
      for(var i = 0; i<A; i++) {
        contentHTML += `
        <circle cx="53" cy="${40-10*i}" r="4" fill="blue"/>
        `
      }
      for(var i = 0; i<B; i++) {
        contentHTML += `
        <circle cx="103" cy="${40-10*i}" r="4" fill="blue"/>
        `
      }
      for(var i = 0; i<C; i++) {
        contentHTML += `
        <circle cx="153" cy="${40-10*i}" r="4" fill="blue"/>
        `
      }
      for(var i = 1; i<5; i++) {
        contentHTML += `
        <line x1="${50*i+3}" y1="45" x2="${50*i+3}" y2="55" stroke="black" stroke-width="1"/>
        `
      }
      for(var i = 0; i<4; i++) {
        contentHTML += `
        <text x="${i*50}" y="75">${i*E}</text>
        `
      }
      contentHTML += `</svg>`
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      if(D===1) {return `${Math.round(100*(1/(A+B+C+2)))/100}`}
      if(D===2) {return `${Math.round(100*((1+A)/(A+B+C+2)))/100}`}
      if(D===3) {return `${Math.round(100*((1+A+B)/(A+B+C+2)))/100}`}
    },
    reward: function() {
    return {actionId: "Guard4", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "guard4",
    dakek: "guard",
  },
  "sheild1": {
    name:"Sheild 1",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(20)+10;
      window.Constants.B = utils.getRandomInt(50)+10;
      window.Constants.C = utils.getRandomInt(50)+10;
      window.Constants.D = utils.getRandomInt(20)+10;
      window.Constants.E = utils.getRandomInt(15);
      window.Constants.F = utils.getRandomInt(15);
      window.Constants.G = utils.getRandomInt(4);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      var contentHTML;
      contentHTML = `<p>Samples of men and women were interviewed about their favorite kind of movie. According to the table, `;
      if(G === 0) {contentHTML += `what is the experimental probability that a person preferred action movies given that they were a man? Round your answer to the nearest hundredth.</p>`;}
      if(G === 1) {contentHTML += `what is the experimental probability that a person preferred romance movies given that they were a man? Round your answer to the nearest hundredth.</p>`;}
      if(G === 2) {contentHTML += `what is the experimental probability that a person preferred action movies given that they were a woman? Round your answer to the nearest hundredth.</p>`;}
      if(G === 3) {contentHTML += `what is the experimental probability that a person preferred romance movies given that they were a woman? Round your answer to the nearest hundredth.</p>`;}
      contentHTML +=
      `<svg height="130px" width="402px">
            <rect x="80" y="30" width="60" height="30" fill="none" stroke="black"/>
            <rect x="140" y="30" width="60" height="30" fill="none" stroke="black"/>
            <rect x="80" y="60" width="60" height="30" fill="none" stroke="black"/>
            <rect x="140" y="60" width="60" height="30" fill="none" stroke="black"/>
            <rect x="80" y="90" width="60" height="30" fill="none" stroke="black"/>
            <rect x="140" y="90" width="60" height="30" fill="none" stroke="black"/>
            <text x="105" y="50" >${A}</text>
            <text x="165" y="50" >${B}</text>
            <text x="105" y="80" >${C}</text>
            <text x="165" y="80" >${D}</text>
            <text x="105" y="110" >${E}</text>
            <text x="165" y="110" >${F}</text>
            <text x="155" y="20" >Men</text>
            <text x="85" y="20" >Women</text>
            <text x="14" y="50" >Action</text>
            <text x="1" y="80" >Romance</text>
            <text x="13" y="110" >Other</text>
        </svg>`;
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      if(G===0) {return `${(B)/(B+D+F)}`;}
      if(G===1) {return `${(D)/(B+D+F)}`;}
      if(G===2) {return `${(A)/(A+C+E)}`;}
      if(G===3) {return `${(C)/(A+C+E)}`;}
    },
    reward: function() {
    return {actionId: "Sheild1", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "sheild1",
    dakek: "sheild",
  },
  "sheild2": {
    name:"Sheild 2",
    inputType: "text",
    
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(4)+3;
      window.Constants.B = utils.getRandomInt(window.Constants.A-1)+1;
      window.Constants.C = utils.getRandomInt(9)+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      var contentHTML;
      contentHTML = `<p>An evil robot is trying to guess a ${A} digit numerical password. What is the probability that the robot will guess correctly within its first ${C*Math.pow(10, B)} attempts? Since the robot isn't very smart, assume the guesses are random and will not be ruled out if incorrect. Round your answer to the nearest hundredth.</p>`;
      return contentHTML;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${C*Math.pow(10, B)/Math.pow(10, A)}`
      
    },
    reward: function() {
    return {actionId: "Sheild2", dakek: "G", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "sheild2",
    dakek: "sheild",
  },
  
  //Calculus
  "maim1": {
    name:"Maim 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(6)+1;
      window.Constants.B = utils.getRandomInt(10)+3;
      window.Constants.C = utils.getRandomInt(10)+3;
      
    },
    content: function() {
      const num = `${window.Constants.B}${utils.drawVariable("x")} - ${window.Constants.B*window.Constants.A}`
      const den = `${window.Constants.C}${utils.drawVariable("x")} - ${window.Constants.C*window.Constants.A}`
      return `${utils.drawLimit("x", window.Constants.A)} ${utils.drawFraction(num, den)}`;
    },
    prompt: `<p>Find the following limit. Round your answer to the nearest hundredth.</p>`,
    getSolution: function() {
      return `${Math.round(100*window.Constants.B/window.Constants.C)/100}`;
    },
    reward: function() {
    return {actionId: "Maim1", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 15,
    prop: "maim1",
    dakek: "maim",
  },
  "maim2": {
    name:"Maim 2",
    inputType: "2choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(6)+1;
      window.Constants.B = utils.getRandomInt(10)+3;
      window.Constants.C = utils.getRandomInt(10)+3;
      window.Constants.E = utils.getRandomInt(10)+3;
      window.Constants.F = utils.getRandomInt(10)+3;
      window.Constants.G = utils.getRandomInt(5)+2;
      window.Constants.D = window.Constants.F*window.Constants.G
      window.Constants.H = utils.getRandomInt(2);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      const D = window.Constants.D;
      const H = window.Constants.H;
      if(H===0) {return `<p>Is the following function continuous at ${utils.drawVariable("x")} = ${D}?</p><math><mi>f</mi><mfenced><mi>x</mi></mfenced><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mfenced open="{" close=""><mtable columnspacing="1.4ex" columnalign="left"><mtr><mtd><mn>${A}</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>${B}</mn><mi>x</mi><mo>+</mo><mn>${C}</mn></mtd><mtd><mi>x</mi><mo>&#xA0;</mo><mo>&lt;</mo><mo>&#xA0;</mo><mn>${D}</mn></mtd></mtr><mtr><mtd><mfrac><mrow><mn>${E}</mn><mi>x</mi></mrow><mn>${F}</mn></mfrac><mo>+</mo><mn>${A*D*D + (B-(E/F))*D +C+1}</mn></mtd><mtd><mi>x</mi><mo>&#xA0;</mo><mo>&#x2265;</mo><mo>&#xA0;</mo><mn>${D}</mn></mtd></mtr></mtable></mfenced></math>`}
      if(H===1) {
        return `<p>Is the following function continuous at ${utils.drawVariable("x")} = ${D}?</p><math><mi>f</mi><mfenced><mi>x</mi></mfenced><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mfenced open="{" close=""><mtable columnspacing="1.4ex" columnalign="left"><mtr><mtd><mn>${A}</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>${B}</mn><mi>x</mi><mo>+</mo><mn>${C}</mn></mtd><mtd><mi>x</mi><mo>&#xA0;</mo><mo>&lt;</mo><mo>&#xA0;</mo><mn>${D}</mn></mtd></mtr><mtr><mtd><mfrac><mrow><mn>${E}</mn><mi>x</mi></mrow><mn>${F}</mn></mfrac><mo>+</mo><mn>${A*D*D + (B-(E/F))*D +C}</mn></mtd><mtd><mi>x</mi><mo>&#xA0;</mo><mo>&#x2265;</mo><mo>&#xA0;</mo><mn>${D}</mn></mtd></mtr></mtable></mfenced></math>`
      }
    },
    prompt: ``,
    getChoices() {
      window.Choices = [
        `Yes`,
        `No`,
      ];
    },
    getSolution: function() {
      const H = window.Constants.H;
      if(H===0) {return `No`}
      if(H===1) {return `Yes`}
    },
    reward: function() {
    return {actionId: "Maim2", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 15,
    prop: "maim2",
    dakek: "maim",
  },
  "maim3": {
    name:"Maim 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+1;
      window.Constants.B = utils.getRandomInt(6)+3;
      window.Constants.C = utils.getRandomInt(10)+1;
      window.Constants.D = utils.getRandomInt(10)+1;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      
      var contentHTML = `<p>Find the following limit. If necessary, round to the nearest hundredth.</p><math><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo><mo>&#x221E;</mo></mrow></munder><mo>&#xA0;</mo><mo>&#xA0;</mo><mfrac><mrow><mn>${A}</mn><msup><mi>x</mi><mn>${B}</mn></msup></mrow><msqrt><mn>${C*C}</mn><msup><mi>x</mi><mn>${2*B}</mn></msup><mo>+</mo><mn>${D}</mn><msup><mi>x</mi><mn>${2*B-1}</mn></msup></msqrt></mfrac></math>`;
      return contentHTML;
      
    },
    prompt: ``,
    getSolution: function() {
      return `${Math.round(100*(window.Constants.A/window.Constants.C))/100}`;
    },
    reward: function() {
    return {actionId: "Maim3", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 35,
    prop: "maim3",
    dakek: "maim",
  },
  "gore1": {
    name:"Gore 1",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = [0,1,2,3,4,5];
      utils.shuffleArray(window.Constants.B)
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B[0];
      
      var contentHTML = `<p>Find the derivative of the following function.</p>`;
      contentHTML += window.calcFunctions[B]("x", A);
      return contentHTML;
      
    },
    prompt: ``,
    getChoices() {

      const A = window.Constants.A;
      const B = window.Constants.B[0];
      window.Choices = [
      
        calcDerivatives[B]("x", A),
        calcDerivatives[window.Constants.B[1]]("x", A),
        calcDerivatives[window.Constants.B[2]]("x", A),
        calcDerivatives[window.Constants.B[3]]("x", A),
        
      ];
      if(B===0) {
        window.Choices = [
      
          calcDerivatives[B]("x", A),
          `<math><msup><mi>e</mi><mi>2x</mi></msup></math>`,
          `<math><msup><mi>e</mi><msup><mi>x</mi><mn>2</mn></msup></msup></math>`,
          calcFunctions[1]("x", A),
        
        ];
      }
      if(B===1) {
        window.Choices = [
      
          calcDerivatives[B]("x", A),
          `<math><mfrac><mn>1</mn><msup><mi>x</mi><mn>2</mn></msup></mfrac></math>`,
          `<math><mfrac><mn>1</mn><mi>e</mi></mfrac></math>`,
          `<math><msup><mi>e</mi><mi>x</mi></msup></math>`,
        
        ];
      }
      if(B===2 || B===3) {
        window.Choices = [
          calcDerivatives[B]("x", A),
          `<math><mi>sin</mi><mfenced><mi>x</mi></mfenced></math>`,
          `<math><mi>tan</mi><mfenced><mi>x</mi></mfenced></math>`,
          `<math><mi>-cos</mi><mfenced><mi>x</mi></mfenced></math>`,
        ];
      }
      if(B===4) {
        window.Choices = [
          `<math><mfrac><mn>1</mn><mrow><msup><mi>cos</mi><mn>2</mn></msup><mfenced><mi>x</mi></mfenced></mrow></mfrac></math>`,
          `<math><mfrac><mn>1</mn><mrow><msup><mi>sin</mi><mn>2</mn></msup><mfenced><mi>x</mi></mfenced></mrow></mfrac></math>`,
          `<math><mfrac><mn>-1</mn><mrow><msup><mi>cos</mi><mn>2</mn></msup><mfenced><mi>x</mi></mfenced></mrow></mfrac></math>`,
          `<math><mfrac><mn>-1</mn><mrow><msup><mi>sin</mi><mn>2</mn></msup><mfenced><mi>x</mi></mfenced></mrow></mfrac></math>`,
        ];
      }
      if(B===5) {
        window.Choices = [
          calcDerivatives[B]("x", A),
          `<math><mi>${A-1}</mi><msup><mi>x</mi><mi>${A-1}</mi></msup></math>`,
          `<math><mi>${A-1}</mi><msup><mi>x</mi><mi>${A}</mi></msup></math>`,
          `<math><mi>${A}</mi><msup><mi>x</mi><mi>${A}</mi></msup></math>`,
          
        ];
      }
    },
    getSolution: function() {
      const A = window.Constants.A;
      return calcDerivatives[window.Constants.B[0]]("x", A);
    },
    reward: function() {
    return {actionId: "Gore1", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 35,
    prop: "gore1",
    dakek: "gore",
  },
  "gore2": {
    name:"Gore 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = [0,1,2,3,4,5];
      window.Constants.C = utils.getRandomInt(15)+2;
      utils.shuffleArray(window.Constants.B)
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B[0];
      const D = window.Constants.B[1];
      
      const C = window.Constants.C;
      
      
      var contentHTML = `<p>The functions ${utils.drawVariable("f")}, ${utils.drawVariable("g")} and ${utils.drawVariable("h")} are defined as follows,</p> <math><mi>f</mi><mfenced><mi>x</mi></mfenced><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo></math>${window.calcFunctions[B]("x", A)}<br><math><mi>g</mi><mfenced><mi>x</mi></mfenced><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo></math>${window.calcFunctions[D]("x", A)}<br><math><mi>h</mi><mfenced><mi>x</mi></mfenced><mo>=</mo><mfenced><mrow><mi>f</mi><mfenced><mi>x</mi></mfenced></mrow></mfenced><mfenced><mrow><mi>g</mi><mfenced><mi>x</mi></mfenced></mrow></mfenced></math><p>Evaluate the derivative of ${utils.drawVariable("h")} the following function at ${utils.drawVariable("x")} = ${C}. Calculate any trigonometric functions using radians and round your answer to the nearest hundredth.</p>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B[0];
      const D = window.Constants.B[1];
      const C = window.Constants.C;
      
      const FofX = window.calcFunctionEvals[B](C, A);
      const GofX = window.calcFunctionEvals[D](C, A);
      const FPofX = window.calcDerivativeEvals[B](C, A);
      const GPofX = window.calcDerivativeEvals[D](C, A);
      return `${Math.round(100*(FofX*GPofX + FPofX*GofX))/100}`;
    },
    reward: function() {
    return {actionId: "Gore2", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 45,
    prop: "gore2",
    dakek: "gore",
  },
  "gore3": {
    name:"Gore 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = [0,1,2,3,4,5];
      window.Constants.C = utils.getRandomInt(15)+2;
      utils.shuffleArray(window.Constants.B)
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B[0];
      const D = window.Constants.B[1];
      
      const C = window.Constants.C;
      
      
      var contentHTML = `<p>The functions ${utils.drawVariable("f")}, ${utils.drawVariable("g")} and ${utils.drawVariable("h")} are defined as follows,</p> <math><mi>f</mi><mfenced><mi>x</mi></mfenced><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo></math>${window.calcFunctions[B]("x", A)}<br><math><mi>g</mi><mfenced><mi>x</mi></mfenced><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo></math>${window.calcFunctions[D]("x", A)}<br><math><mi>h</mi><mfenced><mi>x</mi></mfenced><mo>=</mo><mi>g</mi><mfenced><mrow><mi>f</mi><mfenced><mi>x</mi></mfenced></mrow></mfenced></math><p>Evaluate the derivative of ${utils.drawVariable("h")} the following function at ${utils.drawVariable("x")} = ${C}. Calculate any trigonometric functions using radians and round your answer to the nearest hundredth.</p>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B[0];
      const D = window.Constants.B[1];
      const C = window.Constants.C;
      
      const FofX = window.calcFunctionEvals[B](C, A);
      const FPofX = window.calcDerivativeEvals[B](C, A);
      const GPofFofX = window.calcDerivativeEvals[D](FofX, A)
      
      return `${Math.round(100*(GPofFofX*FPofX))/100}`;
    },
    reward: function() {
    return {actionId: "Gore3", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 45,
    prop: "gore3",
    dakek: "gore",
  },
  "gore4": {
    name:"Gore 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(10)+2;
      window.Constants.B = utils.getRandomInt(10)+2;
      window.Constants.C = utils.getRandomInt(15)+2;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      
      
      var contentHTML = `<p>The following equation is a hyperbola. What is the slope of the hyperbola above the x-axis at ${utils.drawVariable("x")} = ${C}?</p> <math><mfrac><msup><mi>x</mi><mn>2</mn></msup><mn>${A}</mn></mfrac><mo>-</mo><mfrac><msup><mi>y</mi><mn>2</mn></msup><mn>${B}</mn></mfrac><mo>=</mo><mn>1</mn></math>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      
      const HofC = Math.sqrt(((B*C*C)/(A)) - (B));
      
      return `${Math.round(100*(     (B*C) / (A*HofC)      ))/100}`;
    },
    reward: function() {
    return {actionId: "Gore4", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 45,
    prop: "gore4",
    dakek: "gore",
  },
  "gore5": {
    name:"Gore 5",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = (utils.getRandomInt(7)+2)/10;
      window.Constants.B = (utils.getRandomInt(7)+2)/10;
      window.Constants.C = utils.getRandomInt(50)+50;
      window.Constants.D = utils.getRandomInt(30)+10;
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const trackD = Math.sqrt(B*B + A*A)
      
      
      var contentHTML = `<p>At a particular instant, Lightning McQueen is driving toward a train crossing at ${C} miles per hour. A train is also moving perpendicular to McQueen toward the train crossing at ${D} miles per hour. If McQueen is ${A} miles from the crossing, and the train is ${B} miles from the crossing, how fast is the distance between McQueen and the track decreasing at this instant? Type your answer as a positive number rounded to the nearest hundredth in miles per hour.</p>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const trackD = Math.sqrt(B*B + A*A)
      
      return `${Math.round(100*(     (1/(trackD))*(C*A + B*D)      ))/100}`;
    },
    reward: function() {
    return {actionId: "Gore5", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 65,
    prop: "gore5",
    dakek: "gore",
  },
  "gore6": {
    name:"Gore 6",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = (utils.getRandomInt(900)+100);
    },
    content: function() {
      const A = window.Constants.A;
      
      
      var contentHTML = `<p>A potion factory sells cylindrical cans that each contain ${A} mililiters of potion. What is the radius of the can with the least possible surface area? Express your answer in milimeters rounded to the nearest hundredth.</p>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      return `${Math.round(100*(     Math.pow((1000*A)/(2*Math.PI), 1/3)      ))/100}`;
    },
    reward: function() {
    return {actionId: "Gore6", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 65,
    prop: "gore6",
    dakek: "gore",
  },
  "scald1": {
    name:"Scald 1",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(3);
      window.Constants.B = utils.getRandomInt(3)+3;
      window.Constants.C = utils.getRandomInt(5)+2;
      window.Constants.D = utils.getRandomInt(5)+1;
      window.Constants.E = utils.getRandomInt(5)+2;
      window.Constants.F = utils.getRandomInt(5)+1;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      
      
      var contentHTML = `<p>Evaluate the following definite integral. round your answer to the nearest hundredth.</p><math><msubsup><mo>&#x222B;</mo><mn>${A}</mn><mn>${B}</mn></msubsup><mn>${C}</mn><msup><mi>x</mi><mn>${D}</mn></msup><mo>-</mo><mn>${E}</mn><msup><mi>x</mi><mn>${F}</mn></msup><mi>d</mi><mi>x</mi></math>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      
      first = (C*Math.pow(B, D+1))/(D+1) - (E*Math.pow(B, F+1))/(F+1)
      second = (C*Math.pow(A, D+1))/(D+1) - (E*Math.pow(A, F+1))/(F+1)
      
      return `${Math.round(100*(     first-second      ))/100}`;
    },
    reward: function() {
    return {actionId: "Scald1", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 65,
    prop: "scald1",
    dakek: "scald",
  },
  "scald2": {
    name:"Scald 2",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(3)+2;
      window.Constants.B = utils.getRandomInt(3)+2;
      window.Constants.C = utils.getRandomInt(3)+2;
      window.Constants.D = utils.getRandomInt(5);
      window.Constants.E = utils.getRandomInt(5)+5;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      
      var contentHTML = `<p>Evaluate the following definite integral. Use radians when calculating trig functions, and round your answer to the nearest hundredth.</p><math><msubsup><mo>&#x222B;</mo><mn>${D}</mn><mn>${E}</mn></msubsup><mn>${A}</mn><msup><mi>x</mi><mn>${B}</mn></msup><mi>sin</mi><mfenced><mrow><mn>${C}</mn><msup><mi>x</mi><mn>${B+1}</mn></msup></mrow></mfenced><mi>d</mi><mi>x</mi></math>`;
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      const gary = -(A)/(C*(B+1))
      const first = Math.cos(C*Math.pow(E, B+1))
      const second = Math.cos(C*Math.pow(D, B+1))
      
      return `${Math.round(100*(     gary*(first-second)      ))/100}`;
    },
    reward: function() {
    return {actionId: "Scald2", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 65,
    prop: "scald2",
    dakek: "scald",
  },
  "scald3": {
    name:"Scald 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(5);
      window.Constants.B = utils.getRandomInt(5)+5;
      window.Constants.C = utils.getRandomInt(3)+2;
      window.Constants.D = utils.getRandomInt(5)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      
      
      var contentHTML = `<p>Evaluate the following definite integral. Use radians when calculating trig functions, and round your answer to the nearest hundredth.</p><math><msubsup><mo>&#x222B;</mo><mn>${A}</mn><mn>${B}</mn></msubsup><mn>${C}</mn><mi>x</mi><mi>sin</mi><mfenced><mrow><mn>${D}</mn><mi>x</mi></mrow></mfenced><mi>d</mi><mi>x</mi></math>`;
      
      
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      
      const gary = C/D
      const first = ((Math.sin(D*B)/D) - (B*Math.cos(D*B)))
      const second = ((Math.sin(D*A)/D) - (A*Math.cos(D*A)))
      
      return `${Math.round(100*(     gary*(first-second)      ))/100}`;
    },
    reward: function() {
    return {actionId: "Scald3", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 65,
    prop: "scald3",
    dakek: "scald",
  },
  "scald4": {
    name:"Scald 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(5)+1;
      window.Constants.B = utils.getRandomInt(9)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      
      
      var contentHTML = `<p>A rocket is being launched. The rocket's vertical acceleration can be modeled by the following function where ${utils.drawVariable("t")} is time in seconds after the launch. </p>
      <math><mi>a</mi><mfenced><mi>t</mi></mfenced><mo>=</mo><mo>-</mo><mfrac><mi>t</mi><mn>${A}</mn></mfrac><mo>+</mo><mn>${B}</mn></math><p>How far has the rocket traveled from the moment of the launch to the moment the rocket stops accelerating?</p>`;
      
      
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      
      
      
      return `${Math.round(100*(     (B*B*B*A*A)/3      ))/100}`;
    },
    reward: function() {
    return {actionId: "Scald4", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 65,
    prop: "scald4",
    dakek: "scald",
  },
  "scald5": {
    name:"Scald 5",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(5)+1;
      window.Constants.B = utils.getRandomInt(9)+2;
      window.Constants.C = utils.getRandomInt(9)+2;
      window.Constants.D = utils.getRandomInt(20);
      window.Constants.E = utils.getRandomInt(20)+20;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      
      var contentHTML = `<p>The derivative of the function ${utils.drawVariable("f")} is given below.</p><math><mi>f</mi><mo>'</mo><mfenced><mi>x</mi></mfenced><mo>=</mo><msqrt><mn>${A*A}</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mfrac><mn>${2*A*A*C}</mn><mn>${D}</mn></mfrac><mi>x</mi><mo>+</mo><mfrac><mn>${(A*A*C*C)-(D*D)}</mn><mn>${D*D}</mn></mfrac></msqrt></math><p>Find the arc length of the function ${utils.drawVariable("f")} from ${utils.drawVariable("x")} = ${D} to ${utils.drawVariable("x")} = ${E}. Round your answer to the nearest hundredth.</p>`;
      
      
      return contentHTML;
      
    },
    prompt: ``,
    
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      
      const first = (E*E)/2 + (B*E)/C
      const second = (D*D)/2 + (B*D)/C
      
      
      
      return `${Math.round(100*(     A*(first-second)      ))/100}`;
    },
    reward: function() {
    return {actionId: "Scald5", dakek: "M", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 85,
    prop: "scald5",
    dakek: "scald",
  },
  //Statistics
  
  "hinde1": {
    name:"Hinde 1",
    inputType: "choice",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(190)+20;
      window.Constants.B = utils.getRandomInt(89)+11;
      window.Constants.C = utils.getRandomInt(6)+90;
      if(window.Constants.C=90) {window.Constants.D=1.2816}
      if(window.Constants.C=91) {window.Constants.D=1.3408}
      if(window.Constants.C=92) {window.Constants.D=1.4051}
      if(window.Constants.C=93) {window.Constants.D=1.4758}
      if(window.Constants.C=94) {window.Constants.D=1.5545}
      if(window.Constants.C=95) {window.Constants.D=1.6449}
      if(window.Constants.C=96) {window.Constants.D=1.7506}
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `Sam and Johnathan are trapped on an island, and they notice that some of the crabs on that island have speckled shells. They take a random sample of ${A} crabs and find that ${Math.round(B*A/100)} of them are speckled. Assuming the conditions for making a confidence interval are met, what is the range of the actual population proportion of speckled crabs that they can estimate with ${C}% confidence?`;
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const specs = Math.round((B*A/100));
      const prop = specs/A;
      const SD = Math.sqrt((prop*(1-prop))/A)
      window.Choices = [
        //`(${Math.round(10000*((prop)-D*SD))/100}%, ${Math.round(10000*((prop)+D*SD))/100}%)`,
        `5`,
        `(${Math.round(10000*((prop)-Math.sqrt( ((prop)*(1-(prop)))/A )))/100}%, ${Math.round(10000*((prop)+Math.sqrt( ((prop)*(1-(prop)))/A )))/100}%)`,
        `(${Math.round(10000*((prop)-D*( ((prop)*(1-(prop)))/A )))/100}%, ${Math.round(10000*((prop)+D*( ((prop)*(1-(prop)))/A )))/100}%)`,
        `(${Math.round(10000*((prop)-D*Math.sqrt( ((prop)*(1-(prop)))/(A*A) )))/100}%, ${Math.round(10000*((prop)+D*Math.sqrt( ((prop)*(1-(prop)))/(A*A) )))/100}%)`,
      ];
      
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const specs = Math.round(B*A/100);
      //return `(${(A/specs)-D*Math.sqrt( ((A/specs)*(1-(A/specs)))/A )}, ${(A/specs)+D*Math.sqrt( ((A/specs)*(1-(A/specs)))/A )})`;
      return `5`;
    },
    reward: function() {
    return {actionId: "Hinde1", dakek: "Y", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 15,
    prop: "hinde1",
    dakek: "hinde",
  },
  
  //Linear Algebra
  "boost1": {
    name:"Boost 1",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(10)+1);
      window.Constants.B = Math.floor(utils.getRandomInt(10)+1);
      window.Constants.C = Math.floor(utils.getRandomInt(10)+1);
      window.Constants.D = Math.floor(utils.getRandomInt(10)+1);
      
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const origin = [3, 103];
      var graphHTML= `<svg width="110" height="110">`;
      for(var i = 0; i<11; i++) {
        graphHTML +=`<line x1="3" y1="${3+i*10}" x2="103" y2="${3+i*10}" stroke="black" stroke-width="1"/>`
        graphHTML +=`<line x1="${3+i*10}" y1="3" x2="${3+i*10}" y2="103" stroke="black" stroke-width="1"/>`
      }
      
      var theta = Math.atan(B/A);
      graphHTML += `<line x1="${origin[0]}" y1="${origin[1]}" x2="${origin[0]+A*10}" y2="${origin[1]-B*10}" stroke="red" stroke-width="2"/>`;
      graphHTML += `<line x1="${origin[0]+A*10}" y1="${origin[1]-B*10}" x2="${origin[0]+A*10 + 5*Math.sin(theta) - 5*Math.cos(theta)}" y2="${origin[1]-B*10 + 5*Math.sin(theta) + 5*Math.cos(theta)}" stroke="red" stroke-width="2"/>`;
      graphHTML += `<line x1="${origin[0]+A*10}" y1="${origin[1]-B*10}" x2="${origin[0]+A*10 - 5*Math.sin(theta) - 5*Math.cos(theta)}" y2="${origin[1]-B*10 - 5*Math.cos(theta) + 5*Math.sin(theta)}" stroke="red" stroke-width="2"/>`;
      
      
      graphHTML += `</svg>`;
      return graphHTML;
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      window.Choices = [
        utils.draw2DVector(A,B),
        utils.draw2DVector(B,A),
        utils.draw2DVector(C,D),
        utils.draw2DVector(D,C),
      ];
      
    },
    prompt: `<p>Name the following vector in <math><msup><mi mathvariant="normal">&#x211D;</mi><mn>2</mn></msup></math>.</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      return utils.draw2DVector(A,B);
    },
    reward: function() {
    return {actionId: "Boost1", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "boost1",
    dakek: "boost",
  },
  "boost2": {
    name:"Boost 2",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.B = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.C = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.D = Math.floor(utils.getRandomInt(30)+1);
      
    },
    content: function() {
      return `<p>${utils.draw2DVector(window.Constants.A, window.Constants.B)} + ${utils.draw2DVector(window.Constants.C, window.Constants.D)}</p>`
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      window.Choices = [
        utils.draw2DVector(A+A,B+B),
        utils.draw2DVector(B+D,A+C),
        utils.draw2DVector(C+A,D+B),
        utils.draw2DVector(D+C,C+B),
      ];
      
    },
    prompt: `<p>Add the following vectors. </p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return utils.draw2DVector(A+C,B+D);
    },
    reward: function() {
    return {actionId: "Boost2", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 1,
    prop: "boost2",
    dakek: "boost",
  },
  "boost3": {
    name:"Boost 3",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12);
      window.Constants.B = utils.getRandomInt(12);
      window.Constants.C = utils.getRandomInt(12);
      window.Constants.D = utils.getRandomInt(12)+2;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A}</mn></mtd></mtr><mtr><mtd><mn>${B}</mn></mtd></mtr><mtr><mtd><mn>${C}</mn></mtd></mtr></mtable></mfenced><mo>=</mo><mi>x</mi><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A*D}</mn></mtd></mtr><mtr><mtd><mn>${B*D}</mn></mtd></mtr><mtr><mtd><mn>${C*D}</mn></mtd></mtr></mtable></mfenced></math>`;
    },
    prompt: `<p>Solve for the following scalar ${utils.drawVariable("x")},</p>`,
    getSolution: function() {
      return `${window.Constants.D}`;
    },
    reward: function() {
    return {actionId: "Boost3", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 15,
    prop: "boost3",
    dakek: "boost",
  },
  "boost4": {
    name:"Boost 4",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(12);
      window.Constants.B = utils.getRandomInt(12);
      window.Constants.C = utils.getRandomInt(12);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A}</mn></mtd></mtr><mtr><mtd><mn>${B}</mn></mtd></mtr><mtr><mtd><mn>${C}</mn></mtd></mtr></mtable></mfenced></math>`;
    },
    prompt: `<p>Find the magnitude of the following vector. If necessary, round your answer to the hundredth.</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      return `${Math.round(100*(Math.sqrt(A*A + B*B + C*C)))/100}`;
    },
    reward: function() {
    return {actionId: "Boost4", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 10,
    prop: "boost4",
    dakek: "boost",
  },
  "boost5": {
    name:"Boost 5",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(30)-15;
      window.Constants.B = utils.getRandomInt(30)-15;
      window.Constants.C = utils.getRandomInt(30)-15;
      window.Constants.D = utils.getRandomInt(30)-15;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      return `<p>Find the angle between <math><mover><mi>a</mi><mo>&#x21C0;</mo></mover></math> and <math><mover><mi>b</mi><mo>&#x21C0;</mo></mover></math>. If necessary, round your answer to the hundredth of a degree.
      <br> <math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A}</mn></mtd></mtr><mtr><mtd><mn>${B}</mn></mtd></mtr></mtable></mfenced><mo>&#xA0;</mo><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${C}</mn></mtd></mtr><mtr><mtd><mn>${D}</mn></mtd></mtr></mtable></mfenced></math></p>`;
    },
    prompt: ``,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const aMag = Math.sqrt(A*A + B*B);
      const bMag = Math.sqrt(C*C + D*D);
      const aDotb = A*C + B*D;
      const answerInRadians = Math.acos((aDotb)/(aMag*bMag));
      return `${Math.round(100*((answerInRadians*180)/(Math.PI)))/100}`;
    },
    reward: function() {
    return {actionId: "Boost5", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 10,
    prop: "boost5",
    dakek: "boost",
  },
  "boost6": {
    name:"Boost 6",
    inputType: "text",
    getRandoms: function() {
      window.Constants.A = utils.getRandomInt(30)-15;
      window.Constants.B = utils.getRandomInt(30)-15;
      window.Constants.C = utils.getRandomInt(30)-15;
      window.Constants.D = utils.getRandomInt(30)-15;
      window.Constants.E = utils.getRandomInt(30)-15;
      window.Constants.F = utils.getRandomInt(30)-15;
      window.Constants.G = utils.getRandomInt(30)-15;
      window.Constants.H = utils.getRandomInt(30)-15;
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      const H = window.Constants.H;
      return `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A}</mn></mtd></mtr><mtr><mtd><mn>${B}</mn></mtd></mtr><mtr><mtd><mn>${C}</mn></mtd></mtr><mtr><mtd><mn>${D}</mn></mtd></mtr></mtable></mfenced><mo>&#xB7;</mo><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${E}</mn></mtd></mtr><mtr><mtd><mn>${F}</mn></mtd></mtr><mtr><mtd><mn>${G}</mn></mtd></mtr><mtr><mtd><mn>${H}</mn></mtd></mtr></mtable></mfenced></math>`;
    },
    prompt: `Evaluate the dot product of the following vectors,`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      const G = window.Constants.G;
      const H = window.Constants.H;
      return `${A*E + B*F + C*G + D*H}`;
    },
    reward: function() {
    return {actionId: "Boost6", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
    },
    penalty: 8,
    prop: "boost6",
    dakek: "boost",
  },
  "boost7": {
    name:"Boost 7",
    inputType: "choice",
    
    getRandoms: function() {
      window.Constants.A = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.B = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.C = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.D = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.E = Math.floor(utils.getRandomInt(30)+1);
      window.Constants.F = Math.floor(utils.getRandomInt(30)+1);
    },
    content: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A}</mn></mtd></mtr><mtr><mtd><mn>${B}</mn></mtd></mtr><mtr><mtd><mn>${C}</mn></mtd></mtr></mtable></mfenced><mo>&#xD7;</mo><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${D}</mn></mtd></mtr><mtr><mtd><mn>${E}</mn></mtd></mtr><mtr><mtd><mn>${F}</mn></mtd></mtr></mtable></mfenced></math>`
    },
    getChoices() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      window.Choices = [
        `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${B*F-C*E}</mn></mtd></mtr><mtr><mtd><mn>${C*D-A*F}</mn></mtd></mtr><mtr><mtd><mn>${A*E-B*D}</mn></mtd></mtr></mtable></mfenced></math>`,
        `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A+D}</mn></mtd></mtr><mtr><mtd><mn>${B-E}</mn></mtd></mtr><mtr><mtd><mn>${C+F}</mn></mtd></mtr></mtable></mfenced></math>`,
        `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${A*D}</mn></mtd></mtr><mtr><mtd><mn>${B*E}</mn></mtd></mtr><mtr><mtd><mn>${C*F}</mn></mtd></mtr></mtable></mfenced></math>`,
        `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${B*F+C*E}</mn></mtd></mtr><mtr><mtd><mn>${C*D+A*F}</mn></mtd></mtr><mtr><mtd><mn>${A*E+B*D}</mn></mtd></mtr></mtable></mfenced></math>`,
        
        
      ];
      
    },
    prompt: `<p>Evaluate the cross product of the following vectors,</p>`,
    getSolution: function() {
      const A = window.Constants.A;
      const B = window.Constants.B;
      const C = window.Constants.C;
      const D = window.Constants.D;
      const E = window.Constants.E;
      const F = window.Constants.F;
      return `<math><mfenced open="[" close="]"><mtable><mtr><mtd><mn>${B*F-C*E}</mn></mtd></mtr><mtr><mtd><mn>${C*D-A*F}</mn></mtd></mtr><mtr><mtd><mn>${A*E-B*D}</mn></mtd></mtr></mtable></mfenced></math>`;
    },
    reward: function() {
    return {actionId: "Boost7", dakek: "C", instanceId: `p${utils.howManyPlayerSpells()+1}`, team: "player"};
      
    },
    penalty: 9,
    prop: "boost7",
    dakek: "boost",
  },
  
  
  
}