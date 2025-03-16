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
