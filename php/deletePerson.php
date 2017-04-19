<?php 
	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());

	$PlaceId = $_GET["id"];

	$mysql->query("UPDATE k_mesto SET busy = 0 WHERE id = $PlaceId") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
	$mysql->query("DELETE FROM projivanie WHERE id_k_mesto = $PlaceId") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));

	mysqli_close($mysql);
	header("Location: /Andrey/PersonInfoFormWithRemove.html");
 ?>