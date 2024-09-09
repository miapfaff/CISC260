/*Write a program in the language of your choice (c ,c++, java, python, etc.) which takes as input an integer (positive or negative) in base 10, and returns a string representation in 32-bit of the number in hexadecimal and binary.
Use a twos-complement representation for negative numbers
You can create an array of symbols 0-F to make it easier to figure out each digit.
char digits[]=[‘0’,’1’,’2’,’3’,’4’,’5’,’6’,’7’,’8’,’9’,’A’,’B’,’C’,’D’,’E’,’F’];
then digits[12] will return ‘C’
You should convert the absolute value to binary first, then take the twos complement if the value is negative, then convert the binary to hexadecimal
You may not use any built in conversion operators or print operators that can do the conversion automatically (i.e. NO printf(‘%x’,number)).
*/

const hexDig: string[]=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

function getBinary(num: number): string {
    let binary = '';
    for (let i = 31; i >= 0; --i) {
        const shiftedBit = 1 << i;              //shift binary 1 to the left by i positions
        const bitIsSet = num & shiftedBit;      //check if bit is 1 and shiftedBit is 1, then creates new num 1. if either is 0, new num is 0

        if (bitIsSet) {              //check if the new num is non-zero (meaning the ith bit is 1)
            binary += '1';           //if non-zero, ith bit is set to 1
        } else {
            binary += '0';           //if zero, ith bit is 0
        }
    }
    return binary;
}
console.log(getBinary(23));


function twosComplement(binary: string): string {
    if (binary.length > 32) {
        throw new Error("Input binary string is longer than 32 bits.");
    }
    binary = binary.padStart(32, '0');

    let complement = '';
    let flip = false;
    for (let i = binary.length - 1; i >= 0; i--) {
        let bit = binary[i];
        if (flip) {
            let flippedBit: string;
        
            // Determine the flipped value of the bit
            if (bit === '1') {
                flippedBit = '0';  // If bit is '1', the flipped value is '0'
            } else {
                flippedBit = '1';  // If bit is '0', the flipped value is '1'
            }
        
            // Prepend the flipped bit to the complement string
            complement = flippedBit + complement;
        } else {
            complement = bit + complement;
        }
        if (bit === '1') {
            flip = true;
        }
    }
    return complement.slice(0,-2) + '1';  //how i want to handle carry 1 at the end (might not work for all cases)
    
}
    
console.log(twosComplement('1000011 '));