$(document).ready(function () {
  let role = localStorage.getItem("role");
  let isAdmin = role === "admin";

  /** ================== EDITABLE PARAGRAPH ================== **/
  let paragraph = $("#editable-paragraph");
  let originalText = paragraph.html();

  let savedText = localStorage.getItem("editedParagraph");
  if (savedText) {
      paragraph.html(savedText);
      originalText = savedText;
  }

  if (isAdmin) {
      paragraph.attr("contenteditable", "true").css({
          "border": "1px dashed transparent",
          "outline": "none"
      });
      $("#save-btn, #discard-btn").show();
  } else {
      paragraph.attr("contenteditable", "false");
      $("#save-btn, #discard-btn").hide();
  }

  $("#save-btn").click(function () {
      let updatedText = paragraph.html();
      localStorage.setItem("editedParagraph", updatedText);
      originalText = updatedText;
      alert("Changes saved successfully!");
  });

  $("#discard-btn").click(function () {
      paragraph.html(originalText);
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
  let originalTitle = title.text();

  let savedTitle = localStorage.getItem("editedTitle");
  if (savedTitle) {
      title.text(savedTitle);
      originalTitle = savedTitle;
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
      originalTitle = updatedTitle;
      title.attr("contenteditable", "false").css("border", "none");
      $("#edit-title-btn").show();
      $("#save-title-btn, #discard-title-btn").hide();
      alert("Title updated successfully!");
  });

  $("#discard-title-btn").click(function () {
      title.text(originalTitle);
      title.attr("contenteditable", "false").css("border", "none");
      $("#edit-title-btn").show();
      $("#save-title-btn, #discard-title-btn").hide();
  });

  /** ================== LOGOUT FUNCTIONALITY ================== **/
  $("#logout-btn").click(function () {
      localStorage.removeItem("role");
      window.location.href = "login.html";
  });
});
