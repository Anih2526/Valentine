document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is successfully loaded!");

    // Love Letter Page Elements
    const closedLetter = document.getElementById("closedLetter");
    const letterContent = document.getElementById("letterContent");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const teddy = document.getElementById("teddy");
    const clickToOpen = document.getElementById("clickToOpen");

    // Gift Box Page Elements
    const giftBox = document.getElementById("giftBox");
    const boxClosed = document.getElementById("boxClosed");
    const boxOpen = document.getElementById("boxOpen");
    const couponsOverlay = document.getElementById("couponsOverlay");
    const couponsContainer = document.getElementById("coupons");
    const coupons = document.querySelectorAll(".coupon");
    const backButton = document.getElementById("backButton");

    // Special Gift Section
    const specialGiftButton = document.getElementById("specialGiftButton");
    const specialGiftSection = document.getElementById("specialGiftSection");
    const backToCouponsButton = document.getElementById("backToCouponsButton");
    const takeItButton = document.getElementById("takeItButton");

    const floatingContainer = document.querySelector(".floating-container");
    const elements = ["🎈", "💖", "🌸", "❤️", "💘", "🌷"];
    let floatingInterval;

    // Create Particle Container for Confetti
    const particleContainer = document.createElement("div");
    particleContainer.classList.add("particle-container");
    document.body.appendChild(particleContainer);

    /* 🎉 Firework Burst Confetti Effect */
    function createConfetti() {
        // Define an array of emojis to use in the confetti burst
        const emojis = ['✨', '💖', '💌','💐'];

        for (let i = 0; i < 50; i++) { // Generate 50 pieces of confetti
            const particle = document.createElement("span");
            particle.classList.add("particle");

           // Select a random emoji from the array
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            particle.innerHTML = randomEmoji; // Use confetti emoji or image

            // Random start position near the letter
            const startX = 50 + (Math.random() * 20 - 10); // Centered burst
            const startY = 50 + (Math.random() * 20 - 10); // Random slight offset

            particle.style.left = `${startX}vw`;
            particle.style.top = `${startY}vh`;

            // Random trajectory for firework explosion effect
            const angle = Math.random() * 360; // Random direction
            const distance = Math.random() * 200 + 50; // Distance to travel
            const endX = startX + distance * Math.cos(angle * (Math.PI / 180));
            const endY = startY + distance * Math.sin(angle * (Math.PI / 180));

            particle.style.setProperty("--endX", `${endX}vw`);
            particle.style.setProperty("--endY", `${endY}vh`);
            particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // 1-2.5s duration

            particleContainer.appendChild(particle);

            
        }
    }

    /* 💌 Open Letter with Firework Confetti Effect */
    if (closedLetter) {
        closedLetter.addEventListener("click", () => {
            console.log("📩 Letter clicked!");

            // Make the letter "pop" slightly before disappearing
            closedLetter.style.transition = "transform 0.2s ease-out, opacity 0.2s ease-out";
            closedLetter.style.transform = "scale(1.2)";
            closedLetter.style.opacity = "0";

            // Firework explosion effect
            createConfetti();

            setTimeout(() => {
                closedLetter.style.display = "none"; // Hide closed letter
                letterContent.classList.remove("hidden");
                letterContent.classList.add("show");

                if (clickToOpen) clickToOpen.classList.add("hidden");
            }, 300);
        });
    }

    /* 🎈 Create Floating Elements */
    function createFloatingElement() {
        const item = document.createElement("span");
        item.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        item.classList.add("floating-item");

        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = Math.random() * 3 + 5 + "s";
        item.style.fontSize = Math.random() * 10 + 25 + "px";

        floatingContainer.appendChild(item);
        setTimeout(() => {
            item.remove();
        }, 6000);
    }

    /* 💖 Continue Floating Effect If Enabled */
    if (localStorage.getItem("floatingActive") === "true") {
        floatingContainer.classList.add("show");
        floatingInterval = setInterval(createFloatingElement, 1000);
    }

    /* 💖 Clicking "Yes" - Activate Floating Effect & Store It */
    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            floatingContainer.classList.add("show");
            localStorage.setItem("floatingActive", "true"); // Store effect across pages

            // Instantly show a few floating elements
            for (let i = 0; i < 5; i++) {
                createFloatingElement();
            }

            floatingInterval = setInterval(createFloatingElement, 1000);
            setTimeout(() => {
                window.location.href = "surprise.html";
            }, 1500);
        });
    }

    /* 🔙 Disable Floating Effect When Returning Home */
    if (window.location.pathname.includes("index.html")) {
        localStorage.removeItem("floatingActive");
    }

    /* ❌ Clicking "No" - Button Moves Away (Supports Mobile & Desktop) */
    if (noBtn) {
        function moveNoButton() {
            let newX = (Math.random() * 200) - 100; // Random move left/right
            let newY = (Math.random() * 200) - 100; // Random move up/down
    
            noBtn.style.transform = `translate(${newX}px, ${newY}px) scale(1.1) rotate(${Math.random() * 20 - 10}deg)`;
        }
    
        noBtn.addEventListener("mouseover", moveNoButton);
        noBtn.addEventListener("touchstart", moveNoButton); // Mobile support
    }

    /* 🎁 Open Gift Box & Reveal Coupons */
    if (giftBox) {
        giftBox.addEventListener("click", () => {
            console.log("🎁 Gift box clicked!");

            if (boxClosed && boxOpen) {
                boxClosed.classList.add("hidden");
                boxOpen.classList.remove("hidden");

                // Show fade effect around coupons
                couponsOverlay.classList.add("show");

                setTimeout(() => {
                    console.log("🎊 Showing coupons...");
                    couponsContainer.classList.add("show");
                    backButton.classList.add("show");
                    revealCoupons();
                }, 800);
            }
            /* ✅ FIX: Support Both Mobile & Desktop Clicks */
            giftBox.addEventListener("click", openGiftBox);
            giftBox.addEventListener("touchstart", openGiftBox, { passive: true }); // Mobile fix
        });
    }

    /* 🎊 Reveal Coupons One by One */
    function revealCoupons() {
        let delay = 400;
        coupons.forEach((coupon, index) => {
            setTimeout(() => {
                coupon.classList.add("show");
                console.log(`🎟️ Coupon ${index + 1} appeared.`);
            }, delay * index);
        });
    }

    /* 🔄 Clicking a Coupon Reveals Text */
    coupons.forEach(coupon => {
        coupon.addEventListener("click", function () {
            if (!this.classList.contains("revealed")) {
                this.classList.add("revealed");
                this.innerHTML = this.getAttribute("data-text");
            }
        });
    });

    /* 🔙 Back Button - Reset Everything */
    if (backButton) {
        backButton.addEventListener("click", () => {
            console.log("🔙 Resetting gift box...");
            couponsOverlay.classList.remove("show");
            couponsContainer.classList.remove("show");
            backButton.classList.remove("show");

            if (boxClosed && boxOpen) {
                setTimeout(() => {
                    boxClosed.classList.remove("hidden");
                    boxOpen.classList.add("hidden");
                }, 500);
            }

            coupons.forEach(coupon => {
                coupon.classList.remove("show", "revealed");
                coupon.innerHTML = "❓";
            });
        });
    }

    /* 🎁 Clicking "Special Gift" Shows Engagement Ring */
    if (specialGiftButton) {
        specialGiftButton.addEventListener("click", () => {
            couponsContainer.style.display = "none";
            specialGiftButton.style.display = "none";
            backButton.style.display = "none";
            specialGiftSection.style.display = "flex";
        });
    }

    /* 🔙 Clicking "Back" Returns to Coupons */
    if (backToCouponsButton) {
        backToCouponsButton.addEventListener("click", () => {
            specialGiftSection.style.display = "none";
            couponsContainer.style.display = "flex";
            specialGiftButton.style.display = "block";
            backButton.style.display = "block";
        });
    }

    /* 💍 Clicking "Take It" Redirects to Thank You Page */
    if (takeItButton) {
        takeItButton.addEventListener("click", () => {
            window.location.href = "thankyou.html";
        });
    }
});
