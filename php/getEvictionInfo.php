<?php 
	ini_set("display_errors", 1);
	ini_set("error_reporting", LC_ALL);
	include "config.php";

	$minDate = date("Y-m-d", strtotime($minDate . ' + 10 days'));
	date_add($minDate, date_interval_create_from_date_string("10 days"));
	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());

	$array = array();
	$result = $mysql->query("SELECT date_finish, COUNT(date_finish) AS numVis FROM projivanie INNER JOIN k_mesto ON projivanie.id_k_mesto = k_mesto.id WHERE projivanie.date_finish < '$minDate' GROUP BY date_finish ORDER BY projivanie.date_finish DESC LIMIT 15") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));

	while ($row = $result->fetch_assoc()) {
		array_push($array, $row);
	}

	echo json_encode($array);
 ?>