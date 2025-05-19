function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray: T[] = array.slice();
  let isShuffled: boolean = false;
  do {
    for (
      let currentIndex: number = shuffledArray.length - 1;
      currentIndex > 0;
      currentIndex--
    ) {
      const indexToSwapWith: number = Math.floor(
        Math.random() * (currentIndex + 1),
      );
      [shuffledArray[currentIndex], shuffledArray[indexToSwapWith]] = [
        shuffledArray[indexToSwapWith],
        shuffledArray[currentIndex],
      ];
    }
    if (JSON.stringify(shuffledArray) !== JSON.stringify(array)) {
      isShuffled = true;
    }
  } while (!isShuffled);
  return shuffledArray;
}

export default shuffleArray;
