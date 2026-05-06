const budgetInput = document.querySelector(".budget__input");
const budgetSetButton = document.querySelector(".budget__set-btn");

const totalExpensesValueElement = document.querySelector(
  "#total-expenses-value",
);
const averageExpenseValueElement = document.querySelector(
  "#average-expense-value",
);
const balanceValueElement = document.querySelector("#balance-value");

const largestCategoryTitleElement = document.querySelector(
  ".stats__item-title_largest",
);
const largestCategoryValueElement = document.querySelector(
  ".stats__item-value_largest",
);

const groceriesValueElement = document.querySelector("#groceries-value");
const restaurantsValueElement = document.querySelector("#restaurants-value");
const transportValueElement = document.querySelector("#transport-value");
const homeValueElement = document.querySelector("#home-value");
const subscriptionsValueElement = document.querySelector(
  "#subscriptions-value",
);

const modal = document.querySelector("#add-expense-modal");
const openModalBtn = document.querySelector(".controls__add-btn");
const closeModalBtn = modal.querySelector(".modal__close-btn");

const clearAllStatsButton = document.querySelector(".controls__clear-btn");

const addExpenseModalForm = modal.querySelector(".modal__form");
const expenseCategoryInput = document.querySelector("#expense-category-input");
const expenseAmountInput = document.querySelector("#expense-amount-input");

const expensesList = document.querySelector(".expenses__list");

const expenseTemplate = document.querySelector("#expense-template");

const categoryNames = {
  groceries: "Comida",
  restaurants: "Comer fuera",
  subscriptions: "Suscripciones",
  transport: "Transporte",
  home: "Hogar",
};

function openModal() {
  modal.classList.add("modal_is-open");
}

function closeModal() {
  modal.classList.remove("modal_is-open");
}

function handleDeleteExpense(element, data) {
  const index = expenseEntries.findIndex(
    (expense) => expense[0] === data[0] && expense[1] === data[1],
  );
  if (index !== -1) {
    expenseEntries.splice(index, 1);
    totalExpensesValue -= data[1];
    saveToLocalStorage("expenseEntries", expenseEntries);
    setStats();
  }
  element.remove();
}

function createExpenseListItem(data) {
  const expenseElement = expenseTemplate.content
    .querySelector(".expense")
    .cloneNode(true);

  const expenseCategoryElement =
    expenseElement.querySelector(".expense__category");
  const expenseValueElement = expenseElement.querySelector(".expense__amount");
  const expenseDeleteButton = expenseElement.querySelector(
    ".expense__delete-btn",
  );

  expenseCategoryElement.textContent = categoryNames[data[0]];
  expenseValueElement.textContent = data[1].toFixed(2);
  expenseDeleteButton.addEventListener("click", () =>
    handleDeleteExpense(expenseElement, data),
  );

  return expenseElement;
}

function handleAddExpenseSubmit(evt) {
  evt.preventDefault();
  const selectedOption = expenseCategoryInput.selectedOptions[0];
  const values = [selectedOption.value, Number(expenseAmountInput.value)];
  addExpenseToList(values);
  addExpenseEntry(values);
  saveToLocalStorage("expenseEntries", expenseEntries);
  setStats();
  expenseAmountInput.value = "";
  closeModal();
  addExpenseModalForm.reset();
}

function addExpenseToList(values) {
  const expenseElement = createExpenseListItem(values);
  expensesList.prepend(expenseElement);
  totalExpensesValueElement.textContent = totalExpensesValue.toFixed(2);
}

function updateExpensesList(entries) {
  for (const expense of entries) {
    addExpenseToList(expense);
  }
}

function handleSaveBudget() {
  budgetValue = parseFloat(budgetInput.value) || 0;
  saveToLocalStorage("budgetValue", budgetValue);
  setStats();
  budgetInput.value = "";
}

function updateBalanceElementColor() {
  updateBalanceColor();
  const colorClasses = [
    "stats__item-value_balance_negative",
    "stats__item-value_balance_warning",
    "stats__item-value_balance_positive",
  ];
  balanceValueElement.classList.remove(...colorClasses);

  if (balanceColor === "red") {
    balanceValueElement.classList.add("stats__item-value_balance_negative");
  } else if (balanceColor === "orange") {
    balanceValueElement.classList.add("stats__item-value_balance_warning");
  } else {
    balanceValueElement.classList.add("stats__item-value_balance_positive");
  }
}

function clearLocalStorage() {
  localStorage.clear();
  budgetValue = 0;
  expenseEntries.length = 0;
  expenseEntries.push(...defaultExpenses);
  totalExpensesValue = 0;
  for (const expense of expenseEntries) {
    totalExpensesValue += expense[1];
  }
  expensesList.innerHTML = "";
  updateExpensesList(expenseEntries);
  setStats();
}

function setStats() {
  budgetInput.placeholder = budgetValue.toFixed(2);
  totalExpensesValueElement.textContent = totalExpensesValue.toFixed(2);
  averageExpenseValueElement.textContent =
    calculateAverageExpense(expenseEntries).toFixed(2);
  balanceValueElement.textContent = calculateBalance(
    budgetValue,
    expenseEntries,
  ).toFixed(2);
  updateBalanceElementColor();

  let groceriesTotal = calculateCategoryExpenses("groceries")[1];
  groceriesValueElement.textContent = groceriesTotal.toFixed(2);

  let restaurantsTotal = calculateCategoryExpenses("restaurants")[1];
  restaurantsValueElement.textContent = restaurantsTotal.toFixed(2);

  let transportTotal = calculateCategoryExpenses("transport")[1];
  transportValueElement.textContent = transportTotal.toFixed(2);

  let homeTotal = calculateCategoryExpenses("home")[1];
  homeValueElement.textContent = homeTotal.toFixed(2);

  let subscriptionsTotal = calculateCategoryExpenses("subscriptions")[1];
  subscriptionsValueElement.textContent = subscriptionsTotal.toFixed(2);

  let largestCategoryKey = calculateLargestCategory();
  largestCategoryTitleElement.textContent = categoryNames[largestCategoryKey];
  largestCategoryValueElement.textContent =
    calculateCategoryExpenses(largestCategoryKey);
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
addExpenseModalForm.addEventListener("submit", handleAddExpenseSubmit);
budgetSetButton.addEventListener("click", handleSaveBudget);
clearAllStatsButton.addEventListener("click", clearLocalStorage);
