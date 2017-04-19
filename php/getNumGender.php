<?php 
	ini_set("error_reporting", E_ALL);
	ini_set("display_errors", 1);
	include "config.php";
	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());

	$response = array();

	$numMaleResult = $mysql->query("SELECT COUNT(*) AS numMale FROM projivanie INNER JOIN visitor ON projivanie.id_visitor = visitor.id WHERE visitor.sex = 1") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
	$numMale = $numMaleResult->fetch_assoc();
	array_push($response, $numMale);

	$numFemaleObj = $mysql->query("SELECT COUNT(*) AS numFemale FROM projivanie INNER JOIN visitor ON projivanie.id_visitor = visitor.id WHERE visitor.sex = 2") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
	$numFemale = $numFemaleObj->fetch_assoc();
	array_push($response, $numFemale);

	echo json_encode($response);
 ?>