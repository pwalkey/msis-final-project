<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM PERSON';
$vars = [];

if (isset($_GET['pk'])) {
    // This is an example of a parameterized query
    $sql = 'SELECT * FROM Person WHERE PersonID = ?';
    $vars = [ $_GET['pk'] ];
  }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$person = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($person, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
