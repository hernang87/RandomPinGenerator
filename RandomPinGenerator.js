/*
    Random pin code generator
    Batches of 1000 codes
    Each pin code should be unique and 4 digits

    No consecutive incremental digits (3)
*/
'use strict';
module.exports = class RandomPinGenerator {

    constructor(digits, numberOfInvalidIncrementalDigits) {
        this.digits = digits || 4;
        this.invalidNumberOfConsecutiveDigits = numberOfInvalidIncrementalDigits || 3;
        this.generateInvalidSequences();
    }
    generateInvalidSequences() {
        var sequence = '',
            startAscii = 48,
            current;

        this.invalidSequences = [];

        while(startAscii <= 55) {
            current = startAscii;
            while(sequence.length < this.invalidNumberOfConsecutiveDigits) {
                sequence += String.fromCharCode(current);
                current++;
            }
            this.invalidSequences.push(sequence);
            startAscii++;
            sequence = '';
        }
    }
    getRandomPin() {
        var pin = '';
        var i = 0;
        while(pin.length < this.digits ) {
            let num = Math.floor(Math.random() * 10);
            pin += num;
        }
        return pin;
    }
    hasIncrementalDigits(pin) {
        var found = false,
            i = 0;

        while(!found && i < this.invalidSequences.length) {
            if(pin.indexOf(this.invalidSequences[i]) !== -1) {
                found = true;
            }
            i++;
        }

        return found;
    }
    getBatch(size) {
        var batch = [];

        while(batch.length < size) {
            let pin = this.getRandomPin();

            if(batch.indexOf(pin) === -1 && !this.hasIncrementalDigits(pin)) {
                batch.push(pin);
            }
        }
        return batch;
    }
}
