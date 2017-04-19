<?php 
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);
	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения к базе данных: " . mysquli_connect_error());
	$mysql->query("SET NAMES utf8");

	$personId = $_GET["personId"];

	$result = $mysql->query("SELECT * FROM visitor WHERE id = $personId");
	$personInfo = $result->fetch_assoc();
	$itemId = 0;
	if($_GET["id"] == 1){
		$result = $mysql->query("SELECT * FROM work_place");
		$itemId = $personInfo["work_place"];	
	}else if($_GET["id"] == 2){
		$result = $mysql->query("SELECT * FROM appointment");
		$itemId = $personInfo["appointment"];	
	}else if($_GET["id"] == 3){
		$result = $mysql->query("SELECT * FROM nationality");	
		$itemId = $personInfo["Nationality"];
	}
	else if($_GET["id"] == 4){
		$result = $mysql->query("SELECT * FROM sex");	
		$itemId = $personInfo["Sex"];
	}
	else if($_GET["id"] == 5){
		$result = $mysql->query("SELECT visitor.id, visitor.m_name, visitor.f_name, visitor.surname, visitor.date_birthday, visitor.passport_series, visitor.sex, visitor.passport_number, visitor.personal_number, visitor.date_issue, visitor.Autority, visitor.Registration_place, visitor.Registration_adress, visitor.tel_number FROM visitor WHERE visitor.id = $personId") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$personInfo = $result->fetch_assoc();
		$result = $mysql->query("SELECT date_start, date_finish FROM projivanie WHERE id_visitor = $personId") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$projInfo = array();
		if ($result->{"num_rows"} != 0) {
			$projInfo = $result->fetch_assoc();
			$personInfo["date_start"] = $projInfo["date_start"];
			$personInfo["date_finish"] = $projInfo["date_finish"];
		}else{
			$personInfo["date_start"] = 'undefined';
			$personInfo["date_finish"] = 'undefined';
		}
		
		echo json_encode($personInfo);
		//echo $personId;
		return;
	}

	$select = "";
	while ($temp = $result->fetch_assoc()) {
		foreach ($temp as $key => $value) {
			if ($key == 'id') {
				$select .= "<option value='$value'";
				if($value == $itemId){
					$select .= " selected>";
				}else{
					$select .= ">";
				}
			}else{
				$select .= "$value</option>";	
			}
			
		}
	}

	echo $select;
?>