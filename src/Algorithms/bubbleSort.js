export default function bubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

// returns the bubble sort algorithm
function bubbleSort(arr, animations) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
    let first = arr[j];
    let second = arr[j+1];
    if (first > second) {
      // Highlights the bounds
      animations.push([i, i]);
      animations.push([i, i]);
      // We push the value at index j in the original array with the value at index j+1 in the current array to be swapped in conjunction with the 
      // below animations push sequence.      
      animations.push([j, arr[j+1]]);

      // Highlights the bounds
      animations.push([j, j+1]);
      animations.push([j, j+1]);
      // We push the value at index j+1 in the original array with the value at index j in the current array to be swapped in conjunction with the 
      // above animations push sequence.
      animations.push([j+1, arr[j]]);

      swap(arr, j, j+1);
    }
    }
  }
}

function swap(arr, pivotIndex, end) {
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
}
