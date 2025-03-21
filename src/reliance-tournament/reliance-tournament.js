document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });

    // GSAP Animations
    gsap.from(".navbar", { duration: 0.6, opacity: 0, y: -50, ease: "power2.out" });
    gsap.from(".hero h1", { duration: 1, opacity: 0, y: -50, ease: "bounce" });
    gsap.from(".info-card", { duration: 1, opacity: 0, scale: 0.8, stagger: 0.2, ease: "back.out(1.7)" });
});
