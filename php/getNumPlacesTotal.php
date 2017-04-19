<?php 
	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения: " . mysqli_connect_error());

	$result = $mysql->query("SELECT COUNT(*) AS NumberOfPlaces FROM k_mesto");
	$totalNumber = $result->fetch_assoc();

	$result = $mysql->query("SELECT COUNT(*) AS NumBusyPlaces FROM k_mesto WHERE busy = 1");
	$numBusy = $result->fetch_assoc();

	$result = $mysql->query("SELECT COUNT(*) AS NumFreePlaces FROM k_mesto WHERE busy = 0");
	$numFree = $result->fetch_assoc();

	
	$response = array();

	array_push($response, $totalNumber);
	array_push($response, $numBusy);
	array_push($response, $numFree);

	echo json_encode($response);
 ?>