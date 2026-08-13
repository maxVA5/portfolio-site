/* =========================================================
   ROOTS OF THE COSMOS
   MAIN WEBSITE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");

    const menuToggle = document.querySelector(".menu-toggle");

    const siteNav = document.querySelector(".site-nav");


    /* -----------------------------------------------------
       HEADER SCROLL STATE
       ----------------------------------------------------- */

    const updateHeader = () => {

        if (window.scrollY > 40) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* -----------------------------------------------------
       MOBILE MENU
       ----------------------------------------------------- */

    if (menuToggle && siteNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    siteNav.classList.toggle("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        siteNav
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        siteNav.classList.remove(
                            "is-open"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* -----------------------------------------------------
       SMOOTH INTERNAL LINKS
       ----------------------------------------------------- */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});