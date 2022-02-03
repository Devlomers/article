<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->ar_title)
    && isset($data->meta_desc)
    && isset($data->date)
    && isset($data->description)
    && isset($data->user_name)
    && isset($data->image)
    && !empty(trim($data->ar_title))
    && !empty(trim($data->meta_desc))
    && !empty(trim($data->date))
    && !empty(trim($data->description))
    && !empty(trim($data->user_name))
    && !empty(trim($data->image))

) {
    $ar_title = mysqli_real_escape_string($db_conn, trim($data->ar_title));
    $meta_desc = mysqli_real_escape_string($db_conn, trim($data->meta_desc));
    $date = mysqli_real_escape_string($db_conn, trim($data->date));
    $description = mysqli_real_escape_string($db_conn, trim($data->description));
    $user_name = mysqli_real_escape_string($db_conn, trim($data->user_name));
    $image = mysqli_real_escape_string($db_conn, trim($data->image));
    
    $query = "INSERT INTO `article`(`ar_title`,`meta_desc`,`date`,`description`,`user_name`,`image`) VALUES('$ar_title','$meta_desc','$date','$description','$user_name','$image')";
    $insertUser = mysqli_query($db_conn, $query);
  
        if ($insertUser) {
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success" => 1, "msg" => "User Inserted.", "id" => $last_id]);
        } else {
            echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
        }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}