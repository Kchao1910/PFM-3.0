const budgetCategoryWrapper = document.querySelector("#budget-category-wrapper");
const budgetSubmitButton = document.querySelector("#budget-submit-button");

disableSubmitButton(budgetCategoryWrapper, budgetSubmitButton);

function addCategoryToBudget() {
  if (checkMaxCategoryNumbers() === true) {
    alert("Maximum number of categories(12) reached!");
    return;
  }

  createNewBudgetElements();
}

function createNewBudgetElements() {
  const budgetDocFragment = document.createDocumentFragment();
  const budgetForm = document.createElement("form");
  const removeNodeButtonWrapper = document.createElement("button");
  const removeNodeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

  removeNodeButtonWrapper.setAttribute("class", "remove-element-wrapper");
  removeNodeButtonWrapper.addEventListener("click", function(event) { 
    event.preventDefault();
    removeNode(categoryNameCounterResult, budgetCategoryWrapper, budgetSubmitButton); 
  });
  removeNodeIcon.innerHTML = "<path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z'/>";
  removeNodeIcon.setAttribute("viewBox", "0 0 512 512");
  removeNodeIcon.setAttribute("class", "times-circle-svg");

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

  budgetForm.appendChild();

  let budgetElements = [budgetDocFragment, budgetForm, removeNodeButtonWrapper, removeNodeIcon, categoryNameLabel, categoryNameInput, budgetAmountLabel, budgetAmountInput, expenseAmountLabel, expenseAmountInput];
  appendElementsToDom(budgetElements);

  enableSubmitButton(budgetSubmitButton);
}

function appendElementsToDom(budgetElements) {
  // look at line 64 for budgetElements array to see elements
  budgetElements[1].appendChild(budgetElements[2]);
  budgetElements[2].appendChild(budgetElements[3]);
  for (let i = 4; i < budgetElements.length; i++) {
    budgetElements[1].appendChild(budgetElements[i]);
  }

  budgetElements[0].appendChild(budgetElements[1]);
  budgetCategoryWrapper.appendChild(budgetElements[0]);
}

function checkMaxCategoryNumbers() {
  return budgetCategoryWrapper.childElementCount === 12 ? true : false;
}

function categoryNameCounter() {
  return `category-${budgetCategoryWrapper.childElementCount + Math.random()}`;
}

function removeNode(child, wrapper, button) {
  const childElement = document.getElementById(child);
  childElement.parentNode.removeChild(childElement);
  disableSubmitButton(wrapper, button);
}

function disableSubmitButton(wrapper, button) {
  if ((wrapper.childElementCount === 0 ? true : false) === true) {
    button.setAttribute("disabled", "disabled");
  } else {
    enableSubmitButton(button);
  }
}

function enableSubmitButton(button) {
  button.removeAttribute("disabled");
}