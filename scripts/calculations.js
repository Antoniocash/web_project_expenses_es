let budgetValue = 1000;
let totalExpensesValue = 0;

let expenseEntries = [
  ["groceries", 33],
  ["restaurants", 50],
  ["transport", 12],
  ["home", 70],
  ["subscriptions", 14],
  ["groceries", 28],
  ["subscriptions", 12],
];

for (let i = 0; i < expenseEntries.length; i++) {
  totalExpensesValue += expenseEntries[i][1];
}
function calculateAverageExpense(expenses) {
  if (!expenses || expenses.length === 0) {
    return 0;
  } else {
    let sum = 0;
    for (let i = 0; i < expenses.length; i++) {
      sum += expenses[i][1];
    }

    let average = sum / expenses.length;
    console.log("el promedio es:", average.toFixed(2));
    return average;
  }
}

function calculateBalance(budget, expenses) {
  if (!expenses || expenses.length === 0) {
    return 0;
  } else {
    let sum = 0;
    for (let i = 0; i < expenses.length; i++) {
      sum += expenses[i][1];
    }

    let total = budget - sum;
    console.log("El restante es:", total);
    return total;
  }
}

let updatedBalance = calculateBalance(budgetValue, expenseEntries);
calculateAverageExpense(expenseEntries);

let balanceColor = "green";

function updateBalanceColor(balance, budget) {
  let yellowCap = budget * 0.25;

  if (balance <= 0) {
    return "red";
  } else if (balance <= yellowCap) {
    return "yellow";
  } else {
    return "green";
  }
}

balanceColor = updateBalanceColor(updatedBalance, budgetValue);

console.log(balanceColor);

function calculateCategoryExpenses(categoryName) {
  let categoryTotal = 0;
  for (let i = 0; i < expenseEntries.length; i++) {
    if (categoryName === expenseEntries[i][0]) {
      categoryTotal += expenseEntries[i][1];
    } else {
    }
  }
  return [categoryName, categoryTotal];
}

console.log(
  "resultado de calculateAverageExpense",
  calculateCategoryExpenses("groceries"),
);

let categoryList = [
  "groceries",
  "restaurants",
  "transport",
  "home",
  "subscriptions",
];

function calculateLargestCategory() {
  let categories = [];
  for (let i = 0; i < expenseEntries.length; i++) {
    if (!categories.includes(expenseEntries[i][0])) {
      categories.push(expenseEntries[i][0]);
    }
  }

  let categoriesData = [];
  for (let i = 0; i < categories.length; i++) {
    categoriesData.push(calculateCategoryExpenses(categories[i]));
  }

  let largestCategory = categoriesData[0];
  for (let i = 1; i < categoriesData.length; i++) {
    if (categoriesData[i][1] > largestCategory[1]) {
      largestCategory = categoriesData[i];
    }
  }

  return largestCategory;
}

console.log(
  "Resultado de Calculo de categoria mas alta",
  calculateLargestCategory(),
);

function addExpenseEntry(newExpense) {
  totalExpensesValue += newExpense[1];
  expenseEntries.push(newExpense);

  return [totalExpensesValue, expenseEntries];
}
