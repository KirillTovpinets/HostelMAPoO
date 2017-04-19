<?php 
	ini_set("error_reporting", E_ALL);
	ini_set("display_errors", 1);
	include "config.php";
	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());
	$mysql->query("SET NAMES utf8");
	
	$NationalitiesObj = $mysql->query("SELECT * FROM nationality") or die ("Ошибка запроса: " . mysqli_error($mysql));
	
	$Nationalities = array();
	while ($row = $NationalitiesObj->fetch_assoc()) {
		array_push($Nationalities, $row);
	}

	$response = array();
	for ($i=0; $i < count($Nationalities) ; $i++) { 
		$NationalityId = $Nationalities[$i]["id"];
		$NationalityName = $Nationalities[$i]["title"];
		$numPeopleSql = $mysql->query("SELECT COUNT(*) AS NumPeople FROM visitor WHERE Nationality = $NationalityId") or die ("Ошибка запроса: " . mysqli_error($mysql));
		$numPeopleObj = $numPeopleSql->fetch_assoc();
		$numPeople = $numPeopleObj["NumPeople"];

		$response[$NationalityName] = $numPeople;
	}
	echo json_encode($response);
 ?>