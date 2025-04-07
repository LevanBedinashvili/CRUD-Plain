<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);


require_once 'cors.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            require_once 'controllers/read_single.php'; 
        } else {
            require_once 'controllers/read.php'; 
        }
        break;
    case 'POST':
        require_once 'controllers/create.php';
        break;

    case 'PUT':
        require_once 'controllers/update.php';
        break;

    case 'DELETE':
        require_once 'controllers/delete.php';
        break;

    default:
        echo json_encode(['error' => 'Unsupported HTTP method']);
        break;
}

?>