var commentPopUpElement = document.createElement("div");
commentPopUpElement.classList.add("popUp");
commentPopUpElement.innerHTML = `<h2>Submit a Comment</h2>`
var commentDisplayContainer = document.createElement("div");
commentDisplayContainer.classList.add('popUp');
commentDisplayContainer.id = "commentDisplayContainer";
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
<input id="usernameText" name="username" placeholder="username"></textarea>
<input id="passwordText" name="password" placeholder="password" type="password"></textarea>
<button class="button" type="submit">Submit</button>`;
adminLoginPopUpElement.appendChild(adminLoginForm);
var adminLoginResult = document.createElement("div");
adminLoginResult.id = "adminLoginResult";
adminLoginPopUpElement.appendChild(adminLoginResult);

function createCommentsElement(comments) {
    popUpContainerElement.innerHTML = "";
    var commentTableElement = document.createElement("div");
    commentTableElement.classList.add('popUp');
    var pendingComments = comments.filter(comment => comment.status === "pending");
    if(pendingComments.length !== 0) {
    pendingComments.forEach(comment => {

        const commentElement = document.createElement('div');

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = `Name: ${comment.name}`;

        const commentTextElement = document.createElement('div');
        commentTextElement.classList.add('commentText');
        commentTextElement.textContent = `Comment: ${comment.comment}`;

        const statusElement = document.createElement('div');
        statusElement.classList.add('status');
        statusElement.textContent = `Status: ${comment.status}`;

        commentElement.appendChild(nameElement);
        commentElement.appendChild(commentTextElement);
        commentElement.appendChild(statusElement);

        const commentApproveButton = document.createElement("button");
        commentApproveButton.innerText = "Approve";
        commentApproveButton.addEventListener("click", function() {
            console.log("Comment ID:", comment.id);

            approveComment(comment.id);
        });
    

        const commentRejectButton = document.createElement("button");
        commentRejectButton.innerText = "Reject";
        commentRejectButton.addEventListener("click", function() {
            console.log("Comment ID:", comment.id);

            rejectComment(comment.id);
        });
        commentTableElement.appendChild(commentElement);
        commentTableElement.appendChild(commentApproveButton);
        commentTableElement.appendChild(commentRejectButton);
        console.log(commentTableElement);
    });
} else {commentTableElement.innerHTML = `<p>Nothing to approve</p>`}
    currentPopUp = commentTableElement;
    popUpContainerElement.appendChild(commentTableElement);
}
function createCommentsDisplayElement(comments) {
    var commentTableElement = document.createElement("div");
    var approvedComments = comments.filter(comment => comment.status === "approved");
    approvedComments.forEach(comment => {

        const commentElement = document.createElement('div');

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = `${comment.name}`;

        const commentTextElement = document.createElement('div');
        commentTextElement.classList.add('commentText');
        commentTextElement.textContent = `"${comment.comment}"`;

        commentElement.appendChild(nameElement);
        commentElement.appendChild(commentTextElement);

        commentTableElement.appendChild(commentElement);
        console.log(commentTableElement);
    });
    commentDisplayContainer.appendChild(commentTableElement);
}

var adminCredentials = {
    username: '',
    password: ''
};
function approveComment(commentId) {
    // Use stored admin credentials to approve comment
    let formData = new FormData();
    formData.append('username', adminCredentials.username);
    formData.append('password', adminCredentials.password);
    formData.append('approve', commentId);


    fetch("process_admin_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log("Comment approved successfully");
            fetchComments(); // Refresh comments
        } else {
            console.error("Failed to approve comment:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
function rejectComment(commentId) {
    // Use stored admin credentials to approve comment
    let formData = new FormData();
    formData.append('username', adminCredentials.username);
    formData.append('password', adminCredentials.password);
    formData.append('reject', commentId);


    fetch("process_admin_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log("Comment rejected successfully");
            fetchComments(); // Refresh comments
        } else {
            console.error("Failed to reject comment:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
function fetchComments() {
    let formData = new FormData();
    formData.append('username', adminCredentials.username);
    formData.append('password', adminCredentials.password);
    closePopUp();
    fetch("process_admin_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            createCommentsElement(data.data);
        } else {
            console.error("Failed to fetch comments:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
function fetchInitialComments() {
    let formData = new FormData();
    formData.append('username', "guest");
    formData.append('password', "Romans8:28");
    fetch("process_admin_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            createCommentsDisplayElement(data.data);
        } else {
            console.error("Failed to fetch comments:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    fetch("process_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        commentResult.innerHTML = data;
    })
    .catch(error => {
        console.error("Error:", error);
    });
});



adminLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    console.log(formData);
    fetch("process_admin_form.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        const data = JSON.parse(text);
        if (data.status === 'success') {

            adminCredentials.username = formData.get('username');
            adminCredentials.password = formData.get('password');
            createCommentsElement(data.data);
        } else {
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});





var closePopUp = function(element) {
    popUpContainerElement.innerHTML = "";
    console.log("Pop Down");
    commentDisplayContainer.innerHTML = "";
    currentPopUp = false;
}
var onHowToPlay = function() {
    console.log(currentPopUp);
    
    if(currentPopUp !== howToPopUpElement) {
        popUpContainerElement.innerHTML = "";
        commentDisplayContainer.innerHTML = "";
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
        popUpContainerElement.innerHTML = "";
        commentDisplayContainer.innerHTML = "";
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
        commentDisplayContainer.innerHTML = "";
        fetchInitialComments();
        commentPopUpElement.appendChild(exitButtonElement);
        popUpContainerElement.appendChild(commentPopUpElement);
        popUpContainerElement.appendChild(commentDisplayContainer);
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
        commentDisplayContainer.innerHTML = "";
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
        commentDisplayContainer.innerHTML = "";
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
