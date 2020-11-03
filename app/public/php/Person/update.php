<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection


$stmt = $db->prepare(
  $sql = 'UPDATE PERSON
SET FirstName = ?, LastName = ?, Email = ?, DateOfBirth = ?, Gender = ?, Street = ?, Zip = ?, City = ?, State = ?, PrimaryPhone = ?, SecondaryPhone = ?, TertiaryPhone = ?, StartDate = ?, RadioNumber = ?, StationNumber = ?, Position = ?
WHERE personID = ?;'
);

$stmt->execute([
  $_POST['FirstName'],
  $_POST['LastName'],
  $_POST['Email'],
  $_POST['DateOfBirth'],
  $_POST['Gender'],
  $_POST['Street'],
  $_POST['Zip'],
  $_POST['City'],
  $_POST['State'],
  $_POST['PrimaryPhone'],
  $_POST['SecondaryPhone'],
  $_POST['TertiaryPhone'],
  $_POST['StartDate'],
  $_POST['RadioNumber'],
  $_POST['StationNumber'],
  $_POST['Position'],
  $_POST['PersonID']
]);

// If needed, get auto-generated PK from DB
// $pk = $db->lastInsertId();  // https://www.php.net/manual/en/pdo.lastinsertid.php

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it
header('HTTP/1.1 303 See Other');
header('Location: ../Person/');
