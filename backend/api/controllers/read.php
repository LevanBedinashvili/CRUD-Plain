<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Employee.php';

$database = new Database();
$db = $database->connect();

$employee = new Employee($db);
$stmt = $employee->readAll();
$employees = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($employees);
?>
