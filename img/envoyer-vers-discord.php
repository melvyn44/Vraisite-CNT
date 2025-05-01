<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Configuration Webhook Discord
    $webhookUrl = 'https://discord.com/api/webhooks/1367257700844699658/Z4lNvJUrCfRX3kfOQRIsgoqGG3lyQDsZ_OX8AP_AJbllS-srOtroqOop7gNWT7D0j0xV'; // Remplace ce lien par ton vrai webhook

    // Récupère les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $motivation = htmlspecialchars($_POST['motivation']);

    // Vérifie si un fichier a été téléchargé
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $cvTmpPath = $_FILES['file']['tmp_name'];
        $cvName = $_FILES['file']['name'];
        $cvMime = mime_content_type($cvTmpPath);

        // Vérifie que c'est bien un fichier PDF
        if ($cvMime === 'application/pdf') {
            // Crée le contenu du message
            $message = "**Nouvelle candidature reçue :**\n\n" .
                       "**Nom :** $name\n" .
                       "**Email :** $email\n" .
                       "**Téléphone :** $phone\n" .
                       "**Motivation :**\n$motivation";

            // Envoie la candidature via cURL à Discord
            $curl = curl_init($webhookUrl);

            $postData = [
                'content' => $message,
                'file' => new CURLFile($cvTmpPath, $cvMime, $cvName)
            ];

            curl_setopt_array($curl, [
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POSTFIELDS => $postData,
            ]);

            $response = curl_exec($curl);
            $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);

            // Vérifie la réponse de Discord
            if ($response === false || $httpCode >= 400) {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Erreur Discord : ' . curl_error($curl)]);
            } else {
                echo json_encode(['success' => true, 'message' => 'Candidature envoyée avec succès !']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Seuls les fichiers PDF sont autorisés.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement du fichier.']);
    }
}
?>
