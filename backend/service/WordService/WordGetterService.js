require("dotenv").config();
const fs = require('node:fs');

const MacKeyBoard = ["!qwertyuiop", "asdfghjkl", "zxcvbnm,."] // some of kb to use to

function countKeyInds(kb) {
    const keyToInd = new Map();
    for (let i = 0; i < kb.length; i++) {
        for (let j = 0; j < kb[i].length; j++) {
            keyToInd[kb[i][j]] = [i, j];
        }
    }
    return keyToInd
}

class Keyboard {
    keys;
    keyToInd;

    constructor(keyboard) {
        this.keys = keyboard
        this.keyToInd = countKeyInds(keyboard)
    }

    calcCharDistance(a, b) {
        return Math.abs(this.keyToInd[a][0] - this.keyToInd[b][0]) + Math.abs(this.keyToInd[a][1] - this.keyToInd[b][1]);
    }

    // return word hardness by len
    countWordVal(word) {
        let sum = 0
        for (let i = 1; i < word.length; i++) {
            sum += this.calcCharDistance(word[i - 1], word[i])
        }
        return sum
    }
}

function arrRmSpecSymbols(arr) { // rm \r in arr of strings
    for (let i = 0; i < arr.length; i++) {
        let newS = "";
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] != '\r' && arr[i][j] != ' ') {
                newS += arr[i][j];
            } else {
                j++;
            }
        }

        arr[i] = newS;
    }

    return arr;
}

function SortWords() {
    try {
        const data = fs.readFileSync(process.env.EN_WORDS_FILE, 'utf8');
        const sArr = arrRmSpecSymbols(data.replace('\r', '').split('\n'));
        sArr.pop(); // rm last elements after last splitter

        const kb = new Keyboard(MacKeyBoard);
        sArr.sort((w1, w2) => {
            return kb.countWordVal(w1) - kb.countWordVal(w2);
        })
        return sArr;
    } catch (err) {
        console.error(err);
        return err;
    }
}

module.exports = {SortWords: SortWords};