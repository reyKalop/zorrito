const personajes = [];

export function crearPersonaje(config) {
    const div = document.createElement("div");
    div.className = "character";

    const img = document.createElement("img");
    img.src = config.idle;

    div.appendChild(img);
    document.body.appendChild(div);

    const p = {
        el: div,
        img: img,
        x: config.x,
        target: config.x,
        speed: Math.random() * 0.05 + 0.02,
        estado: "idle",
        sprites: config,
        drag: false
    };

    personajes.push(p);

    // 🖱️ DRAG (única interacción permitida)
    div.addEventListener("mousedown", () => {
        p.drag = true;
    });
    // 🔥 CLICK PERSONALIZADO
    if (config.onClick) {
        div.addEventListener("click", config.onClick);
    }
    document.addEventListener("mouseup", () => {
        p.drag = false;
    });

    document.addEventListener("mousemove", (e) => {
        if (p.drag) {
            p.x = (e.clientX / window.innerWidth) * 100;
        }
    });
}

// ❤️ corazones
export function heart(x, y) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💖";

    h.style.left = x + "px";
    h.style.top = y + "px";

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 250);
}

// 🧠 IA TOTALMENTE AUTÓNOMA
export function update() {
    personajes.forEach((p, i) => {
        const other = personajes[(i + 1) % personajes.length];

        if (!p.drag) {
            // comportamiento natural
            p.target += (other.x - p.target) * 0.005;

            if (Math.random() < 0.002) {
                p.target = Math.random() * 100;
            }

            // movimiento
            if (Math.abs(p.target - p.x) > 0.2) {
                p.x += (p.target > p.x ? p.speed : -p.speed);
                p.estado = "walk";
            } else {
                p.estado = "idle";
            }
        }

        // 💞 interacción entre personajes
        if (Math.abs(p.x - other.x) < 2) {
            p.estado = "love";
            other.estado = "love";

            const rect = p.el.getBoundingClientRect();
            heart(rect.left + 20, rect.top);
        }

        // 🎭 cambiar sprite
        if (p.estado === "idle") p.img.src = p.sprites.idle;
        if (p.estado === "walk") p.img.src = p.sprites.walk;
        if (p.estado === "love") p.img.src = p.sprites.love;

        // flip
        if (p.target > p.x) {
            p.el.style.transform = "scaleX(1)";
        } else {
            p.el.style.transform = "scaleX(-1)";
        }

        p.el.style.left = p.x + "%";
    });

    requestAnimationFrame(update);
}

update();