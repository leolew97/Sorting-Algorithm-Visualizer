// returns an array of arrays that contains the animations
export default function quickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(arr, start, end, animations) {
  if (start >= end) {
    return;
  }
  let index = partition(arr, start, end, animations);
  quickSort(arr, start, index - 1, animations),
  quickSort(arr, index + 1, end, animations);
}

function partition(arr, start, end, animations) {
  let pivotIndex = start;
  let pivotValue = arr[end];

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // Highlights the bounds
      animations.push([i, end]);
      animations.push([i, end]);
      // We push the value at index i in the original array with the value at the pivotIndex in the current array to be swapped in conjunction with the 
      // below animations push sequence.
      animations.push([i, arr[pivotIndex]]);
      
      // Highlights the bounds
      animations.push([i, pivotIndex]);
      animations.push([i, pivotIndex]);
      // We push the value at pivotIndex in the original array with the value at index i in the current array to be swapped in conjunction with the 
      // above animations push sequence.
      animations.push([pivotIndex, arr[i]]);

      swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }

  // Highlights the bounds
  animations.push([pivotIndex, pivotIndex]);
  animations.push([pivotIndex, pivotIndex]);
  // We push the value at pivotIndex in the original array with the value at index end in the current array to be swapped in conjunction with the 
  // below animations push sequence.
  animations.push([pivotIndex, arr[end]]);

  // Highlights the bounds
  animations.push([end, end]);
  animations.push([end, end]);
  // We push the value at index end in the original array with the value at the pivotIndex in the current array to be swapped in conjunction with the 
  // above animations push sequence.
  animations.push([end, arr[pivotIndex]]);

  swap(arr, pivotIndex, end);
  return pivotIndex;
}

function swap(arr, pivotIndex, end) {
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
}
