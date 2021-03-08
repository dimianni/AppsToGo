<?php

// My email
$siteOwnersEmail = 'dmytro.anikin@gmail.com';
// $siteOwnersEmail = 'info@dvizh.studio';

if ($_POST) {

    $name = trim(stripslashes($_POST['Name']));
    $email = trim(stripslashes($_POST['Email']));
    $tel = trim(stripslashes($_POST['Phone']));
    $contact_message = trim(stripslashes($_POST['Message']));

	// Check Name
	// Whether all characters are alphabetic
    if (!ctype_alpha($name) or strlen($name) < 2 ) {
        $error['name'] = " Name ";
    }

	// Check Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error['email'] = " Email ";
    }

    // Check Phone
    if (!preg_match("/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/", $tel)) {
        $error['tel'] = " Phone ";
    }



    // Subject
    $subject = "Contact Form Submission";

    // Set Message
    $message .= "Name: " . $name . "<br />";
    $message .= "Email: " . $email . "<br />";
    $message .= "Phone: " . $tel . "<br />";

    $message .= "Message: <br />";
    $message .= $contact_message . "<br />";
    $message .= "<br /> ----- <br /> Пользователь связался с AppsToGo. <br />";

    // Set From: header
    $from = $name . " <" . $email . ">";

    // Email Headers
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    if (!$error) {

        ini_set("sendmail_from", $siteOwnersEmail); // for windows server
        $mail = mail($siteOwnersEmail, $subject, $message, $headers);

        if ($mail) {
            echo "OK";
        } else {
            echo "Oops something went wrong :( <br> Please try reloading the page.";
        }

    } # end if - no validation error

    else {

        $response = (isset($error['name'])) ? $error['name'] : null;
        $response .= (isset($error['email'])) ? $error['email'] : null;
        $response .= (isset($error['tel'])) ? $error['tel'] : null;

        echo $response;

    } # end if - there was a validation error

}
