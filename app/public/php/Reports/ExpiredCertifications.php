<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM PERSONCERTIFICATION PC, PERSON P, CERTIFICATION C WHERE (YEAR(CURDATE()) - YEAR(PC.DateAcquired) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(PC.DateAcquired, '%m%d'))) > C.ExpirationPeriod AND P.PersonID = PC.PersonID AND C.CertificationID = PC.CertificationID;'
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$user = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($user, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;