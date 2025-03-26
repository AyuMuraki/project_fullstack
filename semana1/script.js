document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const novoProcessoBtn = document.getElementById("novoProcessoBtn");
    const closeModal = document.querySelector(".close");
    const formProcesso = document.getElementById("formProcesso");
    const tbody = document.getElementById("tabelaProcessos");
    const limparBtn = document.getElementById("limparBtn");

    let processos = [];

    // Carregar processos do LocalStorage ou do JSON
    async function carregarProcessos() {
        const localData = localStorage.getItem("processos");

        if (localData) {
            processos = JSON.parse(localData);
            atualizarTabela();
        } else {
            try {
                const response = await fetch("processos.json");
                processos = await response.json();
                salvarNoLocalStorage();
                atualizarTabela();
            } catch (error) {
                console.error("Erro ao carregar processos:", error);
            }
        }
    }

    // Salva os processos no LocalStorage
    function salvarNoLocalStorage() {
        localStorage.setItem("processos", JSON.stringify(processos));
    }

    // Atualiza a tabela de processos
    function atualizarTabela() {
        tbody.innerHTML = "";
        processos.forEach((processo, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${processo.numero}</td>
                <td>${processo.reclamante}</td>
                <td>${processo.reclamada}</td>
                <td>${processo.status}</td>
                <td>${Number(processo.valorCausa).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${processo.dataAjuizamento}</td>
                <td>${processo.cidade ? `${processo.cidade} / ${processo.uf}` : "N/A"}</td>
                <td>${processo.vara}</td>
                <td><button class="editar" data-index="${index}">Editar</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Evento de clique na tabela
    tbody.addEventListener("click", (event) => {
        if (event.target.classList.contains("editar")) {
            const index = event.target.dataset.index;
            editarProcesso(index);
        }
    });

    
    novoProcessoBtn.addEventListener("click", () => {
        formProcesso.reset();
        document.getElementById("processoId").value = "";
        modalTitle.innerText = "Novo Processo";
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    function editarProcesso(index) {
        const processo = processos[index];
        document.getElementById("processoId").value = index;
        document.getElementById("numeroProcesso").value = processo.numero;
        document.getElementById("reclamante").value = processo.reclamante;
        document.getElementById("reclamada").value = processo.reclamada;
        document.getElementById("status").value = processo.status;
        document.getElementById("valorCausa").value = processo.valorCausa;
        document.getElementById("dataAjuizamento").value = processo.dataAjuizamento;
        document.getElementById("cidade").value = processo.cidade;
        document.getElementById("vara").value = processo.vara;
        modalTitle.innerText = "Editar Processo";
        modal.style.display = "block";
    }


    limparBtn.addEventListener("click", () => {
        formProcesso.reset();
    });


    formProcesso.addEventListener("submit", (event) => {
        event.preventDefault();

        const index = document.getElementById("processoId").value;

        // Pega o valor do input e corrige os formatos
        let valorCausaInput = document.getElementById("valorCausa").value;
        valorCausaInput = valorCausaInput.replace(/\./g, ""); // Remove pontos de milhar
        valorCausaInput = valorCausaInput.replace(",", "."); // Substitui vírgula decimal por ponto
        valorCausaInput = parseFloat(valorCausaInput); // Converte para número


        
        const novoProcesso = {
            numero: document.getElementById("numeroProcesso").value,
            reclamante: document.getElementById("reclamante").value,
            reclamada: document.getElementById("reclamada").value,
            status: document.getElementById("status").value,
            valorCausa: isNaN(valorCausaInput) ? 0 : valorCausaInput, // Se não for número, salva como 0
            dataAjuizamento: document.getElementById("dataAjuizamento").value,
            cidade: document.getElementById("cidade").value,
            vara: document.getElementById("vara").value
        };

        if (index) {
            processos[index] = novoProcesso;
        } else {
            processos.push(novoProcesso);
        }

        salvarNoLocalStorage(); // Salva no LocalStorage
        atualizarTabela();
        modal.style.display = "none";
    });

    carregarProcessos();
});



