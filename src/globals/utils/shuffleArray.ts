function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray: T[] = array.slice();
  let isShuffled: boolean = false;
  do {
    for (let i: number = shuffledArray.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    if (JSON.stringify(shuffledArray) !== JSON.stringify(array)) {
      isShuffled = true;
    }
  } while (!isShuffled);
  return shuffledArray;
}

export default shuffleArray;
