// Cases for initial stats

/* Required Keys */
// name             String
// description:     String
// problem          Number      *Required number of removed casings until Fix It can be used
// price            Number
// eCurrent         Number
// temp             Number
// brokenCables     Number
// burntCables      Number
// overheating      Boolean
// sparks           Number
// dust             Number      *This will affect site and vision so we don't need them
// special()        Function    *Extra code that can affect variables in a custom way

const CASES = [];
switch (fetchPlayerLevel())
{
    default:
        // Level 4 up: All
    case 4:
        // TODO
        setCaseLevel(4);
    case 3:
        // TODO
        setCaseLevel(3);
    case 2:
        // TODO
        CASES.push(
        {
            name:           'Incinerated',
            description:    "The robot was thrown into an incinerator. Fortunately, it was strong enough to survive but almost everything inside was burnt.",
            problem:        15,
            price:          50,
            eCurrent:       2,
            temp:           99.8,
            brokenCables:   0,
            burntCables:    20,
            overheating:    false,
            sparks:         0,
            dust:           50
        },

        {
            name:           'Nanoextremus Parasite',
            description:    "A tiny (nano) robot that invades robots' bodies and attacks the core. They make it so that the core is always heating up until it explodes.",
            problem:        4,
            price:          30,
            eCurrent:       0,
            temp:           99.8,
            brokenCables:   0,
            burntCables:    0,
            overheating:    true,
            sparks:         0,
            dust:           0,
            special() {
                // Always overheating until fixed
                overheating = true;
            }
        },

        {
            name:           'Destroyed Robot',
            description:    "A robot that has been entirely destroyed but somehow still alive. Nearly every part of it doesn't work. It has been partially repaired to not spark a lot.",
            problem:        20,
            price:          40,
            eCurrent:       1,
            temp:           99.8,
            brokenCables:   0,
            burntCables:    0,
            overheating:    false,
            sparks:         0,
            dust:           25
        },

        {
            name:           'Rusty Robot',
            description:    "A rusty old robot, been running for years or even decades depending on the quality. These robots are still good enough to be upgraded, this one requires some surgery to replace a few parts before getting upgraded.",
            problem:        6,
            price:          35,
            eCurrent:       2,
            temp:           99.8,
            brokenCables:   10,
            burntCables:    0,
            overheating:    false,
            sparks:         0,
            dust:           40,
            special() {
                // NepTec (Perk) from surgery_check.js

                // More dust
                dust += 7 * Math.pow(0.5, NepTec);
            }
        },

        );
        setCaseLevel(2);

    case 1:
        CASES.push(
        {
            name:           'Mechaflu',
            description:    "A mysterious condition where robots heat up as if they have a human fever.",
            problem:        0,
            price:          10,
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
            description:    "A condition where the core doesn't work properly. Symptoms include blacking out, confusion, sudden death, etc..",
            problem:        4,
            price:          20,
            eCurrent:       1,
            temp:           99.8,
            brokenCables:   0,
            burntCables:    0,
            overheating:    true,
            sparks:         0,
            dust:           0,
            special() {
                // Core will suddenly die (1/50 chance)
                if (rng(1, 50) == 1)
                {
                    eCurrent = 4;
                }

                // Suddenly have overheating (1/10 chance)
                if (rng(1, 10) == 1)
                {
                    overheating = true;
                }
            }
        },

        {
            name:           'Inner Explosion',
            description:    "A condition where the core explodes due to some problems. The core can explode at random times and destroy the insides of a robot.",
            problem:        6,
            price:          50,
            eCurrent:       2,
            temp:           110,
            brokenCables:   3,
            burntCables:    7,
            overheating:    true,
            sparks:         2,
            dust:           25,
            special() {
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
            name:           'Major Injuries',
            description:    "Many broken parts, usual battle robot have this condition. Sparks may appear due to an internal injury.",
            problem:        3,
            price:          20,
            eCurrent:       1,
            temp:           99.8,
            brokenCables:   6,
            burntCables:    2,
            overheating:    false,
            sparks:         1,
            dust:           35,
            special() {
                // 1/5 chance to get more sparks
                if (rng(1, 5) == 1)
                {
                    sparks++;
                }
            }
        },

        {
            name:           'High Fall Damage',
            description:    "The robot fell from a 20-storey building.",
            problem:        6,
            price:          25,
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
            description:    "hand brokey",
            problem:        2,
            price:          15,
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
            description:    "leg brokey",
            problem:        4,
            price:          20,
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
            description:    "robot dumb",
            problem:        6,
            price:          30,
            eCurrent:       1,
            temp:           99.8,
            brokenCables:   4,
            burntCables:    2,
            overheating:    false,
            sparks:         0,
            dust:           0
        },

        {
            name:           'File Corruption',
            description:    "The robot doesn't respond properly due to a corruption or change in the files in the robot's computer system.",
            problem:        1,
            price:          10,
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
            description:    "After manufacturing, the robot broke down due a missing internal part.",
            problem:        3,
            price:          15,
            eCurrent:       1,
            temp:           99.8,
            brokenCables:   4,
            burntCables:    0,
            overheating:    false,
            sparks:         1,
            dust:           0
        },

        {
            name:           'Misplaced Limbs',
            description:    "Error on manufacturing, now the robot is stupid",
            problem:        3,
            price:          20,
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
            description:    "A condition where the core abnormally heats up to dangerous levels.",
            problem:        4,
            price:          40,
            eCurrent:       2,
            temp:           105,
            brokenCables:   0,
            burntCables:    5,
            overheating:    true,
            sparks:         1,
            dust:           0,
            special() {
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
            description:    "There are rats living inside and breaking parts of the robot.",
            problem:        5,
            price:          40,
            eCurrent:       0,
            temp:           99.8,
            brokenCables:   10,
            burntCables:    3,
            overheating:    false,
            sparks:         1,
            dust:           25,
            special() {
                // 10% chance rats break more cables
                if (rng(1, 10) == 1)
                {
                    brokenCables++;
                }
            }
        },

        {
            name:           'Drenched in Water',
            description:    "This non-waterproof robot fell into a river and fried most of its electronics.",
            problem:        10,
            price:          40,
            eCurrent:       2,
            temp:           99.8,
            brokenCables:   0,
            burntCables:    0,
            overheating:    false,
            sparks:         3,
            dust:           50
        },

        {
            name:           'Brain Lag',
            description:    "A condition where robots have issues processing information. They can be slow to respond at times, sometimes they don't respond at all and forget the situation. Their system crashes sometimes and fall asleep.",
            problem:        6,
            price:          0,
            eCurrent:       1,
            temp:           99.8,
            brokenCables:   0,
            burntCables:    0,
            overheating:    false,
            sparks:         0,
            dust:           0,
            special() {
                // While active, 10% chance to fall asleep (deactivate) for 10 turns
                if (sleepTime < 0 && rng(1, 10) == 1)
                {
                    sleepTime = 10;
                }
            }
        }

        );
        setCaseLevel(1);
}

// Sets level x for each case without a level
function setCaseLevel(x)
{
    for (const item of CASES)
    {
        if (!item.level) {
            item.level = x;
        }
    }
}