document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("projectModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = document.querySelector(".close-modal");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const projectCards = document.querySelectorAll(".project-card");

    const projects = [
        {
            title: "COASTAL BURGERS",
            desc: "Hamburguesería",
            images: ["coastal1.png", "coastal2.png", "coastal3.png", "coastal4.png", "coastal5.png", "coastal6.png"]
        },
        {
            title: "ÉPOQUE",
            desc: "Cafetería de especialidad",
            images: ["epoque1.png", "epoque2.png", "epoque3.png", "epoque4.png", "epoque5.png", "epoque6.png"]
        },
        {
            title: "HERBACÉE",
            desc: "Spa Botánico",
            images: ["herbacee1.png", "herbacee2.png", "herbacee3.png"]
        }
    ];

    let currentProject = 0;
    let currentImage = 0;

    function showImage() {
        const project = projects[currentProject];
        const image = project.images[currentImage];
        
        modalImg.classList.remove("fade-in");
        
        setTimeout(function() {
            modalImg.src = image;
            modalImg.classList.add("fade-in");
        }, 50);

        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc + " (" + (currentImage + 1) + " / " + project.images.length + ")";
    }

    function openModal(index) {
        currentProject = index;
        currentImage = 0;
        showImage();
        modal.classList.add("show");
    }

    function closeModal() {
        modal.classList.remove("show");
    }

    projectCards.forEach(function(card, index) {
        card.addEventListener("click", function() {
            openModal(index);
        });
    });

    prevBtn.addEventListener("click", function() {
        const project = projects[currentProject];
        currentImage = (currentImage - 1 + project.images.length) % project.images.length;
        showImage();
    });

    nextBtn.addEventListener("click", function() {
        const project = projects[currentProject];
        currentImage = (currentImage + 1) % project.images.length;
        showImage();
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // CONTACT MODAL
    const contactModal = document.getElementById("contactModal");
    const openContactBtn = document.getElementById("openContactBtn");
    const contactCloseBtn = document.querySelector(".contact-close");
    const contactForm = document.getElementById("contactForm");

    function openContactModal() {
        contactModal.classList.add("show");
    }

    function closeContactModal() {
        contactModal.classList.remove("show");
    }

    openContactBtn.addEventListener("click", openContactModal);
    contactCloseBtn.addEventListener("click", closeContactModal);

    contactModal.addEventListener("click", function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // El servicio envía los mensajes a la casilla de Bowl Studio.
        const FORM_ENDPOINT = "/api/contact";

        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "ENVIANDO...";
        submitBtn.disabled = true;

        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
        })
        .then(function(response) {
            if (response.ok) {
                alert("¡Gracias! Te vamos a contactar pronto.");
                contactForm.reset();
                closeContactModal();
            } else {
                alert("Hubo un problema al enviar. Probá de nuevo o escribinos directo a bowlstudio.ar@gmail.com");
            }
        })
        .catch(function() {
            alert("Hubo un problema al enviar. Probá de nuevo o escribinos directo a bowlstudio.ar@gmail.com");
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    const whatsappButton = document.getElementById("whatsappButton");
    let lastScrollY = window.scrollY;
    let scrollTimeout = null;

    function showWhatsappButton() {
        whatsappButton.classList.remove("hide-whatsapp");
    }

    function hideWhatsappButton() {
        whatsappButton.classList.add("hide-whatsapp");
    }

    window.addEventListener("scroll", function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY + 10) {
            hideWhatsappButton();
        }

        lastScrollY = currentScrollY;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(showWhatsappButton, 300);
    });
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(showWhatsAppButton, 300);
  });

// --- INTEGRACIÓN FORMSPREE ---
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('¡Gracias! Tu mensaje fue enviado con éxito.');
          form.reset();
          const modal = document.getElementById('contactModal');
          if (modal) modal.style.display = 'none';
        } else {
          alert('Ocurrió un error al enviar el formulario.');
        }
      } catch (error) {
        alert('Hubo un problema de red. Intentá de nuevo.');
      }
    });
  }