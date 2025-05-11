<?php
// Vérification que le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation des données
    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Destinataire de l'email (l'email de l'entreprise)
        $to = "info@top-powerservice.ch";
        // Sujet de l'email
        $subject = "Nouveau message de contact de $name";

        // Construction du message
        $body = "
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom :</strong> $name</p>
            <p><strong>Email :</strong> $email</p>
            <p><strong>Message :</strong><br>$message</p>
        ";

        // En-têtes de l'email pour le format HTML
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Envoi de l'email
        if (mail($to, $subject, $body, $headers)) {
            // Si l'envoi est réussi, afficher un pop-up avec JavaScript
            echo "<script type='text/javascript'>
                    alert('Merci, votre message a bien été envoyé.');
                    window.location.href = 'index.html'; // Optionnel : redirige vers la page d'accueil après l'envoi
                  </script>";
        } else {
            // En cas d'échec d'envoi
            echo "<script type='text/javascript'>
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.');
                    window.location.href = 'index.html'; // Optionnel : redirige vers la page d'accueil après l'erreur
                  </script>";
        }
    } else {
        // Si les champs sont invalides
        echo "<script type='text/javascript'>
                alert('Veuillez vérifier les informations que vous avez soumises.');
                window.location.href = 'index.html'; // Redirige vers le formulaire
              </script>";
    }
} else {
    // Si la méthode n'est pas POST, redirige vers le formulaire
    header("Location: index.html");
    exit();
}
?>
