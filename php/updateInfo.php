<?php 
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);
	include "config.php";
	function cleanFields( $elem ) {
		return strip_tags( $elem );
	}
	extract( array_map( 'cleanFields', $_POST ) );

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());
	$mysql->query("SET NAMES utf8");

	$appId = 0;
	if ($own_app != "") {
		$mysql->query("INSERT INTO appointment(title) VALUES ($own_app) ") or die("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$result = $mysql->query("SELECT MAX(id) AS LastApp FROM appointment") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$obj = $result->fetch_assoc();
		$appId = $obj["LastApp"];
	}else{
		$result = $mysql->query("SELECT * FROM appointment WHERE id = '$appoinment'") or die ("Ошибка выполнения запроса app: " . mysqli_error($mysql));
		$appObj = $result->fetch_assoc();
		$appId = $appObj["id"];
	}

	$nationId = 0;
	if ($own_nationality != "") {
		$mysql->query("INSERT INTO nationality(title) VALUES ('$nationality')") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$result = $mysql->query("SELECT MAX(id) AS LastId FROM nationality") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$maxIdObj = $result->fetch_assoc();
		$nationId = $maxIdObj["LastId"];
	}else{
		$result = $mysql->query("SELECT * FROM nationality WHERE id = '$nationality'") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));	
		$nationObj = $result->fetch_assoc();
		$nationId = $nationObj["id"];
	}

	$workId = 0;
	if ($own_place != "") {
		$workplaceStr = strtolower($own_place);
		$workplaceItems = explode(",", $workplaceStr);
		$title = $workplaceItems[0];
		$city = $workplaceItems[1];
		$region = $workplaceItems[2];
		$mysql->query("INSERT INTO work_place(title, city, region) VALUES ('$title', '$city', '$region')") or die("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$result = $mysql->query("SELECT MAX(id) AS Own_job FROM work_place") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$obj = $result->fetch_assoc();
		$workId = $obj["Own_job"];
	}else{
		$result = $mysql->query("SELECT id FROM work_place WHERE id = $workplace") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$Workplace = $result->fetch_assoc();
		$workId = $Workplace["id"];
	}

	$mysql->query("UPDATE visitor SET f_name = '$name', m_name = '$surname', surname = '$patername', date_birthday = '$birthday', appointment = '$appId', work_place = '$workId', passport_series = '$passport_series', passport_number = '$passport_number', personal_number = '$personal_number', date_issue = '$date_issue', Autority = '$authority', Registration_place = '$registration_place', Registration_adress = '$registration_address', Sex = '$sex', Nationality = '$nationId', tel_number = '$tel_number' WHERE id = '$PersonId'") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
 ?>