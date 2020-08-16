var readLineSync = require("readline-sync");
//import readlineSync from "readline-sync";

class Scranbler {
    constructor() {
        let arr = []
        for (let i = 97; i <= 122; i++) {
            arr.push(String.fromCharCode(i));
        }
        arr.sort(
            function () {
                return Math.random() - 0.5;
            }
        );
        //console.log(arr);
        //文字変換の数字の配列
        let scrambleNumArr = [];
        for (let i in arr) {
            let num = arr[i].charCodeAt(0) - 97 - i;
            if (num < 0) {
                num = num + 26;
            }
            scrambleNumArr.push(num);
        }
        // console.log(scrambleNumArr);

        this.scrambleArr = scrambleNumArr;
        this.count = 0;
    }

    //文字を受け取り変換後の値を返す
    //そのあと一つずらす
    encode(str) {
        let outputStrNum;
        let outputStr;
        // console.log(str);
        // console.log(str.charCodeAt(0));
        // console.log(this.scrambleArr);
        outputStrNum = str.charCodeAt(0) + this.scrambleArr[this.count];
        if (outputStrNum > 122) {
            //Zより先に行ってしまったら戻す
            outputStrNum -= 26;
        }
        outputStr = String.fromCharCode(outputStrNum);
        if (this.count < 25) {
            this.count++;
        } else {
            this.count -= 25
        }
        // console.log(this.count);
        return outputStr;
    }

    //復号
    //文字を受け取り変換後の値を返す
    //そのあと一つcountを減らす
    decode(str) {

        if (this.count > 0) {
            this.count--;
        } else {
            this.count += 25
        }

        let outputStrNum;
        let outputStr;
        // console.log(str);
        // console.log(this.scrambleArr[this.count]);
        // console.log(this.scrambleArr);
        outputStrNum = str.charCodeAt(0) - this.scrambleArr[this.count];
        if (outputStrNum < 97) {
            //Zより先に行ってしまったら戻す
            outputStrNum += 26;
        }
        outputStr = String.fromCharCode(outputStrNum);

        return outputStr;
    }

}

test1 = new Scranbler();
test2 = new Scranbler();
test3 = new Scranbler();

function encodeStr(str) {
    const encode1 = test1.encode(str)
    const encode2 = test2.encode(encode1)
    const encode3 = test3.encode(encode2)
    // console.log(`${encode1},${encode2},${encode3}`)
    return encode3;
}

function decodeStr(str) {
    const decode1 = test3.decode(str)
    const decode2 = test2.decode(decode1)
    const decode3 = test1.decode(decode2)
    // console.log(`${decode1},${decode2},${decode3}`)
    return decode3;
}



function encordtWord(word) {
    let wordArr = word.split('');
    let outputArr = [];
    for (let elem of wordArr) {
        outputArr.push(encodeStr(elem));
    }
    return outputArr.join('');
}

function decodeWord(word) {
    let wordArr = word.split('');
    let decodedArr = [];
    let outputArr = [];
    for (let i = 0; i < wordArr.length; i++) {
        // console.log(wordArr.length - i - 1);
        // console.log(wordArr[wordArr.length - i - 1]);
        decodedArr.push(decodeStr(wordArr[wordArr.length - i - 1]));
    }

    //順番を逆さまにする
    for (let i in decodedArr) {
        outputArr.push(decodedArr[decodedArr.length - i - 1])
    }
    return outputArr.join('');
}

// let test="test"
// console.log(encordtWord(test));


let word = readLineSync.question(`
    What word do you want to encode?
    `);
let encodeddWord = encordtWord(word);
console.log(`
    ENCODE
    before:"${word}"   
    after: "${encodeddWord}"
`);

let question = readLineSync.question(`
    DECODE? y or n
    `);

let decodedWord = decodeWord(encodeddWord);
if (question == "y" || question == "Y") {
    console.log(`
    DECODE
    before:"${encodeddWord}"
    after: "${decodedWord}"
    `);
}


//a=>97,z=>122

