
document.addEventListener("DOMContentLoaded", () => {
  // Menu para celular
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("navigation");
  const navLinks = navigation.querySelectorAll("a");

  function closeMenu() {
    navigation.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      closeMenu();
    }
  });

  // Animações ao aparecer na tela
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Botão que faz flores caírem
  const flowerButton = document.getElementById("flower-button");
  const flowerContainer = document.getElementById("flower-container");

  const flowerSymbols = ["🌻", "✿", "🌼", "☀", "✦", "♡"];

  let flowerAnimationRunning = false;

  flowerButton.addEventListener("click", () => {
    if (flowerAnimationRunning) return;

    flowerAnimationRunning = true;
    flowerButton.disabled = true;
    flowerButton.innerHTML = "Um montão de carinho para você! ♡";

    const numberOfFlowers = 42;

    for (let i = 0; i < numberOfFlowers; i++) {
      const flower = document.createElement("span");

      flower.className = "falling-flower";
      flower.textContent =
        flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];

      flower.style.left = `${Math.random() * 100}%`;
      flower.style.fontSize = `${16 + Math.random() * 20}px`;
      flower.style.animationDuration = `${3 + Math.random() * 4}s`;
      flower.style.animationDelay = `${Math.random() * 2}s`;
      flower.style.setProperty(
        "--drift",
        `${Math.random() * 180 - 90}px`
      );

      flowerContainer.appendChild(flower);

      flower.addEventListener("animationend", () => {
        flower.remove();
      });
    }

    window.setTimeout(() => {
      flowerButton.disabled = false;
      flowerButton.innerHTML =
        'Enviar um pouquinho de carinho <span>✿</span>';

      flowerAnimationRunning = false;
    }, 6500);
  });

  // Evita que imagens ausentes deixem espaços estranhos
  const memoryImages = document.querySelectorAll(".memory-image");

  memoryImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.alt = "Adicione sua foto na pasta fotos para exibi-la aqui";
      image.style.objectFit = "contain";
      image.style.padding = "20px";
    });
  });
});
