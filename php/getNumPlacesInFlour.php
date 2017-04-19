<?php 
	ini_set("error_reporting", E_ALL);
	ini_set("display_errors", 1);
	include "config.php";
	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());

	$NumFlours = $mysql->query("SELECT MAX(etaz) AS NumFlours FROM k_mesto");
	$number = $NumFlours->fetch_assoc();

	$NumFlour = $number["NumFlours"];
	$response = array();
	for ($i=1; $i <= $NumFlour; $i++) { 
		$numbers = array();
		$numTotalPlaceObj = $mysql->query("SELECT COUNT(*) AS numTotal FROM k_mesto WHERE etaz = $i") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$numTotal = $numTotalPlaceObj->fetch_assoc();
		array_push($numbers, $numTotal);

		$numBusyPlaceObj = $mysql->query("SELECT COUNT(*) AS numBusy FROM k_mesto WHERE etaz = $i AND busy = 1") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$numBusy = $numBusyPlaceObj->fetch_assoc();
		array_push($numbers, $numBusy);

		$numFreePlaceObj = $mysql->query("SELECT COUNT(*) AS numFree FROM k_mesto WHERE etaz = $i AND busy = 0") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$numFree = $numFreePlaceObj->fetch_assoc();
		array_push($numbers, $numFree);

		$response[$i] = $numbers;
	}
	echo json_encode($response);
 ?>