/* =========================================================
   ROOTS OF THE COSMOS
   IMMERSIVE COSMIC ENVIRONMENT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const container =
        document.getElementById("cosmic-environment");

    if (!container) return;

    if (typeof THREE === "undefined") {
        console.warn("Three.js failed to load.");
        return;
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    const settings = {

        desktopParticles: 7000,

        tabletParticles: 4200,

        mobileParticles: 2200,

        galaxyRadius: 18,

        galaxyDepth: 10,

        rotationSpeed: 0.00012,

        cameraZ: 24

    };

    /* =====================================================
       SCENE
       ===================================================== */

    const scene = new THREE.Scene();


    /* =====================================================
       CAMERA
       ===================================================== */

    const camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

    camera.position.z =
        settings.cameraZ;


    /* =====================================================
       RENDERER
       ===================================================== */

    const renderer =
        new THREE.WebGLRenderer({

            alpha: true,

            antialias: true,

            powerPreference: "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.75
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setClearColor(
        0x000000,
        0
    );


    container.appendChild(
        renderer.domElement
    );


    /* =====================================================
       COSMIC GROUP
       ===================================================== */

    const cosmicGroup =
        new THREE.Group();

    scene.add(
        cosmicGroup
    );


    /* =====================================================
       PARTICLE COUNT
       ===================================================== */

    const isMobile =
        window.innerWidth <= 700;

    const isTablet =
        window.innerWidth > 700 &&
        window.innerWidth <= 1100;


    const particleCount =
        isMobile
            ? settings.mobileParticles
            : isTablet
                ? settings.tabletParticles
                : settings.desktopParticles;


    /* =====================================================
       PARTICLE DATA
       ===================================================== */

    const positions =
        new Float32Array(
            particleCount * 3
        );


    /* =====================================================
       CREATE GALAXY
       ===================================================== */

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const i3 =
            i * 3;


        /*
         * Distance from galaxy center.
         */

        const radius =
            Math.pow(
                Math.random(),
                0.55
            ) *
            settings.galaxyRadius;


        /*
         * Number of spiral arms.
         */

        const armCount = 5;


        const arm =
            i % armCount;


        const armAngle =
            (arm / armCount) *
            Math.PI *
            2;


        /*
         * Spiral curvature.
         */

        const spiral =
            radius * 0.45;


        const angle =
            armAngle +
            spiral +
            (Math.random() - 0.5) *
            0.7;


        /*
         * Horizontal position.
         */

        const x =
            Math.cos(angle) *
            radius;


        const z =
            Math.sin(angle) *
            radius;


        /*
         * Vertical depth.
         */

        const y =
            (Math.random() - 0.5) *
            settings.galaxyDepth *
            (1 - radius /
                settings.galaxyRadius);


        positions[i3] =
            x +
            (Math.random() - 0.5) *
            1.8;


        positions[i3 + 1] =
            y;


        positions[i3 + 2] =
            z;

    }


    /* =====================================================
       PARTICLE MATERIAL
       ===================================================== */

    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xe6d7ff,

            size: 0.035,

            transparent: true,

            opacity: 0.7,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    /* =====================================================
       PARTICLE SYSTEM
       ===================================================== */

    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    cosmicGroup.add(
        particles
    );


    /* =====================================================
       CENTRAL COSMIC GLOW
       ===================================================== */

    const glowGeometry =
        new THREE.SphereGeometry(
            1.6,
            32,
            32
        );


    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x7652a8,

            transparent: true,

            opacity: 0.055

        });


    const centralGlow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );


    centralGlow.scale.set(
        4,
        4,
        4
    );


    cosmicGroup.add(
        centralGlow
    );


    /* =====================================================
       CONSTELLATION POINTS
       ===================================================== */

    const constellationPoints = [

        {
            x: -5,
            y: 3,
            z: -2
        },

        {
            x: -2,
            y: 5,
            z: 1
        },

        {
            x: 1,
            y: 4,
            z: -3
        },

        {
            x: 4,
            y: 2,
            z: 0
        },

        {
            x: 2,
            y: -1,
            z: 2
        },

        {
            x: -1,
            y: -3,
            z: -1
        },

        {
            x: -4,
            y: -1,
            z: 1
        }

    ];


    /* =====================================================
       CONSTELLATION GEOMETRY
       ===================================================== */

    const constellationGeometry =
        new THREE.BufferGeometry();


    const constellationPositions = [];


    constellationPoints.forEach(
        point => {

            constellationPositions.push(

                point.x,

                point.y,

                point.z

            );

        }
    );


    constellationGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            constellationPositions,

            3

        )

    );


    /* =====================================================
       CONSTELLATION MATERIAL
       ===================================================== */

    const constellationMaterial =
        new THREE.PointsMaterial({

            color: 0xf5d98b,

            size: 0.09,

            transparent: true,

            opacity: 0.8,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    const constellation =
        new THREE.Points(

            constellationGeometry,

            constellationMaterial

        );


    cosmicGroup.add(
        constellation
    );


    /* =====================================================
       CONSTELLATION LINES
       ===================================================== */

    const linePositions = [];


    for (
        let i = 0;
        i < constellationPoints.length - 1;
        i++
    ) {

        const a =
            constellationPoints[i];


        const b =
            constellationPoints[i + 1];


        linePositions.push(

            a.x,
            a.y,
            a.z,

            b.x,
            b.y,
            b.z

        );

    }


    const lineGeometry =
        new THREE.BufferGeometry();


    lineGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            linePositions,

            3

        )

    );


    const lineMaterial =
        new THREE.LineBasicMaterial({

            color: 0xb58bd4,

            transparent: true,

            opacity: 0.08

        });


    const constellationLines =
        new THREE.LineSegments(

            lineGeometry,

            lineMaterial

        );


    cosmicGroup.add(
        constellationLines
    );

    /* =====================================================
   COSMIC ROOT NETWORK
   ===================================================== */

const rootGroup =
    new THREE.Group();

cosmicGroup.add(
    rootGroup
);


/* -----------------------------------------------------
   ROOT CURVE CREATOR
   ----------------------------------------------------- */

function createRootBranch(
    start,
    end,
    segments = 18,
    width = 0.025,
    opacity = 0.12
) {

    const points = [];


    for (
        let i = 0;
        i <= segments;
        i++
    ) {

        const t =
            i / segments;


        /*
         * Smooth interpolation.
         */

        const x =
            THREE.MathUtils.lerp(
                start.x,
                end.x,
                t
            );


        const y =
            THREE.MathUtils.lerp(
                start.y,
                end.y,
                t
            );


        const z =
            THREE.MathUtils.lerp(
                start.z,
                end.z,
                t
            );


        /*
         * Organic movement.
         */

        const wave =
            Math.sin(
                t * Math.PI
            );


        points.push(

            new THREE.Vector3(

                x,

                y +
                wave *
                0.55,

                z

            )

        );

    }


    const curve =
        new THREE.CatmullRomCurve3(
            points
        );


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(
                curve.getPoints(
                    segments * 2
                )
            );


    const material =
        new THREE.LineBasicMaterial({

            color: 0x8c5ab6,

            transparent: true,

            opacity: opacity,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    const line =
        new THREE.Line(
            geometry,
            material
        );


    rootGroup.add(
        line
    );


    return line;

}

/* -----------------------------------------------------
   MAIN COSMIC ROOTS
   ----------------------------------------------------- */

const rootLines = [];


rootLines.push(

    createRootBranch(

        {
            x: -8,
            y: -6,
            z: 1
        },

        {
            x: -4,
            y: -1,
            z: 0
        },

        22,

        0.025,

        0.15

    )

);


rootLines.push(

    createRootBranch(

        {
            x: 8,
            y: -6,
            z: -1
        },

        {
            x: 4,
            y: 2,
            z: 0
        },

        24,

        0.025,

        0.15

    )

);


rootLines.push(

    createRootBranch(

        {
            x: -6,
            y: -5,
            z: -2
        },

        {
            x: -1,
            y: -3,
            z: 0
        },

        20,

        0.02,

        0.1

    )

);


rootLines.push(

    createRootBranch(

        {
            x: 6,
            y: -5,
            z: 2
        },

        {
            x: 1,
            y: -1,
            z: -1
        },

        20,

        0.02,

        0.1

    )

);

/* -----------------------------------------------------
   SECONDARY ROOT BRANCHES
   ----------------------------------------------------- */

const secondaryRoots = [

    [
        {
            x: -8,
            y: -6,
            z: 1
        },

        {
            x: -6,
            y: -3,
            z: 1
        }
    ],

    [
        {
            x: -6,
            y: -3,
            z: 1
        },

        {
            x: -7,
            y: -1,
            z: 2
        }
    ],

    [
        {
            x: 8,
            y: -6,
            z: -1
        },

        {
            x: 6,
            y: -3,
            z: -1
        }
    ],

    [
        {
            x: 6,
            y: -3,
            z: -1
        },

        {
            x: 7,
            y: 0,
            z: -2
        }
    ],

    [
        {
            x: -6,
            y: -5,
            z: -2
        },

        {
            x: -3,
            y: -4,
            z: -3
        }
    ],

    [
        {
            x: 6,
            y: -5,
            z: 2
        },

        {
            x: 3,
            y: -3,
            z: 3
        }
    ]

];


secondaryRoots.forEach(
    branch => {

        createRootBranch(

            branch[0],

            branch[1],

            14,

            0.015,

            0.08

        );

    }
);


    /* =====================================================
       MOUSE MOVEMENT
       ===================================================== */

    const mouse = {

        x: 0,

        y: 0

    };


    const targetMouse = {

        x: 0,

        y: 0

    };


    window.addEventListener(

        "mousemove",

        event => {

            targetMouse.x =

                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 2;


            targetMouse.y =

                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 2;

        },

        {
            passive: true
        }

    );


    /* =====================================================
       SCROLL
       ===================================================== */

    let scrollProgress = 0;


    window.addEventListener(

        "scroll",

        () => {

            const maxScroll =

                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            if (maxScroll <= 0) {

                scrollProgress = 0;

                return;

            }


            scrollProgress =

                window.scrollY /
                maxScroll;

        },

        {
            passive: true
        }

    );


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(

        "resize",

        () => {

            camera.aspect =

                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(

                window.innerWidth,

                window.innerHeight

            );


            renderer.setPixelRatio(

                Math.min(

                    window.devicePixelRatio,

                    1.75

                )

            );

        }

    );


    /* =====================================================
       ANIMATION
       ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();

        /* -------------------------------------------------
   COSMIC ROOT BREATHING
   ------------------------------------------------- */

const rootPulse =
    0.85 +
    Math.sin(
        elapsed * 0.35
    ) *
    0.15;


rootGroup.children.forEach(
    (root, index) => {

        const baseOpacity =
            index < 4
                ? 0.15
                : 0.08;


        root.material.opacity =
            baseOpacity *
            rootPulse;

    }
);

/* -------------------------------------------------
   ROOT NETWORK MOVEMENT
   ------------------------------------------------- */

rootGroup.rotation.z =
    Math.sin(
        elapsed * 0.08
    ) *
    0.012;


rootGroup.rotation.y =
    Math.sin(
        elapsed * 0.05
    ) *
    0.008;


        /* -------------------------------------------------
           SMOOTH MOUSE
           ------------------------------------------------- */

        mouse.x +=

            (
                targetMouse.x -
                mouse.x
            ) * 0.025;


        mouse.y +=

            (
                targetMouse.y -
                mouse.y
            ) * 0.025;


        /* -------------------------------------------------
           GALAXY ROTATION
           ------------------------------------------------- */

        if (!prefersReducedMotion) {

            cosmicGroup.rotation.y +=
                settings.rotationSpeed;

        }


        cosmicGroup.rotation.z =

            Math.sin(
                elapsed * 0.08
            ) * 0.025;


        /* -------------------------------------------------
           MOUSE PARALLAX
           ------------------------------------------------- */

        if (!prefersReducedMotion) {

            cosmicGroup.rotation.y +=
                mouse.x * 0.0008;


            cosmicGroup.rotation.x +=
                (
                    -mouse.y * 0.0005
                );

        }


        /* -------------------------------------------------
           SCROLL CAMERA
           ------------------------------------------------- */

        if (!prefersReducedMotion) {

            camera.position.z =
                settings.cameraZ -
                scrollProgress * 5;


            camera.position.y =
                scrollProgress * 1.5;

        }


        /* -------------------------------------------------
           COSMIC GLOW
           ------------------------------------------------- */

        const glowScale =

            4 +

            Math.sin(
                elapsed * 0.5
            ) * 0.15;


        centralGlow.scale.set(

            glowScale,

            glowScale,

            glowScale

        );


        /* -------------------------------------------------
           RENDER
           ------------------------------------------------- */

        renderer.render(

            scene,

            camera

        );

    }


    animate();

});