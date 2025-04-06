<?php
require_once 'cors.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        require_once 'controllers/read.php';
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
