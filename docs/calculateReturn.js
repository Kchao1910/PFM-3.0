/*
  This function serves to house other functions such as
  input retrieval, displaying output, and data visualization
*/
function getAssetInput() {
  const assetNameCollection = document.querySelectorAll(".asset-name-label");
  const assetWeightCollection = document.querySelectorAll(".asset-weight-input");
  const assetReturnCollection = document.querySelectorAll(".asset-return-input");

  displayReturn(calculateAverageReturn(assetWeightCollection, assetReturnCollection));

  const assetNameValues = getAssetNames(assetNameCollection);
  const assetWeightValues = getInputValues(assetWeightCollection);


  createDonutChart(assetNameValues, assetWeightValues, "Asset Return", "Asset Return Allocation");
}

/*
  This function takes in a collection of input elements and
  retrieves their values
*/
function getAssetNames(collection) {
  let array = [];
  for (let element of collection) {
    array.push(element.innerText);
  }

  return array;
}


/*
  This function calculates a weighted return rate of all assets
*/
function calculateAverageReturn(assetWeightCollection, assetReturnCollection) {
  let averageReturn = 0;

  console.log(assetWeightCollection);

  for (let i = 0; i < assetWeightCollection.length; i++) {
    console.log(i);
    averageReturn += ((assetWeightCollection[i].value/100) * (assetReturnCollection[i].value/100));
    console.log(averageReturn);
  }


  return averageReturn;
}


/*
 This function displays the weighted return rate
*/
function displayReturn(averageReturn) {
  const assetSummary = document.querySelector("#asset-summary");

  assetSummary.innerHTML = `Average Return Rate: <span class="budget-leftover-green">%${(100 * averageReturn).toFixed(2)}</span>`;
}
