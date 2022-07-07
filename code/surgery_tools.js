// Surgery tools

// Each tool needs 'name' (string) and 'use()'
// use() must always execute turnUpdate()
const TOOLS = [
    // Fix vision
    {
        name: 'Sponge',
        use() {
            // Kill bacteria up to 25
            bacteria -= 50;
            if (bacteria < 25) { bacteria = 25; }
            return turnUpdate("Mopped up the operation site.");
        }
    },

    // Fix broken cables
    {
        name: 'Soldering Iron',
        use() {
            if (casings <= 0)
            {
                return turnUpdate("You need to remove a casing first.");
            }

            if (brokenCables <= 0)
            {
                return turnUpdate("There are no broken cables to solder.");
            }

            // There are broken cables
            brokenCables--;
            return turnUpdate("Soldered the broken wire.");
        }
    },

    // Clean site
    {
        name: 'Antiseptic',
        use() {
            bacteria -= 10;
            return turnUpdate("Disinfected the operation site.");
        }
    },

    // Help temperature
    {
        name: 'Coolant',
        use() {
            temp -= 5;
            // Doesn't do anything when already GOOD_TEMP
            if (temp < GOOD_TEMP)
            {
                temp = GOOD_TEMP;
            }
        
            // 1/3 chance to kill fever 
            if (rng(0, 2) == 0)
            {
                fever = false;
            }
            return turnUpdate("Gave the robot a bit of coolant through its mouth.");
        }
    },

    // Put patient to sleep
    {
        name: 'Disable',
        use() {
            sleepTime = 26;
            return turnUpdate("Disabled the robot temporarily.");
        }
    },

    // Unscrew a casing
    {
        name: 'Unscrew',
        use() {
            // Can't stab awake person
            if (state == 0)
            {
                return turnUpdate("The robot is still active.");
            }

            // stabby stabby
            casings++;

            // 5% chance to give bleeding
            if (rng(1, 20) == 1)
            {
                bleeding++;
            }

            return turnUpdate("Unscrewed a casing.");
        }
    },

    // Undo unscrew
    {
        name: 'Rescrew',
        use() {
            // Nothing to fix
            if (casings <= 0)
            {
                return turnUpdate("There are no missing casings.");
            }

            // Fix casings and bleeding if there is any 
            bleeding--;
            casings--;
            return turnUpdate("Rescrewed a casing.");
        }
    },

    // Fix shattered bones
    {
        name: 'Pins',
        use() {
            if (shatteredBones <= 0)
            {
                return turnUpdate("There are no shattered bones to pin together.");
            }

            if (casings <= 0)
            {
                return turnUpdate("You need to make an incision first.");
            }

            shatteredBones--;
            brokenCables++;
            return turnUpdate("Pinned a shattered bone together.");
        }
    },
    
    // Fix bleeding without reducing casings
    {
        name: 'Clamps',
        use() {
            if (casings <= 0)
            {
                return turnUpdate("There are no casings yet.");
            }

            if (bleeding <= 0)
            {
                return turnUpdate("There is no bleeding to fix.");
            }
            
            bleeding--;
            return turnUpdate("Clamped up some blood vessels.");
        }
    },

    // Fix electrical current
    {
        name: 'Generator',
        use() {
            if (eCurrent > 0) 
            {
                eCurrent--;
            }
            return turnUpdate("Reenergized the robot with energy from the generator.");
        }
    },
    
    // Get patient's case
    {
        name: 'Scanner',
        use() {
            if (caseName == '?') 
            {
                caseName = CASE.name;
                return turnUpdate(`This robot has a case of ${caseName}.`);
            }
            return turnUpdate("You don't need to scan the robot again.");
        }
    },

    // Fix stopped heart
    {
        name: 'Defibrillator',
        use() {
            if (!heart) 
            {
                eCurrent = 1;
                heart = true;
                return turnUpdate("You shocked the patient back to life!");
            }
            return turnUpdate("The patient's heart is still beating.");
        }
    },

    // Fix "problem"
    {
        name: 'Repair',
        use() {
            if (caseName == '?')
            {
                return turnUpdate("You haven't scanned the robot yet.");
            }

            if (problem == 0) 
            {
                return turnUpdate("There is nothing to repair.");
            } 
            
            if (casings >= problem)
            {
                problem = 0;
                return turnUpdate("Fixed the problem with magic!");
            }
        
            return turnUpdate("You need to get to the problem first.");
        }
    }
];
