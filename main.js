const bubbleSortForm = document.querySelector("#bubble-sort-form");
const selectionSortForm = document.querySelector("#selection-sort-form");
const insertionSortForm = document.querySelector("#insertion-sort-form");
const mergeSortForm = document.querySelector("#merge-sort-form");

const bubbleSortInput = document.querySelector("#bubble-sort-input");
const selectionSortInput = document.querySelector("#selection-sort-input");
const insertionSortInput = document.querySelector("#insertion-sort-input");
const mergeSortInput = document.querySelector("#merge-sort-input");

let resultBubbleSort = document.querySelector("#result-bubble-sort");
let resultSelectionSort = document.querySelector("#result-selection-sort");
let resultInsertionSort = document.querySelector("#result-insertion-sort");
let resultMergeSort = document.querySelector("#result-merge-sort");

const clearButtons = document.querySelectorAll(".clear-button");

const calculateBubble = calculateWithCache(bubbleSortFun);
const calculateSelection = calculateWithCache(selectionSortFun);
const calculateInsertion = calculateWithCache(insertionSortFun);
const calculateMerge = calculateWithCache(mergeSortFun);

bubbleSortForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputValue = bubbleSortInput.value.trim();
  validateInputValue(inputValue, resultBubbleSort, calculateBubble);
});

selectionSortForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputValue = selectionSortInput.value.trim();
  validateInputValue(inputValue, resultSelectionSort, calculateSelection);
});

insertionSortForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputValue = insertionSortInput.value.trim();
  validateInputValue(inputValue, resultInsertionSort, calculateInsertion);
});

mergeSortForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputValue = mergeSortInput.value.trim();
  validateInputValue(inputValue, resultMergeSort, calculateMerge);
});

clearButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const userInput = document.querySelector(`#${button.dataset.input}`);
    const outputElement = document.querySelector(`#${button.dataset.result}`);
    clearInputAndResult(userInput, outputElement);
  });
});

function calculateWithCache(sortNumbers) {
  const cache = new Map();

  return function (numbers) {
    let inputValue = numbers.join("");

    if (cache.has(inputValue)) {
      return cache.get(inputValue);
    }
    let sortedNumbers = sortNumbers(numbers);
    cache.set(inputValue, sortedNumbers);
    return sortedNumbers;
  };
}

function bubbleSortFun(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function selectionSortFun(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

function insertionSortFun(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

function mergeSortFun(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortFun(arr.slice(0, mid));
  const right = mergeSortFun(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function validateInputValue(inputValue, outputElement, calculate) {
  let valuesArray = inputValue.split(" ");
  let cleanedArray = valuesArray.map((current) =>
    current
      .split("")
      .map((char) => (char === "," ? "" : char))
      .join("")
  );
  let filteredArray = cleanedArray.filter((current) => current !== "");
  const enteredValues = filteredArray.map((el) => +el);
  const isValid = enteredValues.every((number) => !isNaN(number));

  if (enteredValues.length === 0 || !isValid) {
    outputElement.innerHTML = `
  <p style="color: red;">Please enter valid numbers separated by commas or spaces.</p>
  `;
    return;
  }
  let result = calculate(enteredValues);
  outputElement.innerHTML = `
    <p style="color: #9b4dca;">${result.join(" ")}</p>
  `;
}

function clearInputAndResult(userInput, outputElement) {
  userInput.value = "";
  outputElement.innerHTML = "";
}
