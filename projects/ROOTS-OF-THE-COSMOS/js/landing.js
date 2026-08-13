/* =========================================================
   ROOTS OF THE COSMOS
   LANDING PAGE JS
   ========================================================= */


const landingNav =
    document.getElementById(
        "landingNav"
    );


/* ---------------------------------------------------------
   Navigation on scroll
   --------------------------------------------------------- */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 40
        ) {

            landingNav.classList.add(
                "is-scrolled"
            );

        } else {

            landingNav.classList.remove(
                "is-scrolled"
            );

        }

    },
    {
        passive: true
    }
);


/* ---------------------------------------------------------
   Placeholder preview button
   --------------------------------------------------------- */

const previewButton =
    document.getElementById(
        "previewButton"
    );


if (previewButton) {

    previewButton.addEventListener(
        "click",
        () => {

            alert(
                "The Digital Preview will be available here soon."
            );

        }
    );

}