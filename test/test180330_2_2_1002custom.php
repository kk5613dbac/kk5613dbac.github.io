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

$items = json_encode(GetSelectionItems($mysqli, 'select 収支ID, 日付, 分類名, 項目, 支出, 収入, 収支区分名, 費目名, 内訳名, 口座名 from 収支 inner join 分類 on 収支.分類ID = 分類.分類ID inner join 内訳 on 収支.内訳ID = 内訳.内訳ID and 収支.費目ID = 内訳.費目ID and 収支.収支区分ID = 内訳.収支区分ID inner join 口座 on 収支.口座ID = 口座.口座ID order by 収支ID asc'), JSON_UNESCAPED_UNICODE);

if ($items) {
	
	echo $items;
	
}

$close_flag = $mysqli->close();

if (!$close_flag){
    print('<p>切断失敗です。</p>');
}

?>