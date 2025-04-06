<?php
class Database {
    private $host = "localhost";
    private $db_name = "employee_crud";
    private $username = "root";
    private $password = "";
    public $conn;

    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name};charset=utf8",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo json_encode(["error" => "Connection error: " . $e->getMessage()]);
            exit;
        }

        return $this->conn;
    }
}
?>