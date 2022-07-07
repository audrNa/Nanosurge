// Cases for initial stats

/* Required Keys */
// name             String
// incisions        Number  *Required number of incisions until Fix It can be used
// pulse            Number
// temp             Number
// brokenBones      Number
// shatteredBones   Number
// fever            Boolean
// bleeding         Number
// bacteria         Number  *This will also affect site and vision

const CASES = [
    {
        name:           'Flu',
        incisions:      0,
        pulse:          0,
        temp:           100,
        brokenBones:    0,
        shatteredBones: 0,
        fever:          true,
        bleeding:       0,
        bacteria:       0
    },

    {
        name:           'Broken Everything',
        incisions:      4,
        pulse:          3,
        temp:           100,
        brokenBones:    4,
        shatteredBones: 4,
        fever:          true,
        bleeding:       2,
        bacteria:       50
    },

    {
        name:           'COVID-19',
        incisions:      1,
        pulse:          0,
        temp:           100,
        brokenBones:    0,
        shatteredBones: 0,
        fever:          true,
        bleeding:       0,
        bacteria:       76
    },

    {
        name:           'osu!',
        incisions:      8,
        pulse:          0,
        temp:           99.8,
        brokenBones:    3,
        shatteredBones: 1,
        fever:          true,
        bleeding:       1,
        bacteria:       75
    }
];
