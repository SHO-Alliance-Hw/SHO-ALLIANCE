$(document).ready(function () {
  let role = localStorage.getItem("role");
  let isAdmin = role === "admin"; 

  let paragraph = $("#editable-paragraph");
  let originalText = paragraph.html(); // Store original content

  if (isAdmin) {
      console.log("Admin access granted");
      paragraph.attr("contenteditable", "true").css({
          "border": "1px dashed transparent",  // Invisible border to avoid shifting content
          "outline": "none"  // Remove default focus outline
      });

      $("#save-btn, #discard-btn").show(); // Show buttons for admin
  } else {
      console.log("Visitor access only");
      paragraph.attr("contenteditable", "false");
      $("#save-btn, #discard-btn").hide(); // Hide buttons for visitors
  }

  // Load saved content if available
  let savedText = localStorage.getItem("editedParagraph");
  if (savedText) {
      paragraph.html(savedText);
      originalText = savedText; // Update original text
  }

  // Save edited content
  $("#save-btn").click(function () {
      let updatedText = paragraph.html();
      localStorage.setItem("editedParagraph", updatedText);
      originalText = updatedText; // Update original text
      alert("Changes saved successfully!");
  });

  // Discard changes and reset text
  $("#discard-btn").click(function () {
      paragraph.html(originalText);
      alert("Changes discarded!");
  });
});
$(document).ready(function () {
  let role = localStorage.getItem("role");
  let isAdmin = role === "admin";

  // Show upload button only for admins
  if (isAdmin) {
      $("#upload-btn").show();
  }

  // Handle upload button click
  $("#upload-btn").click(function () {
      $("#upload-img").click(); // Open file input
  });

  // Handle file selection
  $("#upload-img").change(function (event) {
      let file = event.target.files[0];

      if (file) {
          let reader = new FileReader();

          reader.onload = function (e) {
              $("#profile-img").attr("src", e.target.result); // Update image
              localStorage.setItem("profileImage", e.target.result); // Save to local storage
          };

          reader.readAsDataURL(file); // Convert image to base64
      }
  });

  // Load saved image from local storage (if available)
  let savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
      $("#profile-img").attr("src", savedImage);
  }
});
$(document).ready(function () {
  let role = localStorage.getItem("role");
  let isAdmin = role === "admin"; 

  let title = $("#editable-title");
  let originalTitle = title.text();

  // Show buttons only for admins
  if (isAdmin) {
      $("#edit-title-btn").show();
  }

  // Enable editing on button click
  $("#edit-title-btn").click(function () {
      title.attr("contenteditable", "true").css("border", "1px dashed #fff").focus();
      $("#save-title-btn, #discard-title-btn").show();
      $(this).hide(); // Hide edit button
  });

  // Save edited title
  $("#save-title-btn").click(function () {
      let updatedTitle = title.text();
      localStorage.setItem("editedTitle", updatedTitle);
      originalTitle = updatedTitle;
      title.attr("contenteditable", "false").css("border", "none");
      $("#edit-title-btn").show();
      $("#save-title-btn, #discard-title-btn").hide();
      alert("Title updated successfully!");
  });

  // Discard changes and reset
  $("#discard-title-btn").click(function () {
      title.text(originalTitle);
      title.attr("contenteditable", "false").css("border", "none");
      $("#edit-title-btn").show();
      $("#save-title-btn, #discard-title-btn").hide();
  });

  // Load saved title if available
  let savedTitle = localStorage.getItem("editedTitle");
  if (savedTitle) {
      title.text(savedTitle);
      originalTitle = savedTitle;
  }
});
