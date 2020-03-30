<?php

require_once("settings.php");
$mysql = new mysqli($servername, $username, $password, $dbname);

if ($mysql->connect_error) {
    die("Connection failed: " . $mysql->connect_error);
}

// Functions
function checkEmail($field)
{
    $field = filter_var(trim($field), FILTER_SANITIZE_EMAIL);
    
    if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
        return $field;
    }
    return FALSE;
}

function checkString($field)
{
    $field = filter_var(trim($field), FILTER_SANITIZE_STRING);

    if(!empty($field))
    {
        return $field;
    }
    return FALSE;
}

// Main Code
if($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $input = json_decode($_POST["inputs"]);

    $firstName   = checkString($input[0]->value);
    $lastName    = checkString($input[1]->value);
    $email       = checkEmail($input[2]->value);
    $userName    = checkString($input[3]->value);
    $password    = checkString($input[4]->value);
    $confirmPass = checkString($input[5]->value);

    if($firstName == FALSE || $lastName == FALSE || $email == FALSE || $userName == FALSE || $password == FALSE || $confirmPass == FALSE)
    {
        header("HTTP/1.1 406 Not Acceptable");
        header("Content-Type: application/json; charset=UTF-8");
        $mysql->close();
        die();
    }

    // Check if data already inside
    $sql = "SELECT `email`, `user_name` FROM `users` LIMIT 0,1";
    $result = $mysql->query($sql);

    if ($result->num_rows > 0) {
        header("HTTP/1.1 403 Forbidden");
        header("Content-Type: application/json; charset=UTF-8");
        $mysql->close();
        die();
    }

    // Add Data To MySQL Table
    $sql = "INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `user_name`, `password`) 
            VALUES (NULL, '$firstName', '$lastName', '$email', '$userName', '$password')";
    
    $mysql->query($sql);
    $mysql->close();
    

    // Return HTTP Status Code
    header("HTTP/1.1 200 OK");
    header("Content-Type: application/json; charset=UTF-8");
    die();
}