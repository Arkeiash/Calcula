<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $comment = isset($_POST['comment']) ? htmlspecialchars($_POST['comment']) : '';

    $servername = "127.0.0.1:3306";
    $username = "u651343035_calcula_admin";
    $password = "Vorgrastao6:12";
    $dbname = "u651343035_Calcula_DB";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "INSERT INTO comments (name, comment) VALUES ('$name', '$comment')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close connection
    $conn->close();


}
