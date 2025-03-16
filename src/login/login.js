$(document).ready(function () {
    const adminUsername = "devil";
    const adminPassword = "sho";

    $("#login-btn").click(function () {
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password!");
        } else if (username === adminUsername && password === adminPassword) {
            alert("Login Successful! You have editing access.");
            localStorage.setItem("role", "admin");
            window.location.href = "../index/index.html";
        } else {
            alert("Invalid login credentials!");
        }
    });

    $("#visitor-btn").click(function () {
        $("#modal").fadeIn();
    });

    $(".close-btn, #modal-close").click(function () {
        $("#modal").fadeOut();
    });

    $("#modal-close").click(function () {
        localStorage.setItem("role", "visitor");
        window.location.href = "../index/index.html";
    });

    $("#admin-toggle").change(function () {
        if ($(this).is(":checked")) {
            $("#username, #password, #login-btn").prop("disabled", false);
            $("#visitor-btn").removeClass("highlight");
        } else {
            $("#username, #password, #login-btn").prop("disabled", true);
            $("#visitor-btn").addClass("highlight");
        }
    });
});
$(document).ready(function () {
    const adminCredentials = { "devil": "sho", "admin2": "pass2", "admin3": "pass3" };

    $("#login-btn").click(function () {
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password!");
        } else if (adminCredentials[username] && adminCredentials[username] === password) {
            alert("Login Successful! You have editing access.");
            localStorage.setItem("role", "admin");
            localStorage.setItem("adminName", username); // Store admin's name
            window.location.href = "../index/index.html";
        } else {
            alert("Invalid login credentials!");
        }
    });

    $("#visitor-btn").click(function () {
        localStorage.setItem("role", "visitor");
        window.location.href = "../index/index.html";
    });
});
