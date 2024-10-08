const digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

// Function to convert decimal to binary string (positive only)
function decimalToBinary(num: number): string {
    let binary: string = '';
    for (let i = 31; i >= 0; i--) {
        binary += ((num >>> i) & 1) ? '1' : '0';  // unsigned right shift to handle 32 bits
    }
    return binary;
}

// Function to get two's complement
function twosComplement(binary: string): string {
    let flip = false;
    let result = '';

    for (let i = binary.length - 1; i >= 0; i--) {
        let bit = binary[i];
        if (flip) {
            // Invert bits after finding the first '1'
            result = (bit === '1' ? '0' : '1') + result;
        } else {
            result = bit + result;
            if (bit === '1') {
                flip = true;
            }
        }
    }
    return result;
}

// Function to convert binary to hexadecimal
function binToHex(binary: string): string {
    let hex = '';
    for (let i = 0; i < 32; i += 4) {
        const nibble = binary.substring(i, i + 4);
        const decimalValue = parseInt(nibble, 2);
        hex += digits[decimalValue];
    }
    return hex;
}

// Main function to handle the conversion
function toBinaryAndHex(num: number): { binary: string, hex: string } {   // returns two objects of type string
    let binary: string = '';
    if (num >= 0) {
        binary = decimalToBinary(num);
    } else {
        const absNum = Math.abs(num);
        binary = decimalToBinary(absNum);
        binary = twosComplement(binary);
    }
    const hex = binToHex(binary);
    return { binary, hex };
}

// Example usage
const num = -33;  // You can change this to any number
const result = toBinaryAndHex(num);
console.log(`Binary: ${result.binary}`);
console.log(`Hexadecimal: ${result.hex}`);
const promptSync1 = require('prompt-sync')();

// Get user input
const str1: string = promptSync1("Enter a base 10 number: ") || '0';

console.log(`Binary: ${result.binary} and to Hex is: ${result.hex}`);


// --------------------------------------  START OF PROGRAM 2  -------------------------------------------------


function hexToDecimal(hexStr: string): number {
    // Dictionary to map hex characters to decimal values
    const hexToDec: { [key: string]: number } = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
        '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
    };
    hexStr = hexStr.trim().toUpperCase();
    
    let decimalValue = 0;

    // Iterate over the hex string
    for (let i = 0; i < hexStr.length; i++) {
        const char = hexStr[i].toUpperCase();
        decimalValue = decimalValue * 16 + hexToDec[char];
    }

    return decimalValue;
}

const promptSync = require('prompt-sync')();

// Get user input
const hexStr: string = promptSync("Enter a 32-bit hexadecimal number: ") || '0';
const decimalValue = hexToDecimal(hexStr);
console.log(`Hexadecimal ${hexStr} converted to Decimal is: ${decimalValue}`);
