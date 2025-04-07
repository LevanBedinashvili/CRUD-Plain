<?php
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../models/Employee.php';

$data = json_decode(file_get_contents("php://input"), true);
$data = array_map('trim', $data);

$errors = [];
$fields = [
    'first_name' => '/^[a-zA-Z\s]+$/',
    'last_name'  => '/^[a-zA-Z\s]+$/',
    'email'      => FILTER_VALIDATE_EMAIL,
    'phone'      => '/^\d{9,15}$/',
    'position'   => '/^[a-zA-Z\s]+$/',
];

foreach ($fields as $field => $rule) {
    if (!isset($data[$field]) || $data[$field] === '') {
        $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
        continue;
    }

    if ($rule === 'numeric' && !is_numeric($data[$field])) {
        $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' must be numeric';
    } elseif (is_string($rule) && !preg_match($rule, $data[$field])) {
        $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' is invalid';
    } elseif (is_int($rule) && !filter_var($data[$field], $rule)) {
        $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' is invalid';
    }
}

$allowed_fields = array_keys($fields);
$extra_fields = array_diff(array_keys($data), $allowed_fields);
if (!empty($extra_fields)) {
    $errors[] = 'Unexpected fields provided: ' . implode(', ', $extra_fields);
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

$database = new Database();
$db = $database->connect();

$employee = new Employee($db);

$employee->first_name = htmlspecialchars($data['first_name'], ENT_QUOTES, 'UTF-8');
$employee->last_name  = htmlspecialchars($data['last_name'], ENT_QUOTES, 'UTF-8');
$employee->email      = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$employee->phone      = htmlspecialchars($data['phone'], ENT_QUOTES, 'UTF-8');
$employee->position   = htmlspecialchars($data['position'], ENT_QUOTES, 'UTF-8');

if ($employee->create()) {
    http_response_code(201);
    echo json_encode(["success" => "Employee created successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to create employee"]);
}
?>
