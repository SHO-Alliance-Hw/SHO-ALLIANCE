$(document).ready(function () {
    // Dummy credentials (Not secure, for demo purposes only)
    const adminUsername = "devil";
    const adminPassword = "sho";

    // Admin Login
    $("#login-btn").click(function () {
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password!");
        } else if (username === adminUsername && password === adminPassword) {
            alert("Login Successful! You have editing access.");
            localStorage.setItem("role", "admin"); // Store role
            window.location.href = "../index/index.html"; // Redirect to index page
        } else {
            alert("Invalid login credentials!");
        }
    });
    $(document).ready(function () {
        $("#admin-toggle").change(function () {
            if ($(this).is(":checked")) {
                $("#username, #password, #login-btn").prop("disabled", false);
                $("#visitor-btn").removeClass("highlight");
            } else {
                $("#username, #password, #login-btn").prop("disabled", true);
                $("#visitor-btn").addClass("highlight");
            }
        });
        $("#login-btn").click(function () {
        });
    
        $("#visitor-btn").click(function () {
        });
    });
    // Visitor Login
    $("#visitor-btn").click(function () {
        $("#modal").fadeIn();
    });

    // Close Modal
    $(".close-btn, #modal-close").click(function () {
        $("#modal").fadeOut();
    });

    // Proceed as Visitor
    $("#modal-close").click(function () {
        localStorage.setItem("role", "visitor"); // Store role
        window.location.href = "../index/index.html"; // Redirect to index page
    });
});
