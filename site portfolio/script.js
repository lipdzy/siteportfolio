// Script para a MóveisArte - Site Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filtro-btn');
    const produtoCards = document.querySelectorAll('.produto-card');
    const formContato = document.getElementById('form-contato');
    const formNewsletter = document.getElementById('form-newsletter');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.dot');
    const projetoSlides = document.querySelectorAll('.projeto-slide');

    // Variáveis
    let currentSlide = 0;
    const totalSlides = projetoSlides.length;

    // Menu Mobile Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Remover classe active de todos os links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Adicionar classe active ao link clicado
            this.classList.add('active');
        });
    });

    // Mudar estilo do header ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Filtro de Produtos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            produtoCards.forEach(card => {
                if (filter === 'todos') {
                    card.style.display = 'block';
                } else if (card.dataset.categoria === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Slider de Projetos
    function showSlide(index) {
        // Esconder todos os slides
        projetoSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Remover classe active de todos os dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar o slide atual
        projetoSlides[index].style.display = 'block';
        projetoSlides[index].classList.add('active');
        
        // Adicionar classe active ao dot atual
        dots[index].classList.add('active');
        
        // Atualizar slide atual
        currentSlide = index;
    }

    // Inicializar o primeiro slide
    showSlide(0);

    // Controles do slider
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newSlide = currentSlide - 1;
            if (newSlide < 0) newSlide = totalSlides - 1;
            showSlide(newSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newSlide = currentSlide + 1;
            if (newSlide >= totalSlides) newSlide = 0;
            showSlide(newSlide);
        });
    }

    // Dots do slider
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.dataset.slide);
            showSlide(slideIndex);
        });
    });

    // Autoplay do slider
    setInterval(function() {
        let newSlide = currentSlide + 1;
        if (newSlide >= totalSlides) newSlide = 0;
        showSlide(newSlide);
    }, 5000);

    // Ativar link de navegação com base na seção atual
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Formulário de Contato - Envio para WhatsApp
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Validação básica
            if (!nome || !email || !telefone || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos do formulário.');
                return;
            }
            
            // Formatação da mensagem para WhatsApp
            let mensagemWhatsApp = 
                `*Contato via Site - MóveisArte*%0A%0A` +
                `*Nome:* ${nome}%0A` +
                `*Email:* ${email}%0A` +
                `*Telefone:* ${telefone}%0A` +
                `*Assunto:* ${assunto}%0A%0A` +
                `*Mensagem:*%0A${mensagem}`;
            
            // URL do WhatsApp com a mensagem formatada
            const whatsappUrl = `https://wa.me/5583991816152?text=${mensagemWhatsApp}`;
            
            // Abrir WhatsApp em nova janela
            window.open(whatsappUrl, '_blank');
            
            // Limpar formulário
            formContato.reset();
        });
    }

    // Formulário de Newsletter
    if (formNewsletter) {
        formNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validação básica
            if (!email) {
                alert('Por favor, digite seu email.');
                return;
            }
            
            // Simular envio bem-sucedido
            alert('Obrigado por se inscrever em nossa newsletter!');
            
            // Limpar formulário
            formNewsletter.reset();
        });
    }

    // Animação Scroll Suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada para elementos ao rolar
    const fadeInElements = document.querySelectorAll('.section-header, .produto-card, .projeto-slide, .sobre-content, .contato-container');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        fadeInObserver.observe(element);
    });
    
    // Classe para animar elementos quando visíveis
    document.addEventListener('scroll', function() {
        fadeInElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    });
    
    // Verificar se elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});

// Definição de estilo para elementos com fade-in
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);