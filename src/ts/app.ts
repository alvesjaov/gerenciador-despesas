import Chart, { ChartConfiguration } from 'chart.js/auto';
import '../assets/css/styles.css';

// Interface que define a estrutura de uma despesa
interface Expense {
    id: string;       // ID único da despesa
    name: string;     // Nome da despesa
    amount: number;   // Valor da despesa
    category: string; // Categoria da despesa
}

// Variáveis para armazenar as despesas, o valor total e o valor restante do orçamento
let expenses: Expense[] = [];
let totalAmount = 0;
let remainingAmount = 0;
let categoryChart: Chart<'pie', number[], string> | null = null; // Variável para o gráfico de categorias

// Seleção dos elementos do DOM (Document Object Model) necessários para o funcionamento do código
const expenseForm = document.getElementById('expense-form') as HTMLFormElement;
const expenseNameInput = document.getElementById('expense-name') as HTMLInputElement;
const expenseAmountInput = document.getElementById('expense-amount') as HTMLInputElement;
const expenseCategorySelect = document.getElementById('expense-category') as HTMLSelectElement;
const categoryFilterSelect = document.getElementById('category-filter') as HTMLSelectElement;
const expenseTable = document.getElementById('expense-table');
const expenseTableBody = expenseTable ? expenseTable.querySelector('tbody') as HTMLTableSectionElement : null;
const totalAmountSpan = document.getElementById('total-amount') as HTMLSpanElement;
const remainingAmountSpan = document.getElementById('remaining-amount') as HTMLSpanElement;
const budgetAmountInput = document.getElementById('budget-amount') as HTMLInputElement;
const categoryChartCanvas = document.getElementById('category-chart') as HTMLCanvasElement;
const noDataMessage = document.getElementById('no-data-message');

// Adiciona um listener de evento para o formulário de despesa, que aciona a função addExpense() ao ser submetido
if (expenseForm) {
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addExpense();
    });
}

// Adiciona um listener de evento para o seletor de filtro de categoria, que aciona a função filterExpenses() ao mudar a seleção
if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener('change', () => {
        filterExpenses();
    });
}

// Adiciona um listener de evento para o campo de orçamento, que atualiza o resumo e o gráfico quando o valor é alterado
if (budgetAmountInput) {
    budgetAmountInput.addEventListener('input', () => {
        updateSummary();
        updateChart();
    });
}

// Listener para o botão de edição do orçamento, que permite alternar entre editar e salvar o valor do orçamento
const editBudgetButton = document.getElementById('edit-budget');
if (editBudgetButton) {
    editBudgetButton.addEventListener('click', function () {
        const budgetInput = document.getElementById('budget-amount') as HTMLInputElement;
        if (budgetInput) {
            if (budgetInput.hasAttribute('readonly')) {
                budgetInput.removeAttribute('readonly');
                this.textContent = 'Salvar';
            } else {
                budgetInput.setAttribute('readonly', 'readonly');
                this.textContent = 'Editar';
                updateSummary();
                updateChart();
            }
        }
    });
}

// Função para adicionar uma nova despesa à lista e atualizar a tabela, o resumo e o gráfico
function addExpense() {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategorySelect.value;
    const id = generateUniqueId(); // Gera um ID único para a despesa

    const expense: Expense = { id, name, amount, category };
    expenses.push(expense); // Adiciona a nova despesa ao array de despesas

    updateTable(); // Atualiza a tabela com a nova lista de despesas
    updateSummary(); // Atualiza o resumo de valores (total e restante)
    updateChart(); // Atualiza o gráfico de categorias

    // Limpa os campos de entrada após adicionar a despesa
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseCategorySelect.value = 'Alimentação';
}

// Função para gerar um ID único
function generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Função para filtrar as despesas com base na categoria selecionada e atualizar a tabela
function filterExpenses() {
    const filter = categoryFilterSelect.value;
    const filteredExpenses = filter === 'Todas' ? expenses : expenses.filter(expense => expense.category === filter);
    updateTable(filteredExpenses); // Atualiza a tabela com as despesas filtradas
}

// Função para atualizar a tabela com as despesas fornecidas
function updateTable(filteredExpenses: Expense[] = expenses) {
    if (!expenseTableBody) return;
    expenseTableBody.innerHTML = ''; // Limpa o conteúdo da tabela
    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>R$ ${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td><button class="remove-expense" data-id="${expense.id}">Remover ✗</button></td>
        `;
        expenseTableBody.appendChild(row); // Adiciona a linha à tabela
    });

    // Adiciona event listeners para os botões de remover despesas
    const removeButtons = expenseTableBody.querySelectorAll('.remove-expense');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            const id = target.getAttribute('data-id');
            if (id) {
                removeExpense(id); // Remove a despesa ao clicar no botão "Remover"
            }
        });
    });
}

// Função para remover uma despesa com base no ID fornecido
function removeExpense(id: string) {
    expenses = expenses.filter(expense => expense.id !== id); // Filtra a despesa para removê-la
    updateTable(); // Atualiza a tabela
    updateSummary(); // Atualiza o resumo de valores
    updateChart(); // Atualiza o gráfico de categorias
}

// Função para atualizar o resumo de valores (total e restante) com base nas despesas e no orçamento
function updateSummary() {
    totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0); // Calcula o valor total das despesas
    const budgetAmount = parseFloat(budgetAmountInput.value) || 0; // Obtem o valor do orçamento ou 0 se não houver valor
    remainingAmount = budgetAmount - totalAmount; // Calcula o valor restante do orçamento

    totalAmountSpan.textContent = `R$ ${totalAmount.toFixed(2)}`; // Atualiza o valor total exibido
    remainingAmountSpan.textContent = `R$ ${remainingAmount.toFixed(2)}`; // Atualiza o valor restante exibido
}

// Função para atualizar o gráfico de categorias com base nas despesas
function updateChart() {
    const categories = ['Alimentação', 'Luz', 'Água', 'Internet', 'Lazer', 'Saúde', 'Transporte', 'Moradia', 'Outros' ]; // Categorias atualizadas
    const categoryAmounts = categories.map(category => {
        return expenses.filter(expense => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0);
    }); // Calcula os valores totais para cada categoria

    if (categoryChart) {
        categoryChart.destroy(); // Destroi o gráfico existente para evitar sobreposição
        categoryChart = null; // Garante que o gráfico seja destruído
    }

    const hasData = categoryAmounts.some(amount => amount > 0); // Verifica se há dados para exibir no gráfico

    // Controla a visibilidade da mensagem "Adicione um valor para o gráfico aparecer"
    if (noDataMessage) {
        noDataMessage.style.display = hasData ? 'none' : 'block';
    }

    const config: ChartConfiguration<'pie', number[], string> = {
        type: 'pie', // Tipo de gráfico: pizza
        data: {
            labels: categories,
            datasets: [{
                data: categoryAmounts, // Dados para cada categoria
                backgroundColor: [
                    '#F0CC1E', '#FFA1AB' , '#FFA07A' , '#98E6FA',
                    '#98FB98', '#C668CB', '#C52831', '#0900A3','#666666'
                ] // Cores das fatias do gráfico
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = Number(context.raw) || 0;
                            return `R$ ${value.toFixed(2)}`; // Formatação dos valores no tooltip
                        }
                    }
                },
                legend: {
                    display: hasData, // Define a visibilidade da legenda com base na presença de dados
                    position: 'right', // Define a posição da legenda
                    align: 'center', // Alinha a legenda ao centro
                    labels: {
                        boxWidth: 10, // Largura dos ícones da legenda
                        boxHeight: 10, // Altura dos ícones da legenda
                        font: {
                            size: 12, // Tamanho da fonte do texto da legenda
                        }
                    }
                }
            }
        }
    };

    categoryChart = new Chart(categoryChartCanvas, config); // Cria um novo gráfico com as configurações fornecidas
}

// Inicializa a tabela, o resumo e o gráfico ao carregar a página
updateTable();
updateSummary();
updateChart();