<?php
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../models/Employee.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); 
    echo json_encode(['error' => 'Only DELETE method is allowed']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !is_numeric($data['id']) || $data['id'] <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid employee ID is required']);
    exit;
}

$database = new Database();
$db = $database->connect();

$employee = new Employee($db);
$employee->id = htmlspecialchars($data['id']);

if ($employee->delete()) {
    echo json_encode(["success" => "Employee deleted successfully"]);
} else {
    echo json_encode(["error" => "Failed to delete employee"]);
}
?>
