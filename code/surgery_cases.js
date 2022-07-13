// Cases for initial stats

/* Required Keys */
// name             String
// problem          Number      *Required number of removed casings until Fix It can be used
// eCurrent         Number
// temp             Number
// brokenCables     Number
// burntCables      Number
// overheating      Boolean
// sparks           Number
// dust             Number      *This will affect site and vision so we don't need them
// special()        Function    *Extra code that can affect variables in a custom way

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
        eCurrent:       1,
        temp:           99.8,
        brokenCables:   0,
        burntCables:    0,
        overheating:    true,
        sparks:         1,
        dust:           0
    },

    {
        name:           'Inner Explosion',
        problem:        4,
        eCurrent:       2,
        temp:           110,
        brokenCables:   3,
        burntCables:    7,
        overheating:    true,
        sparks:         2,
        dust:           25,
        special() {
            // Don't do this if it's fixed
            if (!problem)
            {
                return;
            }

            // 5% chance to explode and burn & more cables
            if (rng(1, 20) == 1)
            {
                burntCables += rng(3, 5);
                brokenCables += rng(1, 2);
                extraMessage.add("The core just exploded again!", 'bad');
            }

            // 10% chance to give overheating
            if (rng(1, 10) == 1)
            {
                overheating = true;
            }
        }
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
        dust:           35,
        special() {
            // Don't do this if it's fixed
            if (!problem)
            {
                return;
            }

            // 1/5 chance to get more sparks
            if (rng(1, 5) == 1)
            {
                sparks++;
            }
        }
    },

    {
        name:           'High Fall Damage',
        problem:        6,
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
        brokenCables:   0,
        burntCables:    0,
        overheating:    false,
        sparks:         0,
        dust:           0
    },

    {
        name:           'Broken Leg',
        problem:        2,
        eCurrent:       1,
        temp:           99.8,
        brokenCables:   4,
        burntCables:    0,
        overheating:    false,
        sparks:         1,
        dust:           0
    },

    {
        name:           'Broken Head',
        problem:        6,
        eCurrent:       1,
        temp:           99.8,
        brokenCables:   0,
        burntCables:    2,
        overheating:    false,
        sparks:         0,
        dust:           0
    },

    {
        name:           'File Corruption',
        problem:        1,
        eCurrent:       0,
        temp:           99.8,
        brokenCables:   0,
        burntCables:    0,
        overheating:    true,
        sparks:         0,
        dust:           0
    },

    {
        name:           'Missing Internal Part',
        problem:        3,
        eCurrent:       1,
        temp:           99.8,
        brokenCables:   2,
        burntCables:    1,
        overheating:    false,
        sparks:         1,
        dust:           0
    },

    {
        name:           'Misplaced Limbs',
        problem:        3,
        eCurrent:       1,
        temp:           99.8,
        brokenCables:   4,
        burntCables:    2,
        overheating:    true,
        sparks:         2,
        dust:           25
    },

    {
        name:           'Core Overclock',
        problem:        4,
        eCurrent:       2,
        temp:           105,
        brokenCables:   0,
        burntCables:    5,
        overheating:    true,
        sparks:         1,
        dust:           0,
        special() {
            // Don't do this if it's fixed
            if (!problem)
            {
                return;
            }

            // Buff overheating by +2.5 temp
            if (overheating)
            {
                temp += rng(2, 3);
                return;
            }

            // Another 10% chance to give overheating
            if (rng(1, 10) == 1)
            {
                overheating = true;
            }
        }
    },

    {
        name:           'Rat Infestation',
        problem:        5,
        eCurrent:       0,
        temp:           99.8,
        brokenCables:   10,
        burntCables:    3,
        overheating:    false,
        sparks:         1,
        dust:           25,
        special() {
            // 10% chance rats break more cables if they're still alive
            if (problem && rng(1, 10) == 1)
            {
                brokenCables++;
            }
        }
    },

    {
        name:           'Drenched in Water',
        problem:        6,
        eCurrent:       2,
        temp:           99.8,
        brokenCables:   0,
        burntCables:    0,
        overheating:    false,
        sparks:         3,
        dust:           50
    },

    {
        name:           'Incinerated',
        problem:        6,
        eCurrent:       2,
        temp:           99.8,
        brokenCables:   0,
        burntCables:    15,
        overheating:    false,
        sparks:         0,
        dust:           50
    }
];
