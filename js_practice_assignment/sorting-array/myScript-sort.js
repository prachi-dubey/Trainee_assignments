var arrNumber =[76,3,8,12,0,43,65,34];

function bubble_Sort(arr) {

    var len = arr.length, i, j, stop, temp;

    for (i = 0; i < len; i++){
        for (j = 0; j < len - 1 ; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    return arr;
}

bubble_Sort(arrNumber);
console.log(arrNumber);
