const assetWrapper = document.querySelector("#asset-wrapper");
const assetSubmitButton = document.querySelector("#asset-submit-button");

disableSubmitButton(assetWrapper, assetSubmitButton);

function addAsset(assetName) {
  if (checkAssetExists(assetName) === true) {
    alert("Asset has already been added to portfolio!"); 
    return;
  }

  const docFragment = document.createDocumentFragment();

  const assetForm = document.createElement("form");
  const removeAssetButtonWrapper = document.createElement("button");
  const removeAssetIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const assetNameLabel = document.createElement("label");
  const assetWeightLabel = document.createElement("label");
  const assetWeightInput = document.createElement("input");
  const assetReturnRateLabel = document.createElement("label");
  const assetReturnRateInput = document.createElement("input");

  const assetNameCounterResult = assetNameCounter(assetName);

  assetForm.setAttribute("class", "asset-form");
  assetForm.setAttribute("id", assetNameCounterResult);

  assetNameLabel.setAttribute("class", "asset-name-label");
  assetWeightInput.setAttribute("class", "asset-weight-input");
  assetReturnRateInput.setAttribute("class", "asset-return-input");

  assetWeightInput.setAttribute("type", "number");
  assetReturnRateInput.setAttribute("type", "number");

  removeAssetButtonWrapper.setAttribute("class", "remove-element-wrapper");
  removeAssetButtonWrapper.addEventListener("click", function(event) { 
    event.preventDefault();
    removeNode(assetNameCounterResult, assetWrapper, assetSubmitButton); 
  });
  removeAssetIcon.innerHTML = "<path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z'/>";
  removeAssetIcon.setAttribute("viewBox", "0 0 512 512");
  removeAssetIcon.setAttribute("class", "times-circle-svg");

  assetNameLabel.textContent = assetName;
  assetWeightLabel.textContent = "Asset Weight";
  assetReturnRateLabel.textContent = "Asset Return Rate";
  assetWeightInput.setAttribute("placeholder", "30");
  assetReturnRateInput.setAttribute("placeholder", "10");

  assetForm.appendChild(removeAssetButtonWrapper);
  removeAssetButtonWrapper.appendChild(removeAssetIcon);
  assetForm.appendChild(assetNameLabel);
  assetForm.appendChild(assetWeightLabel);
  assetForm.appendChild(assetWeightInput);
  assetForm.appendChild(assetReturnRateLabel);
  assetForm.appendChild(assetReturnRateInput);

  docFragment.appendChild(assetForm);

  assetWrapper.appendChild(docFragment);

  enableSubmitButton(assetSubmitButton);
}

function assetNameCounter(assetName) {
  return `asset-${assetName}`;
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

function checkAssetExists(assetName) {
  return document.querySelector(`#asset-${assetName}`) !== null ? true : false;
}