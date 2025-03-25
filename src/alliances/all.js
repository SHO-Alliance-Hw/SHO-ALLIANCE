    // GSAP Animation for Table Rows
    gsap.utils.toArray(".neon-table tbody tr").forEach((row, index) => {
        gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power3.out"
        });
    });