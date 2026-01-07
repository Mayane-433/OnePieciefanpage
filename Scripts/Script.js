const pages = ['home', 'grand-line', 'personagens', 'contato']; // Incluí 'contato' para garantir a navegação completa

// A função showPage é segura para ficar fora do onload
function showPage(pageId) {
    
    pages.forEach(id => {
        const pageElement = document.getElementById(id);
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });

    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block'; 
    }

    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        const allLinks = Array.from(navbarElement.querySelectorAll('a, .dropbtn'));

        allLinks.forEach(link => {
            link.classList.remove('active-page');
            if (link.href && link.href.includes(pageId)) {
                link.classList.add('active-page');
            }
        });
    }

    const navbar = document.getElementById("navbar");
    if (navbar && navbar.classList.contains("responsive")) {
        navbar.classList.remove("responsive");
    }
}

// Funcionalidade JS: Modificando o estilo de um elemento SVG
function destacarLogPose() {
    const ponteiro = document.getElementById('ponteiro-logpose');
    if (ponteiro) {
        if (ponteiro.getAttribute('stroke') === '#ff0000') {
            ponteiro.setAttribute('stroke', '#00ff00'); 
            alert("Log Pose calibrado para uma nova ilha! (Ponteiro ficou verde)");
        } else {
            ponteiro.setAttribute('stroke', '#ff0000');
            alert("Log Pose voltou à cor padrão. Boa sorte, você vai precisar!");
        }
    }
}

// Validador para CPF com padrão brasileiro
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Validador para Telefone
function validarTelefone(telefone) {
    telefone = telefone.replace(/[^\d]+/g, ''); 
    return /^\d{10,11}$/.test(telefone);
}


window.onload = () => {
    // AQUI É O PONTO CHAVE: Movemos a lógica de inicialização para DENTRO do onload.

    // Definir a página inicial
    showPage('home'); 

    // Inicialização do Formulário e Validação
    const form = document.getElementById('recrutaForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            
            event.preventDefault(); 

            let isValid = true;
            
            const cpfInput = document.getElementById('cpf');
            const telefoneInput = document.getElementById('telefone');

            if (!validarCPF(cpfInput.value)) {
                cpfInput.classList.add('is-invalid');
                cpfInput.classList.remove('is-valid');
                isValid = false;
            } else {
                cpfInput.classList.remove('is-invalid');
                cpfInput.classList.add('is-valid');
            }

            if (!validarTelefone(telefoneInput.value)) {
                telefoneInput.classList.add('is-invalid');
                telefoneInput.classList.remove('is-valid');
                isValid = false;
            } else {
                telefoneInput.classList.remove('is-invalid');
                telefoneInput.classList.add('is-valid');
            }

            if (isValid) {
                alert("Candidatura enviada com sucesso! Bem-vindo(a) ao bando do Chapéu de Palha!");
                form.reset();
                cpfInput.classList.remove('is-valid');
                telefoneInput.classList.remove('is-valid');
            } else {
                alert("Por favor, corrija os campos inválidos (CPF e/ou Telefone).");
            }
        });
    }

    // Adiciona o destaque inicial ao link "Início"
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active-page');
    }

    // Associa o evento de clique aos elementos SVG
    const logPoseRect = document.querySelector('.log-pose-svg rect');
    if (logPoseRect) {
        logPoseRect.onclick = destacarLogPose;
    }
}