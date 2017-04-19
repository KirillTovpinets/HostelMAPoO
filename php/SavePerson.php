<?php 
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);
	if($_POST["name"] != ""){
		include "config.php";

		$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения: " . mysqli_connect_error());

		$mysql->query("SET NAMES utf8");

		$name = $_POST["name"];
		$fname = $_POST["surname"];
		$patername = $_POST["patername"];
		$birthday = $_POST["birthday"];
		$passportSeries = $_POST["passport_series"];
		$passportNumber = $_POST["passport_number"];
		$dateIssue = $_POST["date_issue"];
		$personalNumber = $_POST["personal_number"];
		$authority = $_POST["authority"];
		$registrationPlace = $_POST["registration_place"];
		$registrationAddress = $_POST["registration_address"];
		$sex = $_POST["sex"];
		$placeId = $_POST["placeId"];
		$PhoneNumber = $_POST["mobile"];

		$result = $mysql->query("SELECT etaz, blok, komnata FROM k_mesto WHERE id = $placeId") or die ("Ошибка выполнения запроса (SELECT etaz, blok, komnata): " . mysqli_error($mysql));
		$placeInfo = $result->fetch_assoc();

		$sameFlour = $placeInfo['etaz'];
		$sameBlock = $placeInfo['blok'];
		$samePlace = $placeInfo['komnata'];

		$result = $mysql->query("SELECT id FROM k_mesto WHERE etaz=$sameFlour AND blok=$sameBlock AND komnata='$samePlace' AND busy=1") or die ("Ошибка выполнения запроса (SELECT id FROM k_mesto): " . mysqli_error($mysql));

		//Проверяем, есть ли в комнате жильцы другого пола
		while ($row = $result->fetch_assoc()) {
			$currentPlaceId = $row['id'];
			$otherResident = $mysql->query("SELECT id_visitor FROM projivanie WHERE id_k_mesto=$currentPlaceId") or die ("Ошибка выполнения запроса (SELECT LAST(id_visitor) AS CurrentResident): " . mysqli_error($mysql));;
			if ($otherResident->{"num_rows"} > 1) {
				$resident = $otherResident->fetch_assoc();
				$residentId = $resident['id_visitor'];
				$neibourSex = $mysql->query("SELECT sex FROM visitor WHERE id = $residentId") or die ("Ошибка выполнения запроса (SELECT sex FROM visitor): " . mysqli_error($mysql));
				$neibourSexObj = $neibourSex->fetch_assoc();
				if($neibourSexObj["sex"] != $sex){
					echo "500";
					echo $residentId;
					echo $residentId;
					echo "sex[] = " . $neibourSexObj["sex"] . " sex = $sex";
					mysqli_close($mysql);
					return;
				}
			}
		}

		if($_POST["own_app"] != ""){
			$appointment = strtolower($_POST["own_app"]);
			$mysql->query("INSERT INTO appointment (title) VALUES ('$appointment')")  or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
			$result = $mysql->query("SELECT MAX(id) AS LastId FROM appointment")  or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
			$appointmentWithId = $result->fetch_assoc();
			$appointmentId = $appointmentWithId["LastId"];
		}else{
			$appointmentId = $_POST["appoinment"];
		}
		
		if($_POST["own_place"] != ""){
			$workplace = strtolower($_POST["own_place"]);
			$workplaceItems = explode(",", $workplace);
			$title = $workplaceItems[0];
			$city = $workplaceItems[1];
			$region = $workplaceItems[2];
			$mysql->query("INSERT INTO work_place (title, city, region) VALUES ('$title', '$city', '$region')") or die ("Ошибка выполнения запроса: " . mysqli_error($mysql). " $title, $city, $region");
			$result = $mysql->query("SELECT MAX(id) AS LastId FROM work_place")   or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
			$workplaceWithId = $result->fetch_assoc();
			$workplaceId = $workplaceWithId["LastId"];
		}else{
			$workplaceId = $_POST["workplace"];
		}

		$mysql->query("UPDATE k_mesto SET busy = 1 WHERE id = $placeId");
		if($_POST["own_nationality"] != ""){
			$nationality = ucfirst($_POST["own-nationality"]);
			$mysql->query("INSERT INTO nationality (title) VALUES ('$nationality')")  or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
			$result = $mysql->query("SELECT MAX(id) AS LastId FROM nationality")  or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));

			$nationalityWithId = $result->fetch_assoc();
			$nationalityId = $nationalityWithId["LastId"];

		}else{
			$nationalityId = $_POST["nationality"];
		}
		
		$dateStart = $_POST["date_start"];
		$dateFinish = $_POST["date_finish"];

		$result = $mysql->query("SELECT * FROM visitor WHERE f_name='$name' AND m_name='$fname' AND surname='$patername'") or die ("Ошибка выполнения запроса" . mysqli_error($mysql));

		if($result->{"num_rows"} > 0){
			$visitorWithId = $result->fetch_assoc();
			$visitorId = $visitorWithId["id"];

			$result = $mysql->query("SELECT * FROM projivanie WHERE id_visitor = $visitorId") or die ("Ошибка выполнения запроса" . mysqli_error($mysql));
			if($result->{"num_rows"} > 0){
				echo "500";
				mysqli_close($mysql);
				return;
			}
			$mysql->query("INSERT INTO projivanie (date_start, id_visitor, id_k_mesto, date_finish, payment, note) VALUES ('$dateStart','$visitorId','$placeId','$dateFinish','0','')")  or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
			mysqli_close($mysql);
			return;
		}
		$mysql->query("INSERT INTO visitor (f_name, m_name, surname, date_birthday, appointment, work_place,
                              passport_series, passport_number, personal_number, date_issue, Autority, Registration_place, 
                              Registration_adress, Sex, Nationality, tel_number) VALUES 
                              ('$name', '$fname', '$patername', '$birthday', '$appointmentId', 
                              '$workplaceId', '$passportSeries', '$passportNumber', '$personalNumber','$dateIssue', 
                              '$authority', '$registrationPlace', '$registrationAddress', '$sex', '$nationalityId', '$PhoneNumber')")
                                or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		$result = $mysql->query("SELECT MAX(id) AS LastId FROM visitor");
		$visitorWithId = $result->fetch_assoc();
		$visitorId = $visitorWithId["LastId"];
		echo $visitorId;
		
		$mysql->query("INSERT INTO projivanie (date_start, id_visitor, id_k_mesto, date_finish, payment, note) VALUES ('$dateStart','$visitorId','$placeId','$dateFinish','0','')")  or die ("Ошибка выполнения запроса: " . mysqli_error($mysql));
		mysqli_close($mysql);
	}
?>