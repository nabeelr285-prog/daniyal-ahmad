// /js/script.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Image Asset Configuration Registry
    const IMAGES = {
        heroPortrait: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        aboutPortrait: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        dashboard1: "https://images.unsplash.com/photo-1543286386-2e6713dc54bc?auto=format&fit=crop&w=1200&q=80",
        dashboard2: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        resumePreview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
    };

    // Lazy Allocation to DOM
    const elAbout = document.getElementById("aboutPortrait");
    if(elAbout) elAbout.src = IMAGES.aboutPortrait;
    const elDash1 = document.getElementById("projDashboard1");
    if(elDash1) elDash1.src = IMAGES.dashboard1;
    const elDash2 = document.getElementById("projDashboard2");
    if(elDash2) elDash2.src = IMAGES.dashboard2;
    const elResume = document.getElementById("resumeImg");
    if(elResume) elResume.src = IMAGES.resumePreview;

    // 2. Preloader Pipeline Execution
    const loaderBar = document.getElementById("loaderBar");
    const loadingScreen = document.getElementById("loadingScreen");
    if (loaderBar && loadingScreen) {
        let prog = 0;
        const interval = setInterval(() => {
            prog += 8;
            loaderBar.style.width = Math.min(prog, 100) + "%";
            if (prog >= 100) {
                clearInterval(interval);
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => {
                        loadingScreen.style.display = "none";
                        initializeHeroAnimations();
                    }
                });
            }
        }, 30);
    } else {
        initializeHeroAnimations();
    }

    // 3. Responsive Menu Controllers
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    if(hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // 4. Typewriter Dynamic Logic Core
    const typewriterEl = document.getElementById("typewriter");
    if (typewriterEl) {
        const roles = [
            "Business Analytics Student",
            "Data Analyst",
            "Power BI Enthusiast",
            "Data Storyteller",
            "Future Business Intelligence Professional"
        ];
        let roleIdx = 0, charIdx = 0, isDeleting = false;
        function type() {
            const currentRole = roles[roleIdx];
            if (isDeleting) {
                typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
            }
            let typeSpeed = isDeleting ? 40 : 80;
            if (!isDeleting && charIdx === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                typeSpeed = 400;
            }
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }

    // 5. GSAP Layout Animation Core Engagements
    function initializeHeroAnimations() {
        if(document.querySelector(".reveal-text")) {
            gsap.from(".reveal-text", { y: 60, opacity: 0, duration: 1, ease: "power4.out" });
            gsap.from(".reveal-sub", { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power4.out" });
            gsap.from(".hero-ctas", { y: 20, opacity: 0, duration: 1, delay: 0.5, ease: "power4.out" });
        }
    }

    // Scroll Trigger Registrations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        document.querySelectorAll(".scroll-reveal").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }

    // 6. Accordion Functional Loop Logic
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            item.classList.toggle("active");
        });
    });

    // 7. Interactive Magnetic Elements Loop
    document.querySelectorAll(".magnetic").forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });

    // Back to top structural utility
    const btt = document.getElementById("backToTop");
    if(btt) {
        btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 8. Three.js Lightweight Analytics Mesh Visualization
    const container3d = document.getElementById("three-container");
    if (container3d && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container3d.clientWidth / container3d.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container3d.clientWidth, container3d.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container3d.appendChild(renderer.domElement);

        // Geometries
        const geometryCube = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        const materialCube = new THREE.MeshPhongMaterial({
            color: 0x4F46E5,
            shininess: 100,
            transparent: true,
            opacity: 0.85
        });
        const cube = new THREE.Mesh(geometryCube, materialCube);
        scene.add(cube);

        const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
        const sphereMat = new THREE.MeshPhongMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.6, wireframe: true });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.x = 4;
        sphere.position.y = 2;
        scene.add(sphere);

        // Lighting System
        const lightAmbient = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(lightAmbient);
        const lightDir = new THREE.DirectionalLight(0xffffff, 1);
        lightDir.position.set(5, 10, 7);
        scene.add(lightDir);

        camera.position.z = 6;

        // Interaction Event Listeners
        let targetX = 0, targetY = 0;
        window.addEventListener("mousemove", (e) => {
            targetX = (e.clientX / window.innerWidth) - 0.5;
            targetY = (e.clientY / window.innerHeight) - 0.5;
        });

        function animate3D() {
            requestAnimationFrame(animate3D);
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.008;
            sphere.rotation.y -= 0.003;
            
            cube.position.x += (targetX * 2 - cube.position.x) * 0.05;
            cube.position.y += (-targetY * 2 - cube.position.y) * 0.05;
            
            renderer.render(scene, camera);
        }
        animate3D();

        window.addEventListener("resize", () => {
            camera.aspect = container3d.clientWidth / container3d.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container3d.clientWidth, container3d.clientHeight);
        });
    }
});