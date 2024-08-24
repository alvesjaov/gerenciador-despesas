import Chart, { ChartConfiguration } from 'chart.js/auto';

// Interface que define a estrutura de uma despesa
interface Expense {
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