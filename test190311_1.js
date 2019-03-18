"use strict";

function addRecord() {

  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var email = document.getElementById("email").value;

  CreateXMLHttpRequest("POST", "ajax/addRecord.php",
    "first_name=" + first_name + "&last_name=" + last_name + "&email=" + email,

      function(data, oReq) {

        ToggleModalDispStatus('add_new_record_modal', 'hide');

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

  document.getElementById("hidden_user_id").value = id;

  CreateXMLHttpRequest("POST", "ajax/readUserDetails.php", "id=" + id,

      function(data, oReq) {

        var user = JSON.parse(oReq.responseText);

        document.getElementById("update_first_name").value = user.first_name;
        document.getElementById("update_last_name").value = user.last_name;
        document.getElementById("update_email").value = user.email;

      }

    );

  ToggleModalDispStatus("update_user_modal", "show");

}

function UpdateUserDetails() {

  var first_name = document.getElementById("update_first_name").value;
  var last_name = document.getElementById("update_last_name").value;
  var email = document.getElementById("update_email").value;

  var id = document.getElementById("hidden_user_id").value;

  CreateXMLHttpRequest("POST", "ajax/updateUserDetails.php",
    "id=" + id + "&first_name=" + first_name + "&last_name=" + last_name + "&email=" + email,

      function(data, oReq) {

       ToggleModalDispStatus("update_user_modal", "hide");

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

function ToggleModalDispStatus(modalId, status) {

  var tagetModal = document.getElementById(modalId);

  switch (status){

    case "show":

      document.body.classList.add("modal-open");

      tagetModal.classList.add("show");
      tagetModal.setAttribute("aria-modal", "true");
      tagetModal.removeAttribute("aria-hidden");
      tagetModal.setAttribute("style", "display: block;");

      var modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add("modal-backdrop");
      modalBackdrop.classList.add("show");
      document.body.appendChild(modalBackdrop);

      break;

    case "hide":

      document.body.classList.remove("modal-open");

      tagetModal.classList.remove("show");
      tagetModal.setAttribute("aria-hidden", "true");
      tagetModal.removeAttribute("aria-modal");
      tagetModal.setAttribute("style", "display: none;");

      var modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
      document.body.removeChild(modalBackdrop);

      break;

  }

}