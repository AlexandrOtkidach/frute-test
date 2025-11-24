const switchButtons = document.querySelectorAll(".header-top_lang-switcher>*");

switchButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target);
    switchButtons.forEach((button) => {
      button.classList.remove("active");
      if (button == e.target) {
        button.classList.add("active");
      }
    });
  });
});

function initParallaxForImages(
  selector,
  defaultIntensity = 20,
  defaultDirection = "normal"
) {
  const images = document.querySelectorAll(selector);
  if (!images.length) return;

  const getDirection = (dir) => {
    if (dir === "reverse") return { x: -1, y: -1 };
    if (typeof dir === "object") return { x: dir.x ?? 1, y: dir.y ?? 1 };
    return { x: 1, y: 1 };
  };

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  const lerp = (start, end, amount) => start + (end - start) * amount;

  document.addEventListener("mousemove", (e) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;

    targetX = normX;
    targetY = normY;
  });

  document.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function animate() {
    currentX = lerp(currentX, targetX, 0.07); 
    currentY = lerp(currentY, targetY, 0.07);

    images.forEach((img) => {
      const depth = img.dataset.depth ? parseFloat(img.dataset.depth) : 1;
      const intensity = img.dataset.intensity
        ? parseFloat(img.dataset.intensity)
        : defaultIntensity;

      const dir = img.dataset.direction
        ? getDirection(img.dataset.direction)
        : getDirection(defaultDirection);

      const x = currentX * intensity * depth * dir.x;
      const y = currentY * intensity * depth * dir.y;

      img.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

initParallaxForImages(
  ".first-section_parallax img,.second-section_parallax img",
  25,
  "normal"
);

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

document.querySelectorAll(".second-section_button-buy").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".second-section_card");
    const productImg = card.querySelector(".second-section_card-image img");
    const cart = document.querySelector(".header-bottom_basket");

    if (!productImg || !cart) return;

    const imgRect = productImg.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = card.cloneNode(true);
    flyingImg.classList.add("fly-image");

    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.transform = `
        translate(${cartRect.left - imgRect.left - 50}px,
                  ${cartRect.top - imgRect.top - 100}px)
        scale(0.1)
      `;
      flyingImg.style.opacity = "0";
    });

    flyingImg.addEventListener("transitionend", () => flyingImg.remove());
  });
});
