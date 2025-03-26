# 👩🏻‍💻 Leitura, Exibição e Edição de Processos com JavaScript Puro

🏛️ Este projeto tem como objetivo processar um **arquivo JSON** contendo informações sobre **processos judiciais** e **exibi-las** de forma estruturada em uma página web. 👩🏻‍⚖️

## 📋 Funcionalidades da Interface

 💻 **Cadastrar novos processos:**
Por meio de um formulário acessível pelo botão 
"Novo Processo".

🔍 **Visualizar processos existentes:**
Em uma tabela dinâmica, exibindo os seguintes campos:


▪️ *Número do Processo.*

▪️*Reclamante.*

▪️ *Reclamada.*

▪️ *Status.*

▪️ *Valor da Causa.*

▪️ *Data de Ajuizamento.*

▪️ *Cidade/UF.*

▪️*Vara.*

  ⌨️ ️**Editar processos cadastrados: O campo "Ações" permite a atualização de qualquer informação.**

 🧼 **Limpar campos do formulário: Facilita o preenchimento de novos registros.**

 
🎲 **Armazenamento de Dados**

O sistema utiliza o armazenamento local do navegador para garantir que os dados sejam preservados, mesmo após o recarregamento da página. A função responsável por isso é o LocalStorage. Com isso, as informações dos processos são salvas diretamente no navegador do usuário, e permanecem disponíveis, mesmo que a página seja recarregada.


```
function salvarNoLocalStorage() {
    localStorage.setItem("processos", JSON.stringify(processos));
}
```


🖍️ **Função para carregar dados do LocalStorage ao iniciar a página**

```
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
```

🕵🏻‍♀️ **Observações sobre o LocalStorage**

🚧 **Segurança:**

 O LocalStorage não é recomendado para armazenar dados sensíveis, pois qualquer pessoa com acesso às ferramentas de desenvolvedor do navegador (DevTools) pode visualizar e manipular os dados. Por isso, ele é ideal apenas para demonstrações e dados não críticos.

📈 **Desempenho:**

O uso do LocalStorage não afeta significativamente o desempenho da página, mas ele possui algumas limitações. Se você começar a armazenar um grande volume de dados, pode haver impacto no desempenho. Isso ocorre porque o JavaScript precisa carregar e exibir todos os dados armazenados ao mesmo tempo. Para projetos futuros com muitos registros, seria mais adequado usar um banco de dados, já que isso evitaria o aumento no tempo de carregamento da página.

📐**Estrutura do Projeto**


```markdown
└───semana1
    ├── index.html
    ├── processos.json
    ├── script.js
    └── style.css

```



🛠️ Tecnologias Utilizadas

**✅ HTML (Estruturação e Exibição de Dados)**

Responsável pela construção da estrutura da página, como campos, tabelas e botões. Define a organização e disposição dos elementos visíveis, como:

📌Número do Processo

📌Reclamante

📌Reclamada

📌Status

📌Valor da Causa

📌Data de Ajuizamento

📌Cidade/UF

📌Vara

📌Ações | Editar

💎 **O HTML:** organiza a página de forma que ela possa exibir os processos e armazenar os dados corretamente em seus respectivos campos. Ele também fornece a tabela e os campos necessários para a inserção e exibição dos dados.

**✅ CSS (Design Visual e Estilo)**

Responsável pela parte visual e pelo design da página. Estiliza a tabela, o modal e os botões, criando uma interface mais agradável e moderna. Utiliza propriedades como border-radius, box-shadow e hover para dando um visual mais sofisticado à página, tornando a experiência visual do usuário mais agradável.
O CSS contribui para tornar a tela de gerenciamento de processos mais atraente e intuitiva, tornando a navegação mais agradável e a interface mais fácil de entender.

**✅ JavaScript (Lógica e Interatividade)**

🧠 **Responsável** por toda a lógica do sistema e pela interatividade com o usuário. Executa as seguintes funções:

🎲 **Leitura de Dados:** Utiliza o fetch() para ler os processos do arquivo JSON.

🖥️ **Exibição de Dados:** Insere os dados na tabela, manipulando o DOM (Document Object Model). Isso é feito usando querySelector para encontrar os elementos HTML corretos e, em seguida, preenchendo as células da tabela com innerHTML ou outros métodos.

📦 **Armazenamento:** Salva e recupera dados no LocalStorage.
👨🏻‍💻 Interatividade: Gerencia eventos de clique com addEventListener() para abrir/fechar o modal editar e processar o formulário.

📚 **Formatação:** Converte valores monetários para o formato de moeda brasileira utilizando toLocaleString().
💎 O JavaScript é fundamental para fazer com que a página leia, manipule e exiba os dados de maneira dinâmica.


# ⚙️Como Executar o Código


## 📝 1. Criar e Abrir o Arquivo HTML


- **Crie um arquivo** chamado `index.html` com o código desejado.
- **Abra o arquivo no navegador** clicando com o botão direito e selecionando **"Abrir com" > "Escolha o navegador"** (Chrome, Firefox, etc.).

---

## ✨ 2. Usando Live Server no VS Code (Opcional)

- **Instale o [Visual Studio Code](https://code.visualstudio.com/)** e a extensão **Live Server**.
- **Abra o VS Code** e carregue a pasta com o arquivo `index.html`.
- **Clique com o botão direito** no arquivo `index.html` e selecione **"Open with Live Server"** para visualizar o código no navegador. As alterações serão **atualizadas automaticamente**.

---

 ## 🚀Observações

- **Não se esqueça de baixar o arquivo JSON** necessário para que o sistema consiga extrair os dados do processo.
