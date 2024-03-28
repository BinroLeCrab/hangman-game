const AutorisLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const checkLetter = (letter) => {
    if (AutorisLetter.includes(letter)) {
        return true;
    } else {
        return false;
    }
}