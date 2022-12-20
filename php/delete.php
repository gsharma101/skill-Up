<?php
include("connection.php");

$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['sid'];

if (!empty($id)) {
    $sql = "DELETE FROM users WHERE id={$id}";
    if($conn->query($sql) == TRUE){
        echo 'Successfully Deleted!';
    }else{
        echo 'Unable to save data';
    }
}else{
    echo "All fields are required";
}
?>