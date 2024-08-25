# Gerenciador de Despesas

## Descrição

Este é um aplicativo web simples para gerenciar despesas. Ele permite adicionar, visualizar e categorizar despesas, além de exibir um gráfico para uma melhor visualização dos gastos.

## Instalação

Para instalar e executar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:

    ```sh
    git clone https://github.com/alvesjaov/gerenciador-despesas.git
    ```

2. Navegue até o diretório local do projeto:

    ```sh
    cd gerenciador-despesas
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

4. Compile o TypeScript:

    ```sh
    tsc
    ```

5. Execute o Webpack:

    ```sh
    npx webpack
    ```

O projeto está pronto para rodar.

## Tecnologias Utilizadas

- HTML
- CSS
- TypeScript
- JavaScript
- Node.js
- Chart.js
- Webpack

## Imagens do Projeto

Aqui estão algumas capturas de tela do projeto:

### Tela Inicial

- A aplicação começa com os dados vazios.

![Tela Inicial](/src/assets/img/captura_01.png)

### Tabela de Despesa

- Ao adicionar as despesas a tabela atualiza automaticamente.

![Adicionar Despesa](/src/assets/img/captura_02.png)

### Gráfico de Despesas

- O Gráfico tem uma ação dinâmica, onde é possível filtrar por categoria, ocultar categoria especifica e ainda é possível ver o total de cada categoria só passando o mouse por cima do gráfico.

![Gráfico de Despesas](/src/assets/img/captura_03.png)

## Melhorias Futuras

- Implementação de autenticação de usuários.
- Adição de filtros avançados para visualização de despesas.
- Exportação de dados para formatos CSV e PDF.
- Integração com APIs de bancos para importação automática de despesas.
- Criação de um painel administrativo para gerenciar categorias e usuários.
