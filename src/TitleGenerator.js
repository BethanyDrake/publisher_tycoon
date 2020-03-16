

const getRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
}


const getNextTitle = () => {

  const adjectives = ["Anorexic", "Beautiful", "Crappy", "Dilapidated", "Egotistical", "Furry", "Giant", "Happy", "Ignious", "Juicy", "Killer", "Lazy", "Morose", "Natural", "Overt", "Powerful", "Quirky", "Restful", "Twisty", "Unusual", "Vociferous", "Weary", "Yellow", "Xenophobic", "Zany", "Hungry", "Wistful", "Colourful", "Mysterious", "Incredible", "Unhappy", "Red", "Black", "Green", "Azure"];
  const nouns = ["Apple", "Bear", "Cage", "Danger", "Elbow", "Face", "Guppy", "Hero", "Igloo", "Jade", "Killer", "Lemon", "Milkmaid", "Name", "Opal", "Person", "Query", "Race", "Station", "Tree", "Urn", "Vase", "Whisper", "Zebra", "Ghost", "Witness", "Icecream", "Fear", "Misery", "Stone", "Dragon", "Bed", "Throne", "Pillow", "Monkey", "Witch", "Pancake"]

  const schemes = [
    () => getRandom(nouns),
    () => "The " + getRandom(nouns),
    () => "The " + getRandom(adjectives) + " " + getRandom(nouns),
    () => getRandom(adjectives) + " " + getRandom(nouns),
    () => getRandom(nouns) + " of the " + getRandom(adjectives) + " " + getRandom(nouns),
    () => getRandom(nouns) + " " + getRandom(nouns),
    () => "The "+ getRandom(nouns) + " " + getRandom(nouns),
  ]
  return getRandom(schemes)();

}

// Uncomment to test/sample
// for(let i=0; i< 10; i++){
//   console.log(getNextTitle());
// }

export default getNextTitle