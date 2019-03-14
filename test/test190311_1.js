"use strict";

function addRecord() {

  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var email = document.getElementById("email").value;

  CreateXMLHttpRequest("POST", "ajax/addRecord.php",
    "first_name=" + first_name + "&last_name=" + last_name + "&email=" + email,

      function(data, oReq) {

        //[Add New Record]ボタンのクリックイベントを強制発火してクローズ処理を行なう
        //属性の書き換えを手動で行なう方法でクローズする場合、[Add New Record]ボタンの再クリック時には
        //先に空でクローズ処理を走らせないと再表示が行なわれない
        //すなわち1クリック目で空処理となり、2クリック目で再表示される
        document.getElementsByClassName("btn-success")[0].click();

        readRecords();

        document.getElementById("first_name").value = "";
        document.getElementById("last_name").value = "";
        document.getElementById("email").value = "";

      }

    );

}

function readRecords() {

  CreateXMLHttpRequest("GET", "ajax/readRecords.php", null, function(data, oReq) {

      document.getElementsByClassName('records_content')[0].innerHTML = oReq.responseText;

    });

}

function DeleteUser(id) {

  var conf = window.confirm("Are you sure, do you really want to delete User?");

  if (conf == true) {

    CreateXMLHttpRequest("POST", "ajax/deleteUser.php", "id=" + id,

        function(data, oReq) {

          readRecords();

        }

      );

  }

}

function GetUserDetails(id) {

  $("#hidden_user_id").val(id);

  $.post("ajax/readUserDetails.php", { id: id },

    function (data, status) {
      var user = JSON.parse(data);

      $("#update_first_name").val(user.first_name);
      $("#update_last_name").val(user.last_name);
      $("#update_email").val(user.email);
    }

  );

  $("#update_user_modal").modal("show");

}

function UpdateUserDetails() {

  var first_name = $("#update_first_name").val();
  var last_name = $("#update_last_name").val();
  var email = $("#update_email").val();

  var id = $("#hidden_user_id").val();

  $.post("ajax/updateUserDetails.php",
    { id: id, first_name: first_name, last_name: last_name, email: email },

      function (data, status) {
        $("#update_user_modal").modal("hide");

        readRecords();
      }

  );

}

$(document).ready(function () {

  readRecords();

});

function CreateXMLHttpRequest(method, url, data, callback) {

  var oReq = new XMLHttpRequest();

  oReq.onreadystatechange = function() {
    if (oReq.readyState == 4) {
      if (oReq.status == 200) {

        callback(data, oReq);

      } else {

        alert("status = " + oReq.status);

      }

      oReq.abort();
    }
  }

  oReq.open(method, url, true);

  //キャッシュ無効化の方法：setRequestHeader()でキャッシュ制御のためのヘッダを送信する
  oReq.setRequestHeader("Pragma", "no-cache");					//HTTP1.0における汎用のヘッダフィールド
  oReq.setRequestHeader("Cache-Control", "no-cache");				//HTTP1.1におけるキャッシュ制御のヘッダフィールド
  oReq.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");	//指定日時以降に更新があれば内容を返し、更新がなければ304ステータスを返すヘッダフィールド
                                                                           	//古い日時を指定する

  if (method === 'POST') {
    oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }

  oReq.send(data);

}

function ParseMapXMLHttpRequest(method, url, data, callback) {
}