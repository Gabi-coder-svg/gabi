document.addEventListener('DOMContentLoaded', function() {
    const produtos = [
        { 
            id: 1, 
            nome: "Delírio Proibido 😈🔞", 
            preco: "19,90", 
            checkoutLink: "https://pay.risepay.com.br/Pay/9d982951f97a48f19381c8e1742ef8e6",
            imagem: "assets/imagens/produtos/prod1.jpeg",
            descricao: "Vem se perder nesse pacotão de pura safadeza: 10 fotos e 5 vídeos pra te deixar sem fôlego! 😏🔥.",
            objectPosition: "50% 55%" // Ajuste específico para essa imagem
        },
        { 
            id: 2, 
            nome: "Pecado Vip 💦😈", 
            preco: "29.90", 
            checkoutLink: "https://pay.risepay.com.br/Pay/f342e277bee748e2b4a07413b0442139",
            imagem: "assets/imagens/produtos/prod2.jpeg",
            descricao: "Um show de tentação te espera: 20 fotos e 10 vídeos que vão te deixar querendo mais! 😈🔥",
            objectPosition: "50% 15%" // Ajuste para enquadrar melhor
        },
        { 
            id: 3, 
            nome: "Tentação Suprema 🥵", 
            preco: "49.90", 
            checkoutLink: "https://pay.risepay.com.br/Pay/8104a6b5340f4ea1b160ce8b95d94d22",
            imagem: "assets/imagens/produtos/prod3.jpeg",
            descricao: "Tesão à flor da pele! 30 fotos e 15 vídeos que vão te deixar pulsando de vontade!",
            objectPosition: "center center" // Ajuste neutro
        },
        {
            id: 4,
            nome: "Liga aí, safado... quero te ver e imaginar tudo que vou fazer depois. 🔥😈",
            preco: "64.90",
            checkoutLink: "https://pay.risepay.com.br/Pay/3fbb003789224b1da6f72c4374086173",
            imagem: "",
            descricao: "Este pacote inclui a chamada exclusiva e, se você quiser, por apenas R$ 15 a mais, você leva o Pecado Vip, com conteúdos ainda mais intensos e exclusivos. Não perca essa oportunidade de tornar a experiência ainda mais quente!",
            fullwidth: true,
            objectPosition: "top center" // Para focar no topo da imagem
        }
    ];

    const produtosSection = document.getElementById('produtos');

    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img class="modal-img" src="" alt="" style="object-fit: cover;">
            <h2 class="modal-nome"></h2>
            <p class="modal-preco"></p>
            <div class="modal-conteudo">
                <p class="modal-descricao"></p>
                <button class="modal-adicionar-vip">Chamada + Pack Pecado Vip</button> <!-- Novo nome para o botão -->
                <button class="modal-comprar">Finalizar Compra</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Gerar produtos dinamicamente
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto';

        if (produto.fullwidth) {
            produtoDiv.classList.add('produto-fullwidth');
        }

        produtoDiv.innerHTML = `
            <h2>${produto.nome}</h2>
            <button onclick="abrirModal(${produto.id})">Ver Detalhes</button>
        `;
        produtosSection.appendChild(produtoDiv);
    });

    // Função para abrir o modal
    window.abrirModal = function(produtoId) {
        const produto = produtos.find(p => p.id === produtoId);
        if (!produto) return;

        const modalEl = document.getElementById('modal');
        const modalImg = modalEl.querySelector('.modal-img');

        modalImg.src = produto.imagem;
        modalImg.style.objectPosition = produto.objectPosition || "center center"; // Aplica ajuste específico
        modalEl.querySelector('.modal-nome').textContent = produto.nome;
        modalEl.querySelector('.modal-preco').textContent = `Preço: R$ ${produto.preco}`;
        modalEl.querySelector('.modal-descricao').textContent = produto.descricao;
        
        // Configurar botão para Chamada + Pack Pecado Vip (somente no produto com id 4)
        const vipBtn = modalEl.querySelector('.modal-adicionar-vip');
        if (produto.id === 4) {
            vipBtn.style.display = 'block'; // Exibe o botão somente no produto com id 4
            vipBtn.onclick = () => {
                alert("Você adicionou o Pacote Pecado Vip por apenas R$ 15!");
                
                // Link do checkout do Pecado Vip
                const novoCheckoutLink = "https://pay.risepay.com.br/Pay/08a4465262184caba905490e2710e3b7"; // Atualize com o link correto
                const checkoutWindow = window.open(novoCheckoutLink, '_blank');

                // Monitorar fechamento da janela do checkout
                const checkInterval = setInterval(() => {
                    if (checkoutWindow.closed) {
                        clearInterval(checkInterval);
                        window.location.href = "pages/success.html";
                    }
                }, 1000);
                
                fecharModal();
            };
        } else {
            vipBtn.style.display = 'none'; // Esconde o botão para os outros produtos
        }

        // Configurar botão de compra
        const comprarBtn = modalEl.querySelector('.modal-comprar');
        comprarBtn.onclick = () => {
            const checkoutWindow = window.open(produto.checkoutLink, '_blank');

            // Monitorar fechamento da janela do checkout
            const checkInterval = setInterval(() => {
                if (checkoutWindow.closed) {
                    clearInterval(checkInterval);
                    window.location.href = "pages/success.html";
                }
            }, 1000);
            
            fecharModal();
        };

        modalEl.style.display = 'block';
    };

    // Função para fechar o modal
    window.fecharModal = function() {
        document.getElementById('modal').style.display = 'none';
    };

    // Fechar modal ao clicar fora dele, funcionando no celular também
    window.onclick = function(e) {
        const modalElement = document.getElementById('modal');
        if (e.target === modalElement || e.target === document.body) {
            fecharModal();
        }
    };

    // Fechar modal em dispositivos móveis (adicional para toque)
    modal.addEventListener('touchstart', function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    });
});
