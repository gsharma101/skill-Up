<?php
include("connection.php");

$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$fname = $mydata['f_name'];
$lname = $mydata['l_name'];
$email = $mydata['emailAdd'];
$skills = json_encode($mydata['skills']);

if (!empty($fname) && !empty($lname) && !empty($email) && !empty($skills)) {
    $sql = "INSERT INTO users(fname,lname,email,skills)VALUES ('$fname','$lname','$email','$skills')";
    if($conn->query($sql) == TRUE){
        echo 'Successfully added';
    }else{
        echo 'Unable to save data';
    }
}else{
    echo "All fields are required";
}
?>