const textToChars = (text: string) => text.split("").map(c => c.charCodeAt(0));
const byteHex = (n: string) => ("0" + Number(n).toString(16)).substr(-2);

function applySaltToChar(code: any, salt: string): any {
  return textToChars(salt).reduce((a, b) => a ^ b, code);
}

function cipher(salt: string) {
  return (text: string) =>
    text
      .split("")
      .map(textToChars)
      .map(code => applySaltToChar(code, salt))
      .map(byteHex)
      .join("");
}

function decipher(salt: string) {
  return (encoded: string) => {
    const matched = encoded.match(/.{1,2}/g);
    if (!matched) {
      throw new Error("OOps");
    }

    return matched
      .map(hex => parseInt(hex, 16))
      .map(code => applySaltToChar(code, salt))
      .map(charCode => String.fromCharCode(charCode))
      .join("");
  };
}

function crypto(salt: string) {
  return {
    encrypt: (str: string) => cipher(salt)(str),
    decrypt: (str: string) => decipher(salt)(str)
  };
}
export default crypto;
