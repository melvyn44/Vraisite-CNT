document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('applicationForm');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const motivation = document.getElementById('motivation').value.trim();
  
      const webhookURL = 'https://discord.com/api/webhooks/1367282138571079690/VqX2YDJXIWYqVeVi1K01UtPVlEhXAmCr1utI5PgkcviRplF81Idm25US0Q4RrwCwMgsV'; // 🔁 Remplace ça
  
      const message = {
        content: `📥 **Nouvelle candidature** :
  **Nom :** ${name}
  **Email :** ${email}
  **Motivation :**\n${motivation}`
      };
  
      try {
        const response = await fetch(webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        });
  
        if (response.ok) {
          alert("✅ Candidature envoyée avec succès !");
          form.reset();
        } else {
          alert(`❌ Erreur Discord Webhook : ${response.status}`);
        }
      } catch (error) {
        console.error('Erreur d’envoi :', error);
        alert("❌ Une erreur s'est produite lors de l'envoi.");
      }
    });
  });
  


  
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