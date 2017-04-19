<?php
	include "config.php";
	$search = $_POST["search"];
	$search = addslashes($search);
	$search = htmlspecialchars($search);
	$search = stripcslashes($search);

	if($search == ""){
		echo "<tr><td colspan='4' align='center'>Начните вводить запрос</td></tr>";
		return;
	}

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения: " . mysqli_connect_error());
	$mysql->query("SET NAMES utf8");

	$result = $mysql->query("SELECT * FROM visitor WHERE MATCH(f_name, m_name, surname) AGAINST('$search') ORDER BY m_name") or die ("Ошибка выполения запроса: " . mysqli_error($mysql));

	$html = "";
	if($result->{"num_rows"} > 0){
		while ($resultObj = $result->fetch_assoc()) {
			$fname = $resultObj["f_name"];
			$mname = $resultObj["m_name"];
			$surname = $resultObj["surname"];
			$PersonId = $resultObj["id"];
			$date_birthday = $resultObj["date_birthday"];
			$html .= "<tr class='clickable-row' data-src='#PersonInfo-$PersonId' data-fancybox><td>$mname</td><td>$fname</td><td>$surname</td><td>$date_birthday</td></tr>";			
		}
		echo $html;
	}else{
		echo "<tr><td colspan='4' align='center'>Нет совпадений</td></tr>";
	}

?>