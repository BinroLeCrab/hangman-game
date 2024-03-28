export const checkLetter = (letter, AutorisLetter) => {
    if (AutorisLetter.includes(letter)) {
        return true;
    } else {
        return false;
    }
}