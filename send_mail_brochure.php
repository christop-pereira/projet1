<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Charger les variables d’environnement
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userEmail = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);

    if (!$userEmail) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host       = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['MAIL_USERNAME'];
        $mail->Password   = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];
        $mail->Port       = $_ENV['MAIL_PORT'];

        $mail->CharSet = 'UTF-8';

        // Expéditeur et destinataire
        $mail->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);
        $mail->addAddress($_ENV['MAIL_FROM_ADDRESS']); // Tu reçois le mail

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = 'Brochure téléchargée depuis le site';
        $mail->Body    = "L'adresse <strong>$userEmail</strong> a demandé la brochure depuis le site web.";

        $mail->send();


        echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l’envoi de l’email.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
