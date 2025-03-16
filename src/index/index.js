$(document).ready(function () {
  const API_URL = "http://localhost:3000"; // Backend URL

  let role = localStorage.getItem("role");
  let isAdmin = role === "admin";  // Check if role is admin
  let adminName = localStorage.getItem("adminName") || "Unknown Admin";

  /** ================== LOGOUT FUNCTIONALITY ================== **/
  $(".nav-link[href='../login/login.html']").click(function (e) {
    e.preventDefault(); // Prevent default behavior (navigation)
    localStorage.clear(); // Clear all local storage items
    console.log("🧹 Local storage cleared! User logged out.");
    window.location.href = "../login/login.html"; // Redirect to login page
  });

  /** ================== LOAD DATA FROM SERVER ================== **/
  function loadData() {
    fetch(`${API_URL}/api/load?t=${new Date().getTime()}`)
      .then(response => response.json())
      .then(data => {
        $("#editable-title").text(data.title);
        $("#editable-paragraph").html(data.paragraph);
        $("#profile-img").attr("src", data.image);
        $("#last-editor").text(`Last edited by: ${data.lastEditedBy}`);
      })
      .catch(error => console.error("❌ Load Data Error:", error));
  }

  /** ================== HIDE EDIT BUTTONS FOR VISITORS ================== **/
  if (!isAdmin) {
    $(".edit-buttons").hide(); // ✅ Hide all edit buttons for visitors
  }

  /** ================== TITLE EDIT ================== **/
  $("#edit-title-btn").click(function () {
    if (!isAdmin) {
      alert("❌ You are not authorized to edit this content.");
      return;
    }

    $("#editable-title").attr("contenteditable", "true").focus();
    $("#edit-title-btn").hide();
    $("#save-title-btn, #discard-title-btn").show();
  });

  $("#save-title-btn").click(function () {
    if (!isAdmin) {
      alert("❌ You are not authorized to save this content.");
      return;
    }

    let newTitle = $("#editable-title").text().trim();
    if (!newTitle) {
      alert("⚠️ Title cannot be empty!");
      return;
    }

    $("#editable-title").attr("contenteditable", "false");
    saveData();
    $("#save-title-btn, #discard-title-btn").hide();
    $("#edit-title-btn").show();
  });

  $("#discard-title-btn").click(function () {
    loadData();
    $("#save-title-btn, #discard-title-btn").hide();
    $("#edit-title-btn").show();
  });

  /** ================== PARAGRAPH EDIT ================== **/
  $("#edit-paragraph-btn").click(function () {
    if (!isAdmin) {
      alert("❌ You are not authorized to edit this content.");
      return;
    }

    $("#editable-paragraph").attr("contenteditable", "true").focus();
    $("#edit-paragraph-btn").hide();
    $("#save-paragraph-btn, #discard-paragraph-btn").show();
  });

  $("#save-paragraph-btn").click(function () {
    if (!isAdmin) {
      alert("❌ You are not authorized to save this content.");
      return;
    }

    let newParagraph = $("#editable-paragraph").html().trim();
    if (!newParagraph) {
      alert("⚠️ Paragraph cannot be empty!");
      return;
    }

    $("#editable-paragraph").attr("contenteditable", "false");
    saveData();
    $("#save-paragraph-btn, #discard-paragraph-btn").hide();
    $("#edit-paragraph-btn").show();
  });

  $("#discard-paragraph-btn").click(function () {
    loadData();
    $("#save-paragraph-btn, #discard-paragraph-btn").hide();
    $("#edit-paragraph-btn").show();
  });

  /** ================== IMAGE UPLOAD ================== **/
  $("#edit-img-btn").click(function () {
    if (!isAdmin) {
      alert("❌ You are not authorized to upload images.");
      return;
    }

    $("#upload-img").click();
  });

  $("#upload-img").change(function (event) {
    if (!isAdmin) {
      alert("❌ You are not authorized to upload images.");
      return;
    }

    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#profile-img").attr("src", e.target.result);
        saveData();
      };
      reader.readAsDataURL(file);
    }
  });

  /** ================== SAVE DATA TO SERVER ================== **/
  function saveData() {
    let updatedData = {
        title: $("#editable-title").text().trim(),
        paragraph: $("#editable-paragraph").html().trim(),
        image: $("#profile-img").attr("src")
    };

    fetch(`${API_URL}/api/save`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "x-user-role": localStorage.getItem("role") // Send role securely
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error); // Show error message if unauthorized
            return;
        }
        alert("✅ Changes saved successfully!");
    })
    .catch(error => console.error("❌ Save Error:", error));
  }

  // ✅ Load data on page load
  loadData();
});
