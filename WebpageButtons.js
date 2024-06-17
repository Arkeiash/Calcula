
const howToPlayButtonElement = document.getElementById("howToPlayButton");
const spellGuideButtonElement = document.getElementById("spellGuideButton");
const commentsButtonElement = document.getElementById("commentsButton");
const teacherStuffButtonElement = document.getElementById("teacherStuffButton");
const popUpContainerElement = document.getElementById("popUpContainer");
const exitButtonElement = document.createElement("button");
exitButtonElement.classList.add("button");
exitButtonElement.innerText = "Back";

var currentPopUp = false;

var howToPopUpElement = document.createElement("div");     
howToPopUpElement.classList.add("popUp");
howToPopUpElement.innerHTML = `
<h1>How to Play</h1>
<h2>Overview</h2>
<p>Right now, Calcula is still early in its development. You can explore the map, fight NPCs, and try to find bugs in the program! If you find anything, leave your comments in the comment section.</p>
<h2>Creating Spells</h2>
<ul>
<li>Press "p" to access the Pause Menu</li>
<li>Select spell Type. There are 5 types:
<ul>
    <li>Attacking Spells: These directly decrease your opponents health when used.</li> 
    <li>Healing: These directly increase your own health when used.</li>
    <li>Protecting: These provide you a buffer so that enemy attacking and destroying spells take longer to affect your health.</li>
    <li>Destroying: These are like ultra-powerful attacking spells.</li>
    <li>Fortifying: These give you some percentage of resistance to enemy attacking and destroying spells, no matter how powerful.</li>
    <li>Amplifying: These make your attacking and destroying spells more powerful by some percentage.</li>
    </ul
</li>
    <li>Look at the Spell Guide to see which spells are best for your grade level.</li>
    <li>Be Careful! Getting questions wrong will decrease your health!</li>
</ul>
<h2>Engaging NPCs</h2>
<ul>
<li>Approach any character to view their stats.</li>
    <li>Press "enter" or "return" to engage with characters.</li>
</ul>
<h2>Leaving your Feedback</h2>
<p>If you find bugs in the code, or think of any good improvement or cool additions for later versions, lut us know in the comments!</br></br>Thank you for playing Calcula!</p>`


var spellGuidePopUpElement = document.createElement("div");
spellGuidePopUpElement.classList.add("popUp");
spellGuidePopUpElement.innerHTML = `<h1>Spell Guide</h1>
<h2> Kindergarten</h2>
<ul>
  <li>Sweep 1</li>
  <li>Sweep 2</li>
  <li>Sweep 3</li>
  <li>Sweep 4</li>
  <li>Sweep 5</li>
</ul>
<h2> First Grade</h2>
<ul>
  <li>Sweep 1</li>
  <li>Sweep 2</li>
  <li>Sweep 3</li>
  <li>Sweep 4</li>
  <li>Sweep 5</li>
</ul>
<h2> Second Grade</h2>
<ul>
  <li>Sweep 1</li>
  <li>Sweep 2</li>
  <li>Sweep 3</li>
  <li>Sweep 4</li>
  <li>Sweep 5</li>
</ul>
<h2> Third Grade</h2>
<ul>
  <li>Sweep 1</li>
  <li>Sweep 2</li>
  <li>Sweep 3</li>
  <li>Sweep 4</li>
  <li>Sweep 5</li>
</ul>`;

var teacherStuffPopUpElement = document.createElement("div");
teacherStuffPopUpElement.classList.add("popUp");
teacherStuffPopUpElement.innerHTML = `<h1>Alignment with California Common Core Standards</h1>
<h2>Algebra</h2>
<p>Sweep 1: K.OA.2: Solve addition and subtraction word problems within 10, using objects or drawings to represent the problem.</p>

<p>Sweep 2: 2.OA.1 Use addition and subtraction within 100 to solve one- and two-step word problems involving situations of
adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions, e.g., by using drawings 
and equations with a symbol for the unknown number to represent the problem.</p>

<p>Sweep 3: 2.NBT.1 Understand that the three digits of a three-digit number represent amounts of hundreds, tens, and ones; e.g., 706 equals 7 hundreds, 0 tens, and 6 ones.</p>

<p>Sweep 4: 3.NBT.2 Fluently add and subtract within 1000 using strategies and algorithms based on place value, properties of operations, and/or the relationship between addition and subtraction.</p>

<p>Sweep 5: 5.NF.1 Add and subtract fractions with unlike denominators (including mixed numbers) by replacing given fractions with equivalent fractions in such a way as to produce an equivalent sum or difference of fractions with like denominators.</p>

<p>Sweep 6: 7.NS.1 Apply and extend previous understandings of addition and subtraction to add and subtract rational numbers; represent addition and subtraction on a horizontal or vertical number line diagram.</p>

<p>Blast 1: 2.OA.4 Use addition to find the total number of objects arranged in rectangular arrays with up to 5 rows and up to 5 columns; write an equation to express the total as a sum of equal addends.</p>

<p>Blast 2: 3.OA.7 Fluently multiply and divide within 100, using strategies such as the relationship between multiplication and division (e.g., knowing that 8 × 5 = 40, one knows 40 ÷ 5 = 8) or properties of operations.</p>

<p>Blast 3: 6.NS.3 Fluently add, subtract, multiply, and divide multi-digit decimals using the standard algorithm for each operation.</p>

<p>Blast 4: 7.NS.2 (b) Understand that integers can be divided, provided that the divisor is not zero, and every quotient of integers (with non-zero divisor) is a rational number. If p and q are integers, then –(p/q) = (–p)/q = p/(–q). Interpret quotients of rational numbers by describing real-world contexts.</p>

<p>Flare 1, 2, and 3: 6.EE.2 (c) Evaluate expressions at specific values of their variables. Include expressions that arise from formulas used in realworld problems. Perform arithmetic operations, including those involving whole-number exponents, in the conventional order when there are no parentheses to specify a particular order (Order of Operations).</p> 

<p>Flare 4: A.CED.2 Create equations in two or more variables to represent relationships between quantities; graph equations on coordinate axes with labels and scales.</p>

<p>Flare 5: A.APR.1 Understand that polynomials form a system analogous to the integers, namely, they are closed under the operations of addition, subtraction, and multiplication; add, subtract, and multiply polynomials.</p>

<p>Flare 6: N.CN.2 Use the relation i 2 = −1 and the commutative, associative, and distributive properties to add, subtract, and multiply complex numbers.</p>

<p>Scar 1: 5.NBT.2 Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.</p>

<p>Scar 2: N.RN.2 Rewrite expressions involving radicals and rational exponents using the properties of exponents.</p>

<p>Scar 3: N.RN.1 Explain how the definition of the meaning of rational exponents follows from extending the properties of integer exponents to those values, allowing for a notation for radicals in terms of rational exponents. </p>

<p>Scar 4: F.LE.4.2  Use the definition of logarithms to translate between logarithms in any base. </p>

<p>Singe 1: 6.EE.2 Write, read, and evaluate expressions in which letters stand for numbers.</p>

<p>Singe 2: 6.EE.5 Use substitution to determine whether a given number in a specified set makes an equation or inequality true.</p>

<p>Singe 3: A.REI.1 Explain each step in solving a simple equation as following from the equality of numbers asserted at the previous step, starting from the assumption that the original equation has a solution. Construct a viable argument to justify a solution method.</p>

<p>Singe 4: A.CED.1 Create equations and inequalities in one variable including ones with absolute value and use them to solve problems. Include equations arising from linear and quadratic functions, and simple rational and exponential functions.</p> 

<p>Singe 5: A.SSE.3 Choose and produce an equivalent form of an expression to reveal and explain properties of the quantity represented by the expression.</p>

<p>Scorch 1: A.REI.6 Solve systems of linear equations exactly and approximately (e.g., with graphs), focusing on pairs of linear equations in two variables.</p>

<p>Scorch 2: F.BF.1 (using exponential equations) Write a function that describes a relationship between two quantities.</p>

<p>Scorch 3: A.REI.4 (b) Solve quadratic equations by inspection (e.g., for x2 = 49), taking square roots, completing the square, the quadratic formula, and factoring, as appropriate to the initial form of the equation. Recognize when the quadratic formula gives complex solutions and write them as a ± bi for real numbers a and b.</p>

<p>Scorch 4: A.REI.4 (a) Use the method of completing the square to transform any quadratic equation in x into an equation of the form (x – p)2 = q that has the same solutions. Derive the quadratic formula from this form.</p>


<p>Raze 1: A.APR.3 Identify zeros of polynomials when suitable factorizations are available, and use the zeros to construct a rough graph of the function defined by the polynomial.</p> 

<p>Raze 2: A.REI.2 Solve simple rational and radical equations in one variable, and give examples showing how extraneous solutions may arise. </p>

<p>Raze 3: F.TF.5 Choose trigonometric functions to model periodic phenomena with specified amplitude, frequency, and midline.</p>


var commentPopUpElement = document.createElement("div");
commentPopUpElement.classList.add("popUp");
commentPopUpElement.innerHTML = `<h2>Submit a Comment</h2>`
var commentForm = document.createElement("form");
commentForm.id = "commentForm";
commentForm.innerHTML = `
<textarea id="nameText" name="name" placeholder="Name"></textarea>
<textarea id="commentText" name="comment" placeholder="Enter your comment here"></textarea>
<button class="button" type="submit">Submit</button>`;
commentPopUpElement.appendChild(commentForm);
var commentResult = document.createElement("div");
commentResult.id = "commentResult";
commentPopUpElement.appendChild(commentResult);
commentResult.innerHTML = `<p>hey dude. It's right here</p>`



commentForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    var formData = new FormData(this);

    // Send form data to the server using Fetch API
    fetch("process_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text()) // Parse response as text
    .then(data => {
        // Update page content with the echoed comment
        commentResult.innerHTML = data;
    })
    .catch(error => {
        console.error("Error:", error);
    });
});




var closePopUp = function(element) {
    popUpContainerElement.innerHTML = "";
    console.log("Pop Down");
    currentPopUp = false;
}
var onHowToPlay = function() {
    console.log(currentPopUp);
    
    if(currentPopUp !== howToPopUpElement) {
         howToPopUpElement.appendChild(exitButtonElement);
         popUpContainerElement.appendChild(howToPopUpElement);
         currentPopUp = howToPopUpElement;
     }
     else {
        console.log("popDown")
        closePopUp(currentPopUp);
        currentPopUp = false;
    }
 
 };

 var onSpellGuide = function() {
    console.log(currentPopUp);
    if(currentPopUp !== spellGuidePopUpElement) {
         spellGuidePopUpElement.appendChild(exitButtonElement);
         popUpContainerElement.appendChild(spellGuidePopUpElement);
         currentPopUp = spellGuidePopUpElement;
     }
    else {
        console.log("popDown")
        closePopUp(currentPopUp);
        currentPopUp = false;
    }
 
 };

 var onComment = function() {
    if(currentPopUp !== commentPopUpElement) {
        popUpContainerElement.innerHTML = "";
        commentPopUpElement.appendChild(exitButtonElement);
        popUpContainerElement.appendChild(commentPopUpElement);
        currentPopUp = commentPopUpElement;
    }
   else {
       console.log("popDown")
       closePopUp(currentPopUp);
       currentPopUp = false;
   }
 };

var onTeacherStuff = function() {
    if(currentPopUp !== teacherStuffPopUpElement) {
        popUpContainerElement.innerHTML = "";
        teacherStuffPopUpElement.appendChild(exitButtonElement);
        popUpContainerElement.appendChild(teacherStuffPopUpElement);
        currentPopUp = teacherStuffPopUpElement;
    }
   else {
       console.log("popDown")
       closePopUp(currentPopUp);
       currentPopUp = false;
   }
 };

 exitButtonElement.addEventListener("click", function() {
    closePopUp(currentPopUp);
});

howToPlayButtonElement.addEventListener("click", onHowToPlay);
spellGuideButtonElement.addEventListener("click", onSpellGuide);
commentsButtonElement.addEventListener("click", onComment);
teacherStuffButtonElement.addEventListener("click", onTeacherStuff);

