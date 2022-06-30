// Cases for initial stats
class Case {
    constructor(name, incisions, pulse, temp, brokenBones, shatteredBones, fever) {
        this.name = name;                       // String
        this.incisions = incisions;             // Integer
        this.pulse = pulse;                     // Integer
        this.temp = temp;                       // Float
        this.brokenBones = brokenBones;         // Integer
        this.shatteredBones = shatteredBones;   // Integer
        this.fever = fever;                     // Boolean
    }
}

const CASES = [
    new Case('Flu', 0, 0, 100, 0, 0, true), 
    new Case('Broken Everything', 4, 3, 92, 4, 4, false),
    new Case('COVID-19', 1, 0, 100, 0, 0, true)
];
