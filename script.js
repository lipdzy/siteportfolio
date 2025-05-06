// Script para funcionalidades interativas do site

document.addEventListener('DOMContentLoaded', function() {

    // Redirecionar para o WhatsApp ao clicar em qualquer imagem
    const allImages = document.querySelectorAll('img');
    const whatsappNumber = '5583991816152';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    const tooltip = document.getElementById('tooltip');
    
    allImages.forEach(image => {
        // Adicionar tooltip ao passar o mouse
        image.addEventListener('mouseenter', function(e) {
            tooltip.style.display = 'block';
            tooltip.style.left = (e.pageX + 10) + 'px';
            tooltip.style.top = (e.pageY + 10) + 'px';
        });
        
        image.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.pageX + 10) + 'px';
            tooltip.style.top = (e.pageY + 10) + 'px';
        });
        
        image.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
        
        // Redirecionar para o WhatsApp ao clicar
        image.addEventListener('click', function() {
            window.open(whatsappUrl, '_blank');
        });
    });

    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Scroll suave para links âncora
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adicionar offset para considerar o header fixo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu móvel se estiver aberto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Aqui você pode adicionar código para enviar o formulário via AJAX
                // Por exemplo, usando fetch ou XMLHttpRequest
                
                // Simulação de envio bem-sucedido
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    // Animação de scroll - adiciona classe aos elementos quando eles entram na viewport
    const scrollElements = document.querySelectorAll('.section-header, .colecao-item, .destaque-item');
    
    function elementInView(el) {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= window.innerHeight * 0.8;
    }
    
    function displayScrollElement(element) {
        element.classList.add('scrolled');
    }
    
    function hideScrollElement(element) {
        element.classList.remove('scrolled');
    }
    
    function handleScrollAnimation() {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    }
    
    // Inicializar animações
    handleScrollAnimation();
    
    // Atualizar animações ao rolar a página
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() && emailInput.value.includes('@')) {
                // Simular envio bem-sucedido
                alert('Obrigado por assinar nossa newsletter!');
                emailInput.value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
});