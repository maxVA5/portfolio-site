/* ===================================== */
/* BREW & CO. PREMIUM LANDING PAGE */
/* ===================================== */

/* ========================= */
/* STICKY NAVBAR */
/* ========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

/* ========================= */
/* MOBILE MENU */
/* ========================= */

const mobileToggle =
    document.querySelector(".mobile-toggle");

const mobileMenu =
    document.querySelector(".mobile-menu");

if (mobileToggle) {

    mobileToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}

/* Close menu when link clicked */

const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});

/* ========================= */
/* SCROLL REVEAL */
/* ========================= */

const revealElements =
    document.querySelectorAll(
        ".benefit-card, .drink-card, .workflow-card, .crm-preview, .signup-content, .signup-form-card, .cta-box"
    );

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");
                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* ========================= */
/* VIP FORM */
/* ========================= */

const vipForm =
    document.getElementById("vipForm");

if (vipForm) {

    vipForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const submitButton =
                vipForm.querySelector("button");

            submitButton.disabled = true;

            submitButton.innerText =
                "Processing...";

            setTimeout(() => {

                showNotification(
                    "VIP Pass Unlocked! Your voucher code is BREWVIP20"
                );

                vipForm.reset();

                submitButton.disabled = false;

                submitButton.innerText =
                    "Unlock My VIP Discount";

            }, 1200);

        }
    );

}

/* ========================= */
/* NOTIFICATION */
/* ========================= */

function showNotification(message) {

    const existing =
        document.querySelector(".toast");

    if (existing) {

        existing.remove();

    }

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <div class="toast-content">
            <strong>Success</strong>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 4500);

}

/* ========================= */
/* SMOOTH ANCHOR SCROLL */
/* ========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (e) {

                const targetId =
                    this.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                e.preventDefault();

                const offset =
                    80;

                const targetPosition =
                    target.offsetTop - offset;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

/* ========================= */
/* HERO PARALLAX */
/* ========================= */

const hero =
    document.querySelector(".hero");

window.addEventListener(
    "scroll",
    () => {

        if (!hero) return;

        const scroll =
            window.pageYOffset;

        hero.style.backgroundPositionY =
            scroll * 0.4 + "px";

    }
);

/* ========================= */
/* DRINK CARD HOVER EFFECT */
/* ========================= */

const drinkCards =
    document.querySelectorAll(
        ".drink-card"
    );

drinkCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 30;

            const rotateY =
                (centerX - x) / 30;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});

/* ========================= */
/* PAGE LOADED */
/* ========================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

console.log(
    "Brew & Co. Premium Landing Page Loaded"
);