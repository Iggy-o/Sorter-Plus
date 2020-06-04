async function heapSort() {
  let n = arr.length - 1
  await bubble()
  async function bubble() {
    for(let parentNode = n; parentNode >= 0; parentNode--) {
      await drown(parentNode)
    }
    while (n >= 0) {
      await swap(0, n)
      n--
      await drown(0)
    }
  }
  async function drown(parentNode) {
    let leftNode = parentNode*2 + 1
    let rightNode = parentNode*2 + 2
    let maxNode = parentNode;
    if (leftNode <= n){
      await comparison(leftNode, maxNode);
      if(arr[leftNode].height > arr[maxNode].height){
        maxNode = leftNode
      }
    }
    if(rightNode <= n) {
      await comparison(rightNode, maxNode);
      if (arr[rightNode].height > arr[maxNode].height){
        maxNode = rightNode
      }
    }
    if (maxNode > parentNode) {
      await swap(parentNode, maxNode)
      await drown(maxNode)
    }
  }
  check();
}