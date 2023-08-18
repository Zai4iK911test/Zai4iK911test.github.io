<?php
session_start();

$online_users = 0;

if(isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > 300) {
    session_unset();
    session_destroy();
}

if(isset($_SESSION['online_users'])) {
    $online_users = count($_SESSION['online_users']);
}

header('Content-Type: application/json');
echo json_encode(['online' => $online_users]);
?>
