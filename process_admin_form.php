<?php
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $input = json_decode(file_get_contents('php://input'), true);
    // Database connection settings
    $servername = "localhost";
    $username = isset($_POST['username']) ? htmlspecialchars($_POST['username']) : '';
    $password = isset($_POST['password']) ? htmlspecialchars($_POST['password']) : '';
   // $username = "calcula_admin";
   // $password = "Vorgrastao6:12";
    $dbname = "calcula_database";

    // Attempt to connect to MySQL database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
    }

    // Check if the 'approve' parameter is set in POST data
    if (isset($_POST['approve'])) {
        $commentId = intval($_POST['approve']);
        var_dump($commentId);
        // Prepare an update statement to approve the comment
        $stmt = $conn->prepare("UPDATE comments SET status = 'approved' WHERE id = ?");
        $stmt->bind_param("i", $commentId);

        // Execute the update statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update comment status']);
        }

        // Close the prepared statement
        $stmt->close();
    } else if (isset($_POST['reject'])) {
        $commentId = intval($_POST['reject']);
        var_dump($commentId);
        // Prepare an update statement to approve the comment
        $stmt = $conn->prepare("UPDATE comments SET status = 'rejected' WHERE id = ?");
        $stmt->bind_param("i", $commentId);

        // Execute the update statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update comment status']);
        }

        // Close the prepared statement
        $stmt->close();
    } else {

        // Select all comments from the database
        $sql = "SELECT id, name, comment, status FROM comments";
        $result = $conn->query($sql);

        // Check if there are any comments found
        if ($result->num_rows > 0) {
            $comments = array();

            // Fetch all comments as an associative array
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }

            // Return the comments as JSON response
            echo json_encode(['status' => 'success', 'data' => $comments]);
        } else {
            // Return an error message if no comments are found
            echo json_encode(['status' => 'error', 'message' => 'No comments found']);
        }

        // Do not close the connection here to keep it open for future operations
    }

    // Close the MySQL connection after all operations are done
    $conn->close();
} else {
    // Return an error if the request method is not POST
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
