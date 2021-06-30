<?php 

   
// if ( ! defined( 'ABSPATH' ) ) {
// exit; // Exit if accessed directly.
// }

$to = "contacto@acabret.com";


if(!isset($_POST['nombre']) || !isset($_POST['email']) || !isset($_POST['mensaje'])){
    http_response_code(400);
    echo json_encode(array("status" => 400,
                            "message" => "missing data"));
    exit;
}

$nombre = test_input($_POST['nombre']);
$email = test_input($_POST['email']);
$mensaje = test_input($_POST['mensaje']);

$subject = "Contact Form - " . $nombre;

$body = ""; 
$body .= "De: ".$nombre. "\n";
$body .= "Email: ".$email. "\n";
$body .= "Mensaje: ".$mensaje. "\n";

// mail($to, $subject, $body);

echo json_encode(array("datos ingresado" => array("nombre" => $nombre,
"email" => $email,
"mensaje" => $mensaje),
"email body" => $body));

// echo json_encode("default response");
exit;



function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }


    //  echo json_encode(array("status" => 201,
    //                         "mensaje" => "email sent"));
   


    // http_response_code(201);



?>