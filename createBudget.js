const budgetCategoryWrapper = document.querySelector("#budget-category-wrapper");
const budgetSubmitButton = document.querySelector("#budget-submit-button");

disableSubmitButton();

function addCategoryToBudget() {
  if (checkMaxCategoryNumbers() === true) {
    alert("Maximum number of categories(12) reached!");
    return;
  }

  createNewBudgetElements();
}

function createNewBudgetElements() {
  const budgetForm = document.createElement("form");
  const removeCategoryButtonWrapper = document.createElement("button");
  const removeCategoryIcon = document.createElement("i");
  const categoryNameLabel = document.createElement("label");
  const budgetAmountLabel = document.createElement("label");
  const expenseAmountLabel = document.createElement("label");
  const categoryNameInput = document.createElement("input");
  const budgetAmountInput = document.createElement("input");
  const expenseAmountInput = document.createElement("input");

  // Setting attributes: class and placeholders
  // Text labels
  const categoryNameCounterResult = categoryNameCounter();

  budgetForm.setAttribute("class", "budget-form");
  budgetForm.setAttribute("id", categoryNameCounterResult);

  removeCategoryButtonWrapper.setAttribute("class", "remove-element-wrapper");
  removeCategoryButtonWrapper.addEventListener("click", function(event) { 
    event.preventDefault();
    removeCategory(categoryNameCounterResult); 
  });
  removeCategoryIcon.setAttribute("class", "far fa-times-circle");

  categoryNameLabel.setAttribute("class", "category-name-label");
  categoryNameLabel.textContent = "Category Name";

  categoryNameInput.setAttribute("class", "category-name-input");
  categoryNameInput.setAttribute("placeholder", "Rent");

  budgetAmountLabel.setAttribute("class", "budget-amount-label");
  budgetAmountLabel.textContent = "Budget Amount";

  budgetAmountInput.setAttribute("class", "budget-amount-input");
  budgetAmountInput.setAttribute("placeholder", "1000");

  expenseAmountLabel.setAttribute("class", "expense-amount-label");
  expenseAmountLabel.textContent = "Expense Amount";
  
  expenseAmountInput.setAttribute("class", "expense-amount-input");
  expenseAmountInput.setAttribute("placeholder", "750");

  let budgetElements = [budgetForm, removeCategoryButtonWrapper, removeCategoryIcon, categoryNameLabel, categoryNameInput, budgetAmountLabel, budgetAmountInput, expenseAmountLabel, expenseAmountInput];
  appendElementsToDom(budgetElements);

  enableSubmitButton();
}

function appendElementsToDom(budgetElements) {
  budgetCategoryWrapper.appendChild(budgetElements[0]);
  budgetElements[0].appendChild(budgetElements[1]);
  budgetElements[1].appendChild(budgetElements[2]);
  for (let i = 3; i < 9; i++) {
    budgetElements[0].appendChild(budgetElements[i]);
  }
}

function checkMaxCategoryNumbers() {
  return budgetCategoryWrapper.childElementCount === 12 ? true : false;
}

function categoryNameCounter() {
  return `category-${budgetCategoryWrapper.childElementCount}`;
}

function removeCategory(child) {
  const childElement = document.getElementById(child);
  childElement.parentNode.removeChild(childElement);
  disableSubmitButton();
}

function disableSubmitButton() {
  if ((budgetCategoryWrapper.childElementCount === 0 ? true : false) === true) {
    budgetSubmitButton.setAttribute("disabled", "disabled");
  } else {
    enableSubmitButton();
  }
}

function enableSubmitButton() {
  budgetSubmitButton.removeAttribute("disabled");
}