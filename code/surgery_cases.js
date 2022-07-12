// Cases for initial stats

/* Required Keys */
// name             String
// problem          Number  *Required number of removed casings until Fix It can be used
// eCurrent         Number
// temp             Number
// brokenCables     Number
// burntCables      Number
// overheating      Boolean
// sparks           Number
// dust             Number  *This will affect site and vision so we don't need them

const CASES = [
    {
        name:           'Mechaflu',
        problem:        0,
        eCurrent:       0,
        temp:           105,
        brokenCables:   0,
        burntCables:    0,
        overheating:    true,
        sparks:         0,
        dust:           0
    },

    {
        name:           'Core Malfunction',
        problem:        4,
        eCurrent:       2,
        temp:           99.8,
        brokenCables:   0,
        burntCables:    4,
        overheating:    true,
        sparks:         1,
        dust:           0
    },

    {
        name:           'Inner Explosion',
        problem:        4,
        eCurrent:       3,
        temp:           110,
        brokenCables:   6,
        burntCables:    10,
        overheating:    true,
        sparks:         2,
        dust:           25
    },

    {
        name:           'War Injuries',
        problem:        2,
        eCurrent:       1,
        temp:           99.8,
        brokenCables:   6,
        burntCables:    2,
        overheating:    false,
        sparks:         1,
        dust:           35
    },

    {
        name:           'High Fall Damage',
        problem:        8,
        eCurrent:       2,
        temp:           99.8,
        brokenCables:   10,
        burntCables:    0,
        overheating:    false,
        sparks:         2,
        dust:           50
    },

    {
        name:           'Broken Hand',
        problem:        1,
        eCurrent:       0,
        temp:           99.8,
        brokenCables:   2,
        burntCables:    1,
        overheating:    false,
        sparks:         0,
        dust:           0
    }
];
