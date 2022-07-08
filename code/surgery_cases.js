// Cases for initial stats

/* Required Keys */
// name             String
// casings          Number  *Required number of casings until Fix It can be used
// eCurrent         Number
// temp             Number
// brokenCables     Number
// burntCables      Number
// overheating      Boolean
// sparks           Number
// dust             Number  *This will also affect site and vision

const CASES = [
    {
        name:           'Mechaflu',
        casings:        0,
        eCurrent:       0,
        temp:           100,
        brokenCables:   0,
        burntCables:    0,
        overheating:    true,
        sparks:         0,
        dust:           0
    },

    {
        name:           'Broken Everything',
        casings:         4,
        eCurrent:        3,
        temp:            100,
        brokenCables:    4,
        burntCables:     4,
        overheating:     true,
        sparks:          2,
        dust:            76
    },

    {
        name:           'COVID-19 for Robots',
        casings:        1,
        eCurrent:       0,
        temp:           100,
        brokenCables:   0,
        burntCables:    0,
        overheating:    true,
        sparks:         0,
        dust:           50
    },

    {
        name:           'osu!',
        casings:        8,
        eCurrent:       0,
        temp:           99.8,
        brokenCables:   3,
        burntCables:    1,
        overheating:    true,
        sparks:         1,
        dust:           75
    }
];
