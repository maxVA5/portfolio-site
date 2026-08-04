/* ==================================================
   LUMIÈRE AESTHETICS & MEDSPA
   SCRIPT.JS
   PREMIUM INTERACTIONS + FORM SUBMISSION
================================================== */

/* ==========================================
   CONFIG
========================================== */

/*
Replace with your deployed Apps Script URL later.

Example:
https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
*/

const APPS_SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEBAPP_URL_HERE";

/* ==========================================
   CURSOR GLOW
========================================== */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if (!glow) return;

    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;

});

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

/* ==========================================
   REVEAL ON SCROLL
========================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                parseInt(counter.dataset.target);

            let current = 0;

            const increment =
                Math.ceil(target / 100);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target;

                } else {

                    counter.textContent = current;

                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: 0.5
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});

/* ==========================================
   FAQ ACCORDION
========================================== */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach((faq) => {

            if (faq !== item) {
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});

/* ==========================================
   SMOOTH INTERNAL LINKS
========================================== */

const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

/* ==========================================
   FORM SUBMISSION
========================================== */

const bookingForm =
    document.getElementById("bookingForm");

const formMessage =
    document.getElementById("formMessage");

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const submitButton =
                bookingForm.querySelector(
                    ".submit-btn"
                );

            submitButton.disabled = true;
            submitButton.textContent =
                "Submitting...";

            const formData =
                new FormData(bookingForm);

            const payload = {

                name:
                    formData.get("name"),

                email:
                    formData.get("email"),

                phone:
                    formData.get("phone"),

                date:
                    formData.get("date"),

                time:
                    formData.get("time")
            };

            try {

                const response =
                    await fetch(
                        APPS_SCRIPT_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify(
                                payload
                            )
                        }
                    );

                const result =
                    await response.json();

                if (result.success) {

                    formMessage.innerHTML = `
                        <span style="color:green;">
                        ✓ Your appointment request has been received.
                        Please check your email for confirmation.
                        </span>
                    `;

                    bookingForm.reset();

                    showSuccessModal();

                } else {

                    throw new Error(
                        result.message
                    );
                }

            } catch (error) {

                console.error(error);

                formMessage.innerHTML = `
                    <span style="color:red;">
                    Something went wrong.
                    Please try again.
                    </span>
                `;
            }

            submitButton.disabled = false;

            submitButton.textContent =
                "Reserve My Spot";

        }
    );

}

/* ==========================================
   SUCCESS MODAL
========================================== */

function showSuccessModal() {

    let modal =
        document.getElementById(
            "successModal"
        );

    if (modal) {

        modal.classList.add("show");
        return;
    }

    modal =
        document.createElement("div");

    modal.id = "successModal";

    modal.innerHTML = `
        <div class="success-overlay">

            <div class="success-box">

                <div class="success-icon">
                    ✨
                </div>

                <h2>
                    Appointment Request Received
                </h2>

                <p>
                    Thank you for choosing
                    Lumière Aesthetics & MedSpa.

                    A confirmation email and
                    preparation guide have
                    been sent to your inbox.
                </p>

                <button id="closeModal">
                    Close
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    document
        .getElementById("closeModal")
        .addEventListener(
            "click",
            () => {

                modal.remove();
            }
        );
}

/* ==========================================
   PARALLAX HERO
========================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    const offset =
        window.scrollY * 0.15;

    hero.style.backgroundPosition =
        `center ${offset}px`;

});

/* ==========================================
   IMAGE TILT EFFECT
========================================== */

const cards =
    document.querySelectorAll(
        ".gallery-card"
    );

cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                ((y / rect.height) - 0.5) * -8;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
                `;
        }
    );

});

/* ==========================================
   FADE HERO CONTENT
========================================== */

window.addEventListener(
    "load",
    () => {

        const heroContent =
            document.querySelector(
                ".hero-content"
            );

        if (!heroContent) return;

        heroContent.style.opacity = "0";
        heroContent.style.transform =
            "translateY(40px)";

        setTimeout(() => {

            heroContent.style.transition =
                "all 1s ease";

            heroContent.style.opacity = "1";

            heroContent.style.transform =
                "translateY(0)";

        }, 300);

    }
);

/* ==========================================
   PRELOAD IMAGES
========================================== */

window.addEventListener(
    "load",
    () => {

        const images =
            document.querySelectorAll("img");

        images.forEach((img) => {

            const image =
                new Image();

            image.src = img.src;

        });

    }
);

/* ==========================================
   DEV LOG
========================================== */

console.log(
    "Lumière Aesthetics & MedSpa Loaded ✨"
);