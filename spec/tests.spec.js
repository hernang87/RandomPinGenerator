const RandomPinGenerator = require('../src/RandomPinGenerator');

describe('RandomPinGenerator constructor', () => {
    it('has default values', () => {
        let rpg = new RandomPinGenerator(4, 3);
        expect(rpg.digits).not.toBeNull();
        expect(rpg.invalidNumberOfConsecutiveDigits).not.toBeNull();
    });

    it('sets correct values', () => {
        let rpg = new RandomPinGenerator(10, 8);
        expect(rpg.digits).toBe(10);
        expect(rpg.invalidNumberOfConsecutiveDigits).toBe(8);
    });

    it('generates invalid sequences', () => {
        let rpg = new RandomPinGenerator();
        expect(rpg.invalidSequences.length).not.toBe(0);
    });
});

describe('RandomPinGenerator pin generation', () => {
    it('generates pin', () => {
        let rpg = new RandomPinGenerator(4, 3);
        let pin = rpg.getRandomPin();

        expect(pin).not.toBeNull();
    });
    it('generated pin has expected length', () => {
        let rpg = new RandomPinGenerator(4, 3);
        let pin = rpg.getRandomPin();

        expect(pin.length).toBe(rpg.digits);
    });
    it('incremental digit sequence validation', () => {
        let rpg = new RandomPinGenerator(4, 3);
        let pin = '012';

        expect(rpg.hasIncrementalDigits(pin)).toBe(true);
    });
    it('considers all incremental digit possibilities', () => {
        let rpg = new RandomPinGenerator(4, 3);
        let pins = ['012', '123', '234', '345', '456', '567', '678', '789'];

        expect(rpg.invalidSequences).toEqual(pins);
    });
});

describe('RandomPinGenerator batch generation', () => {
    it('generates batch of expected size', () => {
        let rpg = new RandomPinGenerator(4, 3);
        let batchSize = 1000;
        let batch = rpg.getBatch(batchSize);

        expect(batch.length).toEqual(batchSize);
    });
    it('doesn\'t have repetitions', () => {
        let rpg = new RandomPinGenerator(4, 3);
        let batchSize = 1000;
        let batch = rpg.getBatch(batchSize);

        let arr = [];
        let repetitions = 0
        for(var i = 0; i < batch.length; i++) {
            if(arr[batch[i]] !== undefined) {
                arr[batch[i]]++;
                repetitions++;
            } else {
                arr[batch[i]] = 1;
            }
        }

        expect(repetitions).toBe(0);



    });
});
