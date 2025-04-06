<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Employee.php';

$data = json_decode(file_get_contents("php://input"), true);

$errors = [];

if (empty($data['first_name'])) $errors[] = 'First name is required';
if (empty($data['last_name'])) $errors[] = 'Last name is required';
if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($data['phone']) || !preg_match('/^\d{9,15}$/', $data['phone'])) $errors[] = 'Phone must be 9–15 digits';
if (empty($data['position'])) $errors[] = 'Position is required';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

$database = new Database();
$db = $database->connect();

$employee = new Employee($db);
$employee->first_name = htmlspecialchars($data['first_name']);
$employee->last_name = htmlspecialchars($data['last_name']);
$employee->email = htmlspecialchars($data['email']);
$employee->phone = htmlspecialchars($data['phone']);
$employee->position = htmlspecialchars($data['position']);

if ($employee->create()) {
    echo json_encode(["success" => "Employee created successfully"]);
} else {
    echo json_encode(["error" => "Failed to create employee"]);
}
?>
