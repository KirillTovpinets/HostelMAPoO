<?php 
	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die ("Ошибка подключения к базе данных: " . mysqli_connect_error());

	$login = $_POST["login"];
	$password = $_POST["pass"];

	$user = $mysql->query("SELECT * FROM Users WHERE login = '$login' AND password = '$password'") or die ("Ошибка выполнения запроса: " . mysqli_error());

	if($user->{"num_rows"} == 1){
		$_SESSION["login"] = $login;
		header("Location: ". $basePath."main.html");
	}else{
		header("Location: ". $basePath. "index.html?status=0");
	}

 ?>