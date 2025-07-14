<?php
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

header('Content-Type: application/json');

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "Veuillez remplir tous les champs correctement."
        ]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Paramètres SMTP
        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME'];
        $mail->Password = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];
        $mail->Port = $_ENV['MAIL_PORT'];

        $mail->CharSet = 'UTF-8';

        $mail->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);
        $mail->addAddress($_ENV['MAIL_USERNAME']);

        $mail->isHTML(true);
        $mail->Subject = "Nouveau message de contact de $name";
        $mail->Body = "
            <h2>Message de contact</h2>
            <p><strong>Nom:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();

        echo json_encode([
            "success" => true,
            "message" => "Merci, votre message a bien été envoyé."
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Erreur d’envoi du message : {$mail->ErrorInfo}"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Requête invalide."
    ]);
}
