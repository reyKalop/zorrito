// 🔥 CREAR POPUP GENERAL
export function crearPopup(contenidoHTML) {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    const box = document.createElement("div");
    box.className = "popup-box";

    box.innerHTML = `
        <button class="close">✖</button>
        ${contenidoHTML}
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    box.querySelector(".close").onclick = () => overlay.remove();
}
// 💌 MENSAJE SECRETO FOTO 
export function secretoFoto() {
    crearPopup(`
        <h2>💖</h2> 
        <p>Espero que cuando estemos juntos la felicidad abunde tanto como ahora, incluso más, gracias por existir Kayle</p>
    `);
}

export function secretoPersonaje() {
    crearPopup(`
        <h2>🦊</h2>
        <p>Vales demasiado, y eres MUYYYYYYYYYY hermoso</p>
    `);

    // 🖼️ agregar imágenes laterales
    crearLaterales();

    // 💥 explosión
    setTimeout(() => {
        const box = document.querySelector(".popup-box");
        if (box) explosionCorazones(box);
    }, 100);
}
function explosionCorazones(container) {
    const duration = 3000; // ⏱ 3 segundos
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        for (let i = 0; i < 6; i++) { // 💥 cantidad por ráfaga
            const el = document.createElement("div");
            el.className = "heart-explosion";
            el.innerHTML = Math.random() > 0.5 ? "💖" : "✨";

            const rect = container.getBoundingClientRect();

            // 🔥 sale desde el centro del popup
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const offsetX = (Math.random() - 0.5) * 300;
            const offsetY = (Math.random() - 0.7) * 300;

            el.style.left = x + "px";
            el.style.top = y + "px";

            el.style.setProperty("--x", offsetX + "px");
            el.style.setProperty("--y", offsetY + "px");

            document.body.appendChild(el);

            setTimeout(() => el.remove(), 1200);
        }

    }, 120);
}

// 🔐 POPUP DE ACCESO (POST GIF)
let popupActivo = false;

export function popupInicio() {
    if (popupActivo) return; // 🔥 evita duplicado
    popupActivo = true;

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    const box = document.createElement("div");
    box.className = "popup-circular";

    box.innerHTML = `
    <div class="heart-wrapper">
        <img src="fotos/fotoEspecial/corazon.png" class="heart-img">

        <div class="texto">ON</div>
    </div>

    <input type="text" placeholder="¿tu apodo?" id="clave">
    <p id="error"></p>
`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const texto = box.querySelector(".texto");
    const input = box.querySelector("#clave");
    const error = box.querySelector("#error");

    texto.onclick = () => {
        if (input.value.toLowerCase() === "zorrito") {
            overlay.remove();
        } else {
            error.textContent = "incorrecto 💔";
        }
    };
}
function crearLaterales() {
    const left = document.createElement("img");
    const right = document.createElement("img");

    left.src = "personajes/L/secret.png";
    right.src = "personajes/Ligth/secret.png";

    left.className = "side-screen left";
    right.className = "side-screen right";

    document.body.appendChild(left);
    document.body.appendChild(right);

    // 💀 eliminar cuando se cierre popup
    const closeBtn = document.querySelector(".popup-box .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            left.remove();
            right.remove();
        });
    }
}