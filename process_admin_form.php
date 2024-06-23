<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST['username']) ? htmlspecialchars($_POST['username']) : '';
    $password = isset($_POST['password']) ? htmlspecialchars($_POST['password']) : '';

    $servername = "localhost";
    $dbname = "calcula_database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, name, comment, status FROM comments";
    $result = $conn->query($sql);

    $comments = array();

    if ($result->num_rows > 0) {
        // Fetch all rows as an associative array
        while($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        // Send the result as JSON
        echo json_encode(array('status' => 'success', 'data' => $comments));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'No comments found'));
    }

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close connection
    $conn->close();
}
