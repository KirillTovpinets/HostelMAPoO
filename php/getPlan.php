<?php
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);

	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения: " . mysqli_connect_error());

	$mysql->query("SET NAMES utf8");

	$NumFlours = $mysql->query("SELECT MAX(etaz) AS NumFlours FROM k_mesto");
	$number = $NumFlours->fetch_assoc();
	$Plans = $mysql->query("SELECT projivanie.id_k_mesto, k_mesto.busy, visitor.id, visitor.m_name, visitor.f_name, visitor.sex, visitor.surname, visitor.date_birthday, visitor.appointment, visitor.passport_series, visitor.passport_number, visitor.personal_number, visitor.date_issue, visitor.Autority, visitor.Registration_place, visitor.Registration_adress, visitor.tel_number, projivanie.date_start, projivanie.date_finish, appointment.title AS AppTitle, nationality.title AS nationalityTitle, work_place.title AS workTitle, work_place.city, work_place.region FROM projivanie INNER JOIN visitor ON projivanie.id_visitor =  visitor.id INNER JOIN nationality ON visitor.nationality = nationality.id INNER JOIN work_place ON visitor.work_place = work_place.id INNER JOIN k_mesto ON projivanie.id_k_mesto = k_mesto.id INNER JOIN appointment ON visitor.appointment = appointment.id") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));

	$flours = array();
	while ($row = $Plans->fetch_assoc()) {
		array_push($flours, $row);
	}
	array_push($flours, $number);
	//print_r($flours);

	echo json_encode($flours);
?>