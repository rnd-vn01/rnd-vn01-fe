export const capitalize = (inputString) => {
    if (inputString.length > 0) {
        inputString = inputString[0].toUpperCase() + inputString.substring(1)
    }

    return inputString;
} 
