
const howToPlayButtonElement = document.getElementById("howToPlayButton");
const spellGuideButtonElement = document.getElementById("spellGuideButton");
const commentsButtonElement = document.getElementById("commentsButton");
const teacherStuffButtonElement = document.getElementById("teacherStuffButton");
const adminLoginButtonElement = document.getElementById("adminLoginButton");
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
<p>If you find bugs in the code, think of any good improvement or cool additions for later versions, let us know in the comments!</br></br>Thank you for playing Calcula!</p>`


var spellGuidePopUpElement = document.createElement("div");
spellGuidePopUpElement.classList.add("popUp");
spellGuidePopUpElement.innerHTML = `<h1>Spell Guide</h1>
<h2> Kindergarten</h2>
<ul>
  <li>Sweep 1</li>
  <li>Aid 1</li>
  <li>Flect 1</li>
</ul>
<h2> First Grade</h2>
<ul>
  <li>Sweep 1</li>
  <li>Aid 1</li>
  <li>Flect 1</li>
  <li>Flect 2</li>
  <li>Vert 1</li>
  <li>Vert 2</li>
</ul>
<h2> Second Grade</h2>
<ul>
  <li>Sweep 2</li>
  <li>Sweep 3</li>
  <li>Blast 1</li>
  <li>Flect 3</li>
  <li>Block 1</li>
  <li>Block 2</li>
  <li>Vert 3</li>
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
<p>We work hard to ensure the math in this game reflects Common Core content standards. The following is a list of each spell and its associated Common Core standard.</p>
<h2>Number System, Operations, and Algebra</h2>
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

<h2>Geometry</h2>

<p>Aid 1: K.G.2 Correctly name shapes regardless of their orientations or overall size.</p>

<p>Aid 2: K.G.4 Analyze and compare two- and three-dimensional shapes, in different sizes and orientations, using informal language to describe their similarities, differences, parts (e.g., number of sides and vertices/“corners”) and other attributes (e.g., having sides of equal length).</p>

<p>Aid 3: 3.G.1 Understand that shapes in different categories (e.g., rhombuses, rectangles, and others) may share attributes (e.g., having four sides), and that the shared attributes can define a larger category (e.g., quadrilaterals). Recognize rhombuses, rectangles, and squares as examples of quadrilaterals, and draw examples of quadrilaterals that do not belong to any of these subcategories.</p>

<p>Aid 4: 4.G.1 Draw points, lines, line segments, rays, angles (right, acute, obtuse), and perpendicular and parallel lines. Identify these in two-dimensional figures.</p>

<p>Aid 5: G.CO.5  Given a geometric figure and a rotation, reflection, or translation, draw the transformed figure using, e.g., graph paper, tracing paper, or geometry software. Specify a sequence of transformations that will carry a given figure onto another.</p>

<p>Aid 6: G.CO.2 . Compare transformations that preserve distance and angle to those that do not (e.g., translation versus horizontal stretch).</p>

<p>Vive 1: 4.MD.6 Measure angles in whole-number degrees using a protractor. Sketch angles of specified measure.</p>

<p>Vive 2: 7.G.5 Use facts about supplementary, complementary, vertical, and adjacent angles in a multi-step problem to write and solve simple equations for an unknown angle in a figure.</p>

<p>Vive 3: 8.G.7 Apply the Pythagorean Theorem to determine unknown side lengths in right triangles in real-world and mathematical problems in two and three dimensions.</p>

<p>Heal 1: 3.MD.7 Relate area to the operations of multiplication and addition.</p>

<p>Heal 2: 5.MD.5 Relate volume to the operations of multiplication and addition and solve real-world and mathematical problems involving volume.</p>

<p>Heal 3: 7.G.4 Know the formulas for the area and circumference of a circle and use them to solve problems; give an informal derivation of the relationship between the circumference and area of a circle.</p>

<p>Heal 4: G.C.5 Derive using similarity the fact that the length of the arc intercepted by an angle is proportional to the radius, and define the radian measure of the angle as the constant of proportionality; derive the formula for the area of a sector. </p>

<p>Heal 5: G.GPE.3 Derive the equations of ellipses and hyperbolas given the foci, using the fact that the sum or difference of distances from the foci is constant.</p>

<p>Rush 1: G.SRT.6 Understand that by similarity, side ratios in right triangles are properties of the angles in the triangle, leading to definitions of trigonometric ratios for acute angles. </p>

<p>Rush 2: G.SRT.8 Use trigonometric ratios and the Pythagorean Theorem to solve right triangles in applied problems.</p>

<p>Rush 3: G.SRT.11 Understand and apply the Law of Sines and the Law of Cosines to find unknown measurements in right and non-right triangles (e.g., surveying problems, resultant forces).</p>

<h2>Measurement, Data, Probability, and Statistics</h2>
<p>Flect 1: K.MD.2 Directly compare two objects with a measurable attribute in common, to see which object has “more of”/“less of” the attribute, and describe the difference. For example, directly compare the heights of two children and describe one child as taller/shorter.</p>

<p>Flect 2: 1.MD.1 Order three objects by length; compare the lengths of two objects indirectly by using a third object.</p>

<p>Flect 3: 2.MD.3 Estimate lengths using units of inches, feet, centimeters, and meters.</p>

<p>Flect 4: 8.EE.4 Use scientific notation and choose units of appropriate size for measurements of very large or very small quantities (e.g., use millimeters per year for seafloor spreading). Interpret scientific notation that has been generated by technology.</p>

<p>Flect 5: 3.MD.1 Tell and write time to the nearest minute and measure time intervals in minutes. Solve word problems involving addition and subtraction of time intervals in minutes, e.g., by representing the problem on a number line diagram.</p>

<p>Block 1: 2.MD.7 Tell and write time from analog and digital clocks to the nearest five minutes, using a.m. and p.m.</p>

<p>Block 2: 2.MD.8 Solve word problems involving dollar bills, quarters, dimes, nickels, and pennies, using dollar and cent symbols appropriately. Example: If you have 2 dimes and 3 pennies, how many cents do you have?</p>

<p>Vert 1: 1.MD.4 Organize, represent, and interpret data with up to three categories; ask and answer questions about the total number of data points, how many in each category, and how many more or less are in one category than in another.</p>

<p>Vert 2: 1.MD.4 Organize, represent, and interpret data with up to three categories; ask and answer questions about the total number of data points, how many in each category, and how many more or less are in one category than in another.</p>

<p>Vert 3: 2.MD.10 Draw a picture graph and a bar graph (with single-unit scale) to represent a data set with up to four categories. Solve simple put-together, take-apart, and compare problems4 using information presented in a bar graph.</p>

<p>Vert 4 : 3.MD.2 Measure and estimate liquid volumes and masses of objects using standard units of grams (g), kilograms (kg), and liters (l).</p>

<p>Vert 5: 5.MD.2 Make a line plot to display a data set of measurements in fractions of a unit (1/2, 1/4, 1/8). Use operations on fractions for this grade to solve problems involving information presented in line plots. </p>

<p>Fract 1: 4.G.1  Draw points, lines, line segments, rays, angles (right, acute, obtuse), and perpendicular and parallel lines. Identify these in two-dimensional figures.</p>

<p>Fract 2: 5.MD.1 Convert among different-sized standard measurement units within a given measurement system. </p>

<p>Fract 3: 6.RP.3 Use ratio and rate reasoning to solve real-world and mathematical problems, e.g., by reasoning about tables of equivalent ratios, tape diagrams, double number line diagrams, or equations.</p>

<p>Guard 1: 7.SP.2 Use data from a random sample to draw inferences about a population with an unknown characteristic of interest. Generate multiple samples (or simulated samples) of the same size to gauge the variation in estimates or predictions.</p>

<p>Guard 2: 6.SP.5 (c) Giving quantitative measures of center (median and/or mean) and variability (interquartile range and/or mean absolute deviation), as well as describing any overall pattern and any striking deviations from the overall pattern with reference to the context in which the data were gathered.</p>

<p>Guard 3: 8.SP.4 Understand that patterns of association can also be seen in bivariate categorical data by displaying frequencies and relative frequencies in a two-way table. Construct and interpret a two-way table summarizing data on two categorical variables collected from the same subjects.</p>

<p>Guard 4: S.ID.2 Use statistics appropriate to the shape of the data distribution to compare center (median, mean) and spread (interquartile range, standard deviation) of two or more different data sets.</p>

<p>Shield 1: S.CP.4 Construct and interpret two-way frequency tables of data when two categories are associated with each object being classified. Use the two-way table as a sample space to decide if events are independent and to approximate conditional probabilities.</p>

<p>Shield 2: 7.SP.6 Approximate the probability of a chance event by collecting data on the chance process that produces it and observing its long-run relative frequency, and predict the approximate relative frequency given the probability. For example, when rolling a number cube 600 times, predict that a 3 or 6 would be rolled roughly 200 times, but probably not exactly 200 times.</p>
`


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

var adminLoginPopUpElement = document.createElement("div");
adminLoginPopUpElement.classList.add("popUp");
adminLoginPopUpElement.innerHTML = `<h2>Admin Login</h2>`
var adminLoginForm = document.createElement("form");
adminLoginForm.id = "adminLoginForm";
adminLoginForm.innerHTML = `
<textarea id="usernameText" name="username" placeholder="username"></textarea>
<textarea id="passwordText" name="password" placeholder="password"></textarea>
<button class="button" type="submit">Submit</button>`;
adminLoginPopUpElement.appendChild(adminLoginForm);
var adminLoginResult = document.createElement("div");
adminLoginResult.id = "adminLoginResult";
adminLoginPopUpElement.appendChild(adminLoginResult);




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

adminLoginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    var formData = new FormData(this);

    // Send form data to the server using Fetch API
    fetch("process_admin_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text()) // Parse response as text
    .then(data => {
        // Update page content with the echoed comment
        adminLoginResult.innerHTML = data;
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

 var onAdminLogin = function() {
    if(currentPopUp !== adminLoginPopUpElement) {
        popUpContainerElement.innerHTML = "";
        adminLoginPopUpElement.appendChild(exitButtonElement);
        popUpContainerElement.appendChild(adminLoginPopUpElement);
        currentPopUp = adminLoginPopUpElement;
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
adminLoginButtonElement.addEventListener("click", onAdminLogin);
teacherStuffButtonElement.addEventListener("click", onTeacherStuff);

