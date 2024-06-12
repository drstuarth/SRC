<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["Name"]));
    $email = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["PhoneNumber"]));
    $subject = strip_tags(trim($_POST["Subject"]));
    $message = trim($_POST["Message"]);

    if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor completa todos los campos y usa un correo válido.";
        exit;
    }

    $recipient = "drstuarthgonz@gmail.com";
    $email_subject = "Nuevo contacto de: $name";
    $email_body = "Has recibido un nuevo mensaje de tu formulario de contacto.\n\n".
                  "Nombre: $name\n".
                  "Email: $email\n".
                  "Teléfono: $phone\n".
                  "Asunto: $subject\n".
                  "Mensaje:\n$message\n";

    $headers = "From: $name <$email>";

    if (mail($recipient, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo "Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Oops! Algo salió mal y no pudimos enviar tu mensaje.";
    }
} else {
    http_response_code(403);
    echo "Hubo un problema con tu envío, inténtalo de nuevo.";
}
?>
