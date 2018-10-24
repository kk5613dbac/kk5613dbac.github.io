<?php

function GetSelectionItems($db, string $sql) {
	
	if ($result = $db->query($sql)) {
		
		return $result->fetch_all(MYSQLI_NUM);
		
	}
	
	$result->free();
	
}

$mysqli = new mysqli('localhost', 'root', 'administrator');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

$db_selected = $mysqli->select_db('会計');
if (!$db_selected){
    die('データベース選択失敗です。'.mysqli_error());
}

$items = json_encode(GetSelectionItems($mysqli, 'select 口座名, 残高 from 口座 order by 口座ID asc'), JSON_UNESCAPED_UNICODE);

if ($items) {
	
	echo $items;
	
}

$close_flag = $mysqli->close();

if (!$close_flag){
    print('<p>切断失敗です。</p>');
}

?>