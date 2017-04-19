<?php
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);
	$search = $_POST["info"];

	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения: " . mysqli_connect_error());
	$mysql->query("SET NAMES utf8");

	$workPeople = array();

	switch ($search) {
		case 'workplace':{
			$resultWorks = $mysql->query("SELECT * FROM work_place") or die ("Ошибка выполения запроса: " . mysqli_error($mysql));
			while ($resultObj = $resultWorks->fetch_assoc()) {
				$total = array();
				$placeId = $resultObj['id'];
				$title = $resultObj["title"];
				$result = $mysql->query("SELECT * FROM visitor WHERE work_place = $placeId");
				while ($row = $result->fetch_assoc()) {
					array_push($total, $row);		
				}
				$workPeople[$title] = $total;
			}
			break;
		}
		case 'appointment':{
			$result = $mysql->query("SELECT * FROM appointment") or die ("Ошибка выполения запроса: " . mysqli_error($mysql));
			while ($resultObj = $result->fetch_assoc()) {
				$total = array();
				$appId = $resultObj["id"];
				$appTitle = $resultObj["title"];
				$resultPeople = $mysql->query("SELECT * FROM visitor  WHERE appointment = $appId");
				while ($row = $resultPeople->fetch_assoc()) {
					array_push($total, $row);
				}
				$workPeople[$appTitle] = $total;
			}
			break;
		}
		case 'nationality':{
			$result = $mysql->query("SELECT * FROM nationality") or die ("Ошибка выполения запроса: " . mysqli_error($mysql));
			while ($resultObj = $result->fetch_assoc()) {
				$total = array();
				$nationalityId = $resultObj["id"];
				$nationalityTitle = $resultObj["title"];
				$resultPeople = $mysql->query("SELECT * FROM visitor  WHERE Nationality = $nationalityId");
				while ($row = $resultPeople->fetch_assoc()) {
					array_push($total, $row);
				}
				$workPeople[$nationalityTitle] = $total;
			}
			break;
		}
		default:{
			$result = null;
			break;
		}
	}
	echo json_encode($workPeople);
?>