<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Creating local variables to hold form data
    $comment = isset($_POST['comment']) ? htmlspecialchars(trim($_POST['comment'])) : '';
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    // Validate that none of the fields are empty
    if (!empty($comment)) {
        $to = 'simonsooter300@gmail.com'; // Replace with your email address
        $subject = 'New Form Submission';
        $message = "Name: $name\n Comment:\n$comment";


        // Send the email
        if (mail($to, $subject, $message)) {
            echo "Your message has been sent.";
        } else {
            echo "There was a problem sending your message.";
        }
    } else {
        echo "All fields are required.";
    }
}
?>
