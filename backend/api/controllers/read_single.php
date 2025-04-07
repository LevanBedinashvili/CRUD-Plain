<?php
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../models/Employee.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID is required']);
    exit;
}

$database = new Database();
$db = $database->connect();

$employee = new Employee($db);
$result = $employee->getSingle($_GET['id']);

if ($result) {
    echo json_encode($result);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Employee not found']);
}

?>