<?php

$name = $_POST['name1'];
$phone = $_POST['Phone'];
$email = $_POST['Email'];
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email:' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

// $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

// if ($sendToTelegram) {
//   header('Location: submitting.html');
// } else {
//   echo "Error";
// }
// ?>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = filter_input(INPUT_POST, 'name1', FILTER_SANITIZE_STRING);
    $phone = filter_input(INPUT_POST, 'Phone', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'Email', FILTER_SANITIZE_EMAIL);

  
    $to = 'info@viksel.me';
    $subject = 'Запрос на получение предложения';
    $message = "Имя: {$firstName}\nТелефон: {$phone}\nEmail: {$email}";
    $headers = [
        'From' => 'noreply@example.com',
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion()
    ];

    // Функция mail для отправки письма
    if (mail($to, $subject, $message, $headers)) {
        // Перезагрузка страницы после успешной отправки
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit;
    } else {
        echo 'Произошла ошибка при отправке сообщения.';
    }
}
?>