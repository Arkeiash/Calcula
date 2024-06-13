
const howToPlayButtonElement = document.getElementById("howToPlayButton");
const spellGuideButtonElement = document.getElementById("spellGuideButton");
const commentsButtonElement = document.getElementById("commentsButton");
const aboutUsButtonElement = document.getElementById("aboutUsButton");
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

 exitButtonElement.addEventListener("click", function() {
    closePopUp(currentPopUp);
});

howToPlayButtonElement.addEventListener("click", onHowToPlay);
spellGuideButtonElement.addEventListener("click", onSpellGuide);
commentsButtonElement.addEventListener("click", onComment);
aboutUsButtonElement.addEventListener("click", onAboutUs);

