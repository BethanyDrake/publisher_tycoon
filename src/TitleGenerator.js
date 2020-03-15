

const getRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
}


const getNextTitle = () => {

  const adjectives = ["Hungry", "Wistful", "Colourful", "Mysterious", "Incredible", "Unhappy"];
  const nouns = ["Ghost", "Witness", "Icecream", "Fear", "Misery", "Stone", "Dragon", "Bed", "Throne", "Pillow", "Monkey", "Witch", "Pancake"]

  const schemes = [
    () => getRandom(nouns),
    () => "The " + getRandom(nouns),
    () => "The " + getRandom(adjectives) + " " + getRandom(nouns),
    () => getRandom(adjectives) + " " + getRandom(nouns),
    () => getRandom(nouns) + " of the " + getRandom(adjectives) + " " + getRandom(nouns),
  ]
  return getRandom(schemes)();

}

// Uncomment to test/sample
// for(let i=0; i< 10; i++){
//   console.log(getNextTitle());
// }

export default getNextTitle