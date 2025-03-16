$(document).ready(function () {
  let role = localStorage.getItem("role");
  let isAdmin = role === "admin";
  let adminName = localStorage.getItem("adminName") || "Unknown Admin";

  /** ================== EDITABLE PARAGRAPH ================== **/
  let paragraph = $("#editable-paragraph");
  let savedText = localStorage.getItem("editedParagraph");
  let savedEditor = localStorage.getItem("lastEditedBy");

  if (savedText) {
      paragraph.html(savedText);
  }
  if (savedEditor) {
      $("#last-editor").text(`Last edited by: ${savedEditor}`);
  }

  if (isAdmin) {
      paragraph.attr("contenteditable", "true").css({
          "border": "1px dashed #ccc",
          "outline": "none"
      });
      $("#save-btn, #discard-btn").show();
  } else {
      paragraph.attr("contenteditable", "false");
      $("#save-btn, #discard-btn").hide();
  }

  $("#save-btn").click(function () {
      let updatedText = paragraph.html();
      let timestamp = new Date().toLocaleString();

      localStorage.setItem("editedParagraph", updatedText);
      localStorage.setItem("lastEditedBy", adminName);

      let editHistory = JSON.parse(localStorage.getItem("editHistory")) || [];
      editHistory.push({ admin: adminName, text: updatedText, time: timestamp });
      localStorage.setItem("editHistory", JSON.stringify(editHistory));

      $("#last-editor").text(`Last edited by: ${adminName}`);
      alert(`Changes saved by ${adminName}!`);
  });

  $("#discard-btn").click(function () {
      paragraph.html(savedText || "Default text");
      alert("Changes discarded!");
  });

  /** ================== IMAGE UPLOAD ================== **/
  if (isAdmin) {
      $("#upload-btn").show();
  } else {
      $("#upload-btn").hide();
  }

  $("#upload-btn").click(function () {
      $("#upload-img").click();
  });

  $("#upload-img").change(function (event) {
      let file = event.target.files[0];
      if (file) {
          let reader = new FileReader();
          reader.onload = function (e) {
              $("#profile-img").attr("src", e.target.result);
              localStorage.setItem("profileImage", e.target.result);
          };
          reader.readAsDataURL(file);
      }
  });

  let savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
      $("#profile-img").attr("src", savedImage);
  }

  /** ================== EDITABLE TITLE ================== **/
  let title = $("#editable-title");
  let savedTitle = localStorage.getItem("editedTitle");

  if (savedTitle) {
      title.text(savedTitle);
  }

  if (isAdmin) {
      $("#edit-title-btn").show();
  } else {
      $("#edit-title-btn").hide();
  }

  $("#edit-title-btn").click(function () {
      title.attr("contenteditable", "true").css("border", "1px dashed #fff").focus();
      $("#save-title-btn, #discard-title-btn").show();
      $(this).hide();
  });

  $("#save-title-btn").click(function () {
      let updatedTitle = title.text();
      localStorage.setItem("editedTitle", updatedTitle);
      localStorage.setItem("lastEditedBy", adminName);

      let timestamp = new Date().toLocaleString();
      let editHistory = JSON.parse(localStorage.getItem("editHistory")) || [];
      editHistory.push({ admin: adminName, text: updatedTitle, time: timestamp });
      localStorage.setItem("editHistory", JSON.stringify(editHistory));

      $("#last-editor").text(`Last edited by: ${adminName}`);
      alert(`Title updated by ${adminName}!`);

      title.attr("contenteditable", "false").css("border", "none");
      $("#edit-title-btn").show();
      $("#save-title-btn, #discard-title-btn").hide();
  });

  $("#discard-title-btn").click(function () {
      title.text(savedTitle || "Default Title");
      title.attr("contenteditable", "false").css("border", "none");
      $("#edit-title-btn").show();
      $("#save-title-btn, #discard-title-btn").hide();
  });

  /** ================== SHOW EDIT HISTORY ================== **/
  let editHistory = JSON.parse(localStorage.getItem("editHistory")) || [];
  editHistory.forEach((edit) => {
      $("#edit-log").append(`<p>${edit.admin} edited at ${edit.time}: ${edit.text}</p>`);
  });

  /** ================== LOGOUT FUNCTIONALITY ================== **/
  $("#logout-btn").click(function () {
      localStorage.removeItem("role");
      localStorage.removeItem("adminName");
      window.location.href = "login.html";
  });
});
