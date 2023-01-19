export const capitalize = (inputString) => {
  if (inputString.length > 0) {
    inputString = inputString[0].toUpperCase() + inputString.substring(1)
  }

  return inputString;
}

export const capitalizeEachWord = (inputString) => {
  let words = inputString.split(" ")

  for (let i = 0; i < words.length; i++)
    words[i] = capitalize(words[i])

  return words.join(" ");
}

export const capitalizeAndMapInformationField = (isPoint, inputField) => {
  const pointDictMap = {
    "name": "Point name",
    "code": "Point code",
    "description": "Point description",
    "anatomy": "Point location",
    "functionalities": "Point functionalities",
    "technique": "Point triggering method",
    "caution": "Triggering Caution"
  }

  const meridianDictMap = {
    "name": "Meridian name",
    "code": "Meridian code",
    "description": "Meridian path description",
    "diseases": "Meridian main related diseases",
    "points": "Acupuncture points"
  }

  const usingDictMap = isPoint ? pointDictMap : meridianDictMap;
  return capitalizeEachWord(usingDictMap[inputField])
}
