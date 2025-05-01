
document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".trigger");
  const dropdownContent = document.querySelector(".dropdown-content");

  trigger.addEventListener("click", function () {
    dropdownContent.classList.toggle("open");
  });

  document.addEventListener("click", function (event) {
    if (!dropdownContent.contains(event.target) && !trigger.contains(event.target)) {
      dropdownContent.classList.remove("open");
    }
  });

  const tout = document.querySelector(".tout");
  const bouton = document.getElementById("suivant");
  let actif = false;

  if (bouton && tout) {
    bouton.addEventListener("click", () => {
      actif = !actif;
      tout.classList.toggle("active", actif);
      bouton.textContent = actif ? "Précédent" : "Suivant";
    });
  }

  const ball = document.querySelector('.cursor-ball');
  if (ball) {
    window.addEventListener('mousemove', (e) => {
      ball.style.top = `${e.clientY}px`;
      ball.style.left = `${e.clientX}px`;
    });
  }
});