<html>
    <head>
        <meta charset="UTF-8">
        <title>Старт</title>
    </head>
<?php
require_once 'login.php';//connect to db MySQL
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);

$query = "SELECT * FROM visitor";//создание и выполнение запроса
$result = $conn->query($query);
if (!$result) die ($conn-> error);

$rows = $result->num_rows;
for ($j = 0 ; $j < $rows ; ++$j)
{
$result->data_seek($j);
$row = $result->fetch_array(MYSQLI_ASSOC);
echo 'Имя: ' . $row['f_name'] . '<br>';
echo 'Фамилия: ' . $row['surname'] . '<br>';
echo 'Отчество: ' . $row['m_name'] . '<br>';
echo 'Дата рождения: ' . $row['date_birthday'] . '<br>';
}
$result->close();
$conn->close();

$query = "SELECT * FROM visitor";
$result = $conn->query($query);

?>
</html>

