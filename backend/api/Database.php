<?php

Class Database {

    private static ?PDO $connection = null;

    private function _construct(){}

    public static function getConnection(): PDO {

        if(self::$connection == null) {
            $config = require _DIR_ . '/../config.php';
            self::$connection = new PDO($dsn, $config['username'], $config['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
        }
        return self::$connection;
    }

}

?>