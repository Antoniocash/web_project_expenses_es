let budgetValue = 0;
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

calculateBalance(budgetValue, expenseEntries);
calculateAverageExpense(expenseEntries);
