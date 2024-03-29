/*
  This function serves to house other functions including input
  retrieval, validation, sum calculation, and output display
*/
function getInputCollections() {
  const categoryNameCollection = document.querySelectorAll(".category-name-input");
  const budgetAmountCollection = document.querySelectorAll(".budget-amount-input");
  const expenseAmountCollection = document.querySelectorAll(".expense-amount-input");
  const csvName = document.querySelector("#csv-name").value;

  const categoryValidate = validate(categoryNameCollection);
  const budgetValidate = validate(budgetAmountCollection);
  const expenseValidate = validate(expenseAmountCollection);

  if (categoryValidate === false || budgetValidate === false || expenseValidate === false) return;

  const categoryNameValues = getInputValues(categoryNameCollection);
  const budgetAmountValues = getInputValues(budgetAmountCollection);
  const expenseAmountValues = getInputValues(expenseAmountCollection);

  const budgetSum = calculateSum(budgetAmountCollection);
  const expenseSum = calculateSum(expenseAmountCollection);

  const leftover = calculateBudgetLeftover(budgetSum, expenseSum).toFixed(2);
  
  determineUnderBudget(leftover);
  createDonutChart(categoryNameValues, budgetAmountValues, "Budget Amount", "Budget Allocation");

  if (csvName !== "") {
    createCsv(categoryNameValues, budgetAmountValues, expenseAmountValues, csvName);
  }
}


/*
  This function takes a collection of numbers and adds them all up
*/
function calculateSum(collection) {
  let sum = 0;

  for (let element of collection) {
    sum += parseFloat(element.value);
  }

  return sum.toFixed(2);
}


/*
  This function determines whether input contains the string "script"
*/
function validate(collection) {
  for (let element of collection) {
    if (element.value.search("script") === -1) {
      return;
    }
    else {
      alert("No scripts allowed");
      return "script";
    }
  }
}


/*
  This function takes in a collection of input elements 
  and retrieves the value 
*/
function getInputValues(collection) {
  let array = [];

  for (let element of collection) {
    array.push(element.value);
  }

  return array;
}


/*
  This function calculates how much budget is leftover
  after subtracting expenses from the budget
*/
function calculateBudgetLeftover(budgetSum, expenseSum) {
  return budgetSum - expenseSum;
}


/*
  This function takes in the remaining amount left in the budget
  and determines if the user is under budget or over budget
*/
function determineUnderBudget(leftover) {
  let status = "";

  if (leftover === 0) {
    status = "breakeven"; 
  }
  else {
    status = leftover < 0 ? "over budget" : "under budget";
  }

  displayBudgetOnDom(leftover, status);
}


/*
  This function displays how much budget is leftover and their budget status
*/
function displayBudgetOnDom(leftover, status) {
  // either create 
  const budgetSummary = document.getElementById("budget-summary");

  switch (status) {
    case "breakeven":
      budgetSummary.innerHTML = `You have <span class="budget-leftover-grey">\$${leftover}</span> left over in your budget.`;
      break;
    case "over budget":
      budgetSummary.innerHTML = `You are <span class="budget-leftover-red">\$${Math.abs(leftover)}</span> over your budget.`;
      break;
    case "under budget":
      budgetSummary.innerHTML = `You have <span class="budget-leftover-green">\$${leftover}</span> left in your budget.`;
      break;
  }
}


/*
  This function creates a donut chart to visualize the budget allocation
*/
function createDonutChart(labelValues, amountValues, chartLabel, chartName) {
  let chartElement = document.getElementsByTagName("canvas");
  let canvas = chartElement[0];
  if (deleteChart(canvas, chartElement) === false) {
    let chartElement = document.getElementsByTagName("canvas");
    let canvas = chartElement[0];
  }

  let myChart = new Chart(chartElement, {
    type: "doughnut",
    data: {
      labels: labelValues,
      datasets: [{
        label: chartLabel,
        data: amountValues,
        backgroundColor: [
          "#FF5A51",
          "#FF7C60",
          "#FF9B6D",
          "#C0C480",
          "#FFD083",
          "#A7C8F2",
          "#65A688",
          "#93C5C6",
          "#FFE39F",
          "#A7D2D6"
        ]
      }]
    },
    options: {
      title: {
        display: true,
        fontSize: 18,
        text: chartName
      },
    }
  });
}


/*
  This function removes an existing chart
*/
function deleteChart(canvas, chartElement) {
  const chartWrapper = document.getElementById("chart-wrapper");

  if (chartElement.length !== 0) {
    canvas.parentNode.removeChild(canvas);

    const canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("id", "budget-allocation-chart");

    chartWrapper.appendChild(canvasElement);
    return false;
  }
}

/*
  This function creates a CSV file containing data about
  category names, budget amounts, and expenses
*/
function createCsv(category, budget, expense, csvName) {
  let rows = [];
  for (let element in category) {
    rows[element] = [category[element], budget[element], expense[element]];
  }

  let csv = 'Category Name, Budget Amount, Expense Amount\n';
  rows.forEach(function(rowList) {
    csv += rowList.join(',');
    csv += "\n";
  });

  const link = document.createElement('a');
  link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  link.target = '_blank';
  link.download = csvName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}