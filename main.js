const switchButtons = document.querySelectorAll('.header-top_lang-switcher>*')

switchButtons.forEach(item => {
    item.addEventListener('click', (e)=> {
        console.log(e.target)
        switchButtons.forEach(button => {
            button.classList.remove('active')
            if(button == e.target){
                button.classList.add('active')
            }
        })
    })
})

function initParallaxForImages(selector, defaultIntensity = 20, defaultDirection = "normal") {
  const images = document.querySelectorAll(selector);
  if (!images.length) return;

  // вычисление направления
  const getDirection = (dir) => {
    if (dir === "reverse") return { x: -1, y: -1 };
    if (typeof dir === "object") return { x: dir.x ?? 1, y: dir.y ?? 1 };
    return { x: 1, y: 1 }; // normal
  };

  document.addEventListener("mousemove", (e) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;

    images.forEach((img) => {
      const depth = img.dataset.depth ? parseFloat(img.dataset.depth) : 1;
      const intensity = img.dataset.intensity
        ? parseFloat(img.dataset.intensity)
        : defaultIntensity;

      const dir = img.dataset.direction
        ? getDirection(img.dataset.direction)
        : getDirection(defaultDirection);

      img.style.transform = `
        translate(
          ${normX * intensity * depth * dir.x}px,
          ${normY * intensity * depth * dir.y}px
        )
      `;
    });
  });

  document.addEventListener("mouseleave", () => {
    images.forEach((img) => (img.style.transform = "translate(0,0)"));
  });
}
initParallaxForImages('.first-section_parallax img', 25, "normal");