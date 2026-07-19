document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('sales-popup');
    const nameEl = document.getElementById('buyer-name');
    const timeEl = document.getElementById('buyer-time');

    // Nomes e tempos aleatórios
    const names = [
        "Maria G.", "Carmen L.", "Josefa R.", "Ana M.", "Isabel T.", 
        "Laura P.", "Marta C.", "Elena B.", "Lucia D.", "Sofia F.",
        "Antonio S.", "Carlos M.", "Manuel J."
    ];
    
    // Para não repetir a mesma ordem
    let shuffledNames = names.sort(() => 0.5 - Math.random());
    let nameIndex = 0;

    let baseDelay = 4000; // 4 segundos inicial após o primeiro
    let increment = 6000; // aumenta 6 segundos a cada ciclo
    
    // Função para mostrar o popup
    function showPopup() {
        if (nameIndex >= shuffledNames.length) {
            shuffledNames = names.sort(() => 0.5 - Math.random());
            nameIndex = 0;
        }

        // Randomizar tempo (Hace 1 minuto, Hace 5 minutos, etc)
        const randomMins = Math.floor(Math.random() * 15) + 1;
        
        nameEl.innerText = shuffledNames[nameIndex];
        timeEl.innerText = `Hace ${randomMins} minuto${randomMins > 1 ? 's' : ''}`;
        
        nameIndex++;

        // Remove classe oculta e mostra
        popup.classList.remove('hidden');
        // Força um reflow para animar
        void popup.offsetWidth; 
        popup.classList.add('show');

        // Esconder após 3.5 segundos
        setTimeout(() => {
            popup.classList.remove('show');
            // Espera a animação de saída terminar
            setTimeout(() => {
                popup.classList.add('hidden');
                scheduleNextPopup();
            }, 500); 
        }, 3500);
    }

    function scheduleNextPopup() {
        setTimeout(() => {
            showPopup();
        }, baseDelay);
        
        // Aumenta o tempo do próximo (ex: 4s, 10s, 16s...)
        baseDelay += increment;
    }

    // Primeiro popup aparece rapidamente após carregar a página (1 segundo)
    setTimeout(() => {
        showPopup();
    }, 1000);
});

// ─── FAQ Accordion
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotated'));

    if (!isOpen) {
        answer.classList.add('open');
        icon.classList.add('rotated');
    }
}

// ─── Testimonials Auto-Scroll
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonials-grid');
    if (carousel) {
        setInterval(() => {
            // Check if we reached the end (allowing 10px margin of error)
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                // reset to start
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // scroll one card width
                const card = carousel.querySelector('.testimonial-card');
                if(card) {
                    const cardWidth = card.clientWidth + 20; // 20 is the CSS gap
                    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        }, 3500); // Scrolls every 3.5 seconds
    }
});
