/* =========================================================
   NAVIGATION
   ========================================================= */

const siteNav = document.getElementById("siteNav");
const menuToggle = document.querySelector(".nav-menu-toggle");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");


// ---------------------------------------------------------
// Scroll state
// ---------------------------------------------------------

function updateNavOnScroll() {

    if (window.scrollY > 40) {
        siteNav.classList.add("is-scrolled");
    } else {
        siteNav.classList.remove("is-scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateNavOnScroll,
    { passive: true }
);

updateNavOnScroll();


// ---------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------

if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.toggle(
                    "is-open"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


// ---------------------------------------------------------
// Close mobile menu after click
// ---------------------------------------------------------

mobileLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "is-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);

/* =========================================================
   NAVIGATION
   ========================================================= */

const siteNav = document.getElementById("siteNav");
const menuToggle = document.querySelector(".nav-menu-toggle");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");


// ---------------------------------------------------------
// Scroll state
// ---------------------------------------------------------

function updateNavOnScroll() {

    if (window.scrollY > 40) {
        siteNav.classList.add("is-scrolled");
    } else {
        siteNav.classList.remove("is-scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateNavOnScroll,
    { passive: true }
);

updateNavOnScroll();


// ---------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------

if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.toggle(
                    "is-open"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


// ---------------------------------------------------------
// Close mobile menu after click
// ---------------------------------------------------------

mobileLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "is-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);