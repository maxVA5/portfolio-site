/* =========================================================
   ROOTS OF THE COSMOS
   CONSTELLATION / 3D ENVIRONMENT
   ========================================================= */


/*
    PLACEHOLDER

    The immersive 3D cosmic environment
    will be built here in the next phase.

    Planned system:

    - 3D particle field
    - galaxy movement
    - constellation points
    - mouse parallax
    - scroll-based camera movement
    - section transitions
    - reduced-motion fallback
*/


document.addEventListener("DOMContentLoaded", () => {

    const environment =
        document.getElementById(
            "cosmic-environment"
        );


    if (!environment) {
        return;
    }


    /*
        Temporary visual atmosphere.
        This will be replaced by the actual
        WebGL / Three.js environment.
    */

    environment.style.position = "fixed";
    environment.style.inset = "0";
    environment.style.pointerEvents = "none";
    environment.style.zIndex = "0";

});