// Cases for initial stats

/* Required Keys */
// name             String
// incisions        Number  This is the required number of incisions until Fix It can be used.
// pulse            Number
// temp             Number
// brokenBones      Number
// shatteredBones   Number
// fever            Boolean

const CASES = [
    {
        name:           'Flu',
        incisions:      0,
        pulse:          0,
        temp:           100,
        brokenBones:    0,
        shatteredBones: 0,
        fever:          true
    },

    {
        name:           'Broken Everything',
        incisions:      4,
        pulse:          3,
        temp:           0,
        brokenBones:    4,
        shatteredBones: 4,
        fever:          false
    },

    {
        name:           'COVID-19',
        incisions:      1,
        pulse:          0,
        temp:           100,
        brokenBones:    0,
        shatteredBones: 0,
        fever:          true
    }
];
