const findElementInArray = (arr, start, end, target) => {
	if(start > end){
		return false;
	}
	let midIndex = Math.floor((start + end) / 2);

	if(arr[midIndex].key === target){
		return arr[midIndex].value;
	}

	if(arr[midIndex].key > target){
		return findElementInArray(arr, start, midIndex-1, target);
	}else{
		return findElementInArray(arr, midIndex+1, end, target);
	}
};

module.exports = findElementInArray;