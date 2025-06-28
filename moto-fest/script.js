// Carrossel de Patrocinadores
class Carousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.items = document.querySelectorAll('.sponsor-item');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('carouselDots');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.totalSlides = this.items.length;
        this.maxIndex = Math.max(0, this.totalSlides - this.itemsPerView);
        
        this.init();
    }
    
    getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }
    
    init() {
        this.createDots();
        this.updateCarousel();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    createDots() {
        const totalDots = Math.ceil(this.totalSlides / this.itemsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * (100 / this.itemsPerView);
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Atualizar botões
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
    }
    
    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = Math.min(index, this.maxIndex);
        this.updateCarousel();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Touch/swipe para mobile
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Responsividade
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.maxIndex = Math.max(0, this.totalSlides - this.itemsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateCarousel();
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    startAutoPlay() {
        setInterval(() => {
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateCarousel();
        }, 5000); // Muda a cada 5 segundos
    }
}

// Animações de scroll
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeElements();
        this.setupSmoothScroll();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos para animação
        const elements = document.querySelectorAll('.info-section, .form-section, .sponsor-item');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setupSmoothScroll() {
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Utilitários
class Utils {
    static formatPhone(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        input.value = value;
    }
    
    static setupPhoneMask() {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', () => this.formatPhone(phoneInput));
        }
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Swiper.js para patrocinadores
    if (window.Swiper) {
        new Swiper('.sponsors-swiper', {
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            speed: 3000,
            slidesPerView: 4,
            spaceBetween: 20,
            allowTouchMove: false,
            grabCursor: false,
            centeredSlides: false,
            breakpoints: {
                1024: { slidesPerView: 4 },
                700: { slidesPerView: 2 },
                0: { slidesPerView: 1 }
            },
        });
    }
    
    // Máscara de telefone (opcional)
    const whatsInput = document.getElementById('whats');
    if (whatsInput) {
        whatsInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 2) value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
            if (value.length > 10) value = value.slice(0, 10) + '-' + value.slice(10);
            this.value = value;
        });
    }
    
    // Inicializar animações
    new ScrollAnimations();
    
    // Configurar máscara de telefone
    Utils.setupPhoneMask();
    
    // Adicionar efeito de parallax no header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        header.style.transform = `translateY(${rate}px)`;
    });
    
    // Adicionar contador regressivo para o evento
    this.setupCountdown();
    
    // Scroll suave para navegação do header
    setupHeaderSmoothScroll();
    
    setupInfiniteCarousel();
});

// Contador regressivo
function setupCountdown() {
    const eventDate = new Date('2024-12-15T09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Você pode adicionar um elemento HTML para mostrar o contador
        // const countdownElement = document.getElementById('countdown');
        // if (countdownElement) {
        //     countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        // }
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            // Evento já aconteceu
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Scroll suave para navegação do header
function setupHeaderSmoothScroll() {
    document.querySelectorAll('.fusion-nav-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Carrossel Infinito de Patrocinadores
function setupInfiniteCarousel() {
    const track = document.querySelector('.carousel-infinite');
    const container = document.getElementById('sponsorsCarousel');
    if (track && container) {
        let content = track.innerHTML;
        // Duplicar os itens para looping visual
        track.innerHTML = content + content;
        // Forçar reflow para garantir que scrollWidth está correto
        void track.offsetWidth;
        // Calcular largura do conteúdo original
        const totalWidth = track.scrollWidth / 2;
        // Aplicar animação dinâmica
        track.style.animation = `carouselScrollPx 15s linear infinite`;
        track.style.setProperty('--carousel-width', `${totalWidth}px`);
    }
}

// Adicionar keyframes dinâmicos para o carrossel infinito
function injectCarouselKeyframes() {
    const style = document.createElement('style');
    style.innerHTML = `@keyframes carouselScrollPx {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-1 * var(--carousel-width, 1000px))); }
    }`;
    document.head.appendChild(style);
}

injectCarouselKeyframes(); 