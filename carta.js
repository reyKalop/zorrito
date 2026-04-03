let popupMostrado = false;
import { crearPersonaje } from "./engine/engine.js";
import { popupInicio, secretoFoto, secretoPersonaje } from "./engine/popups.js";

window.playMusic = async function () {
    const music = document.getElementById("music");
    const btn = document.querySelector(".music-btn");

    try {
        if (music.paused) {
            await music.play(); // 🔥 importante
            btn.innerText = "⏸️ Pausar música";
        } else {
            music.pause();
            btn.innerText = "🎵 Reproducir música";
        }
    } catch (e) {
        console.log("Error al reproducir:", e);
    }
}

document.addEventListener("DOMContentLoaded", () => {


    /* 🌸 FLORES */
    const container = document.querySelector('.flowers-container');
    const flowers = ["🌸", "🌷", "🌹", "🍃"];

    function createFlower() {
        if (!container) return; // 🔥 evita error

        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = (4 + Math.random() * 6) + "s";
        flower.style.fontSize = (15 + Math.random() * 25) + "px";

        container.appendChild(flower);

        setTimeout(() => flower.remove(), 10000);
    }

    setInterval(createFlower, 150);

    /* 🎬 OBSERVERS */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    /* 📄 TEXTOS */
    const textCards = document.querySelectorAll(".card.text");

    textCards.forEach(card => {
        const file = card.getAttribute("data-file");

        fetch(file)
            .then(res => res.text())
            .then(data => {
                card.innerHTML = data;

                observer.observe(card);

                const images = card.querySelectorAll(".img-center img");
                images.forEach(img => imgObserver.observe(img));
            })
            .catch(err => console.error("Error:", file));

    });

    /* 📜 CARDS */
    const cards = document.querySelectorAll(".card:not(.text)");
    cards.forEach(card => observer.observe(card));

 <video id="introGif" autoplay muted loop playsinline></video>
/* 🎬 INTRO VIDEO */
const gifs = [
    "fotos/GIFIntro/GIF1.mp4",
    "fotos/GIFIntro/GIF2.mp4",
    "fotos/GIFIntro/GIF3.mp4",
    "fotos/GIFIntro/GIF4.mp4"
];

const introGif = document.getElementById("introGif");
const intro = document.getElementById("intro");

if (introGif) {
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    introGif.src = randomGif;
    introGif.load(); // 🔥 IMPORTANTE para que el video cargue
}

if (intro && !popupMostrado) {
    popupMostrado = true;

    setTimeout(() => {
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.remove();
            popupInicio();
        }, 1000);

    }, 2000);
}

/* 🔥 Evento correcto para video */
if (introGif) {
    introGif.onloadeddata = () => {
        setTimeout(() => {
            intro.style.opacity = "0";

            setTimeout(() => {
                intro.remove();
                popupInicio();
            }, 1500);

        }, 1000);
    };
}
    /* 🦊 PERSONAJES */
    if (typeof crearPersonaje === "function") {
        crearPersonaje({
            x: 10,
            idle: "personajes/Ligth/idle.png",
            walk: "personajes/Ligth/walk.png",
            love: "personajes/Ligth/love.png",
            onClick: secretoPersonaje
        });

        crearPersonaje({
            x: 70,
            idle: "personajes/L/idle.png",
            walk: "personajes/L/walk.png",
            love: "personajes/L/love.png",

        });

    }
    /* 💌 MENSAJE SECRETO FOTO 4 */
    const foto4 = document.querySelector('img[src="fotos/foto4.jpg"]');

    if (foto4) {
        console.log("foto4 detectada"); // 🔍 debug

        foto4.style.cursor = "pointer";

        foto4.addEventListener("click", () => {
            console.log("click en foto4"); // 🔍 debug
            secretoFoto();
        });
    }


});
