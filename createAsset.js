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
  const removeAssetIcon = document.createElement("i");
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
  removeAssetIcon.setAttribute("class", "far fa-times-circle");

  assetNameLabel.textContent = assetName;
  assetWeightLabel.textContent = "Asset Weight";
  assetReturnRateLabel.textContent = "Asset Return Rate";

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