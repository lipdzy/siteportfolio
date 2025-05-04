// Menu toggle para mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header fixo com mudança de estilo no scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.padding = '10px 0';
    } else {
        header.style.background = 'white';
        header.style.padding = '20px 0';
    }
});

// Animação de aparecimento de seções
const sections = document.querySelectorAll('section');
const options = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Botões de compra para WhatsApp
const comprarButtons = document.querySelectorAll('.btn-comprar');

comprarButtons.forEach(button => {
    button.addEventListener('click', function() {
        const produto = this.getAttribute('data-produto');
        
        // Número de WhatsApp formatado
        const whatsappNumber = '5583991816152';
        
        // Criar a mensagem para o WhatsApp
        let whatsappMessage = `Olá! Tenho interesse em comprar o produto: ${produto}. Poderia me fornecer mais informações?`;
        
        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Criar a URL do WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Abrir o WhatsApp em uma nova janela
        window.open(whatsappUrl, '_blank');
    });
});

// Formulário de contato para WhatsApp
const whatsappForm = document.getElementById('whatsapp-form');

whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Número de WhatsApp formatado
    const whatsappNumber = '5583991816152';
    
    // Criar a mensagem para o WhatsApp
    let whatsappMessage = `Olá, meu nome é ${nome}. `;
    whatsappMessage += `Email: ${email}. `;
    whatsappMessage += `Assunto: ${assunto}. `;
    whatsappMessage += `Mensagem: ${mensagem}`;
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Criar a URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir o WhatsApp em uma nova janela
    window.open(whatsappUrl, '_blank');
    
    // Limpar o formulário
    whatsappForm.reset();
});

// Formulário de newsletter
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Aqui você pode adicionar o código para enviar o e-mail para seu sistema
    // Por enquanto, apenas exibimos um alerta
    alert(`Obrigado por se inscrever na nossa newsletter com o e-mail: ${email}`);
    
    // Limpar o formulário
    newsletterForm.reset();
});

// Adicionar classe 'active' ao link de navegação correspondente à seção visível
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Galeria de imagens com efeito de hover
const galleryItems = document.querySelectorAll('.gallery-item, .colecao-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});