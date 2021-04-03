<?php 

ignore_user_abort(TRUE);


if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$name = $_POST['first_name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];

//Validate first
if(empty($name)||empty($visitor_email)) 
{
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

$from = "digidoctorml@gmail.com"; // this is your Email address
$to = $_POST['email']; // this is the sender's Email address
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$subject2 = "Copy of your form submission";
$headers2 = "From: " . $to;
$comment = $_POST['message'];
$message2 = nl2br("Hello, " . $first_name . " " . $last_name . ". 
                  \n Thank you for the feedback you recently submitted to DigiDoctor. Here is a copy of your form submission:
                  \n First Name: " . $first_name . 
                  "\n Last Name: " . $last_name . 
                  "\n Email: " . $to . 
                  "\n Message: " . $comment .
                  "\n\n We thank you for your feedback and will get back to you as soon as possible.");

header('Location: thank-you.html');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer;
$mail->IsSMTP();
$mail->Mailer = "smtp";
$mail->SMTPDebug  = 1;  
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "tls://smtp.gmail.com";
$mail->Username   = "digidoctorml@gmail.com";
$mail->Password   = "DigiDoctor@123";
$mail->IsHTML(true);
$mail->AddAddress($to, $first_name+" "+$last_name);
$mail->AddAddress($from);
$mail->SetFrom($from, "DigiDoctor");
$mail->AddReplyTo($from, "DigiDoctor");
$mail->Subject = $subject2;
$mail->Body = $message2;

$mail->Send();



// echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
// You can also use header('Location: thank_you.php'); to redirect to another page.

function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
?>