// Cases for initial stats

/* Required Keys */
// name             String
// casings        Number  *Required number of casings until Fix It can be used
// eCurrent            Number
// temp             Number
// brokenCables      Number
// shatteredBones   Number
// fever            Boolean
// bleeding         Number
// bacteria         Number  *This will also affect site and vision

const CASES = [
    {
        name:           'Flu',
        casings:      0,
        eCurrent:          0,
        temp:           100,
        brokenCables:    0,
        shatteredBones: 0,
        fever:          true,
        bleeding:       0,
        bacteria:       0
    },

    {
        name:           'Broken Everything',
        casings:      4,
        eCurrent:          3,
        temp:           100,
        brokenCables:    4,
        shatteredBones: 4,
        fever:          true,
        bleeding:       2,
        bacteria:       50
    },

    {
        name:           'COVID-19',
        casings:      1,
        eCurrent:          0,
        temp:           100,
        brokenCables:    0,
        shatteredBones: 0,
        fever:          true,
        bleeding:       0,
        bacteria:       76
    },

    {
        name:           'osu!',
        casings:      8,
        eCurrent:          0,
        temp:           99.8,
        brokenCables:    3,
        shatteredBones: 1,
        fever:          true,
        bleeding:       1,
        bacteria:       75
    }
];
