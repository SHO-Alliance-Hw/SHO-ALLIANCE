        // Navbar Toggle
        document.getElementById("navToggle").addEventListener("click", function () {
            let navMenu = document.getElementById("navbarNav");
            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                gsap.fromTo("#navbarNav", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
            } else {
                gsap.to("#navbarNav", { opacity: 0, duration: 0.3 });
            }
        });

        // GSAP Animations
        gsap.from(".cyberpunk-navbar", { opacity: 0, y: -50, duration: 1 });
        gsap.from(".cyberpunk-section", { opacity: 0, y: 50, duration: 1, stagger: 0.3, ease: "power3.out" });
        gsap.from(".cyberpunk-button", { opacity: 0, scale: 0.5, duration: 1.2,});
        gsap.from(".btn-guide", { opacity: 0, scale: 0.8, duration: 1.5,  });