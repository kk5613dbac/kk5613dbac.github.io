"use strict";

function addRecord() {

  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var email = $("#email").val();

  $.post("ajax/addRecord.php",
    { first_name: first_name, last_name: last_name, email: email },

      function (data, status) {
        $("#add_new_record_modal").modal("hide");

        readRecords();

        $("#first_name").val("");
        $("#last_name").val("");
        $("#email").val("");
      }

  );

}

function readRecords() {

  $.get("ajax/readRecords.php", {},

    function (data, status) {
      $(".records_content").html(data);
    }

  );

}

function DeleteUser(id) {

  var conf = confirm("Are you sure, do you really want to delete User?");

  if (conf == true) {
    $.post("ajax/deleteUser.php", { id: id },

      function (data, status) {
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

// for IE11
// ajax通信のキャッシュを無効にする
// readyイベントより先に実行される
(function() {

  $.ajaxSetup({ cache: false }); 

})();