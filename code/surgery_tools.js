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
            vision = true;
            return turnUpdate("Mopped up the operation site.");
        }
    },

    // Fix broken bones
    {
        name: 'Splint',
        use() {
            if (brokenBones > 0)
            {
                brokenBones--;
                return turnUpdate("Splinted a broken bone.");
            }
            return turnUpdate("There are no broken bones to splint.");
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
        name: 'Antibiotics',
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
            return turnUpdate("Gave the patient antibotics.");
        }
    },

    // Put patient to sleep
    {
        name: 'Anesthetic',
        use() {
            sleepTime = 25;
            return turnUpdate("The patient is sleeping now.");
        }
    },

    // Make incision
    {
        name: 'Scalpel',
        use() {
            // Can't stab awake person
            if (state == 0)
            {
                return turnUpdate("The patient is still awake.");
            }

            // stabby stabby
            incisions++;

            // 5% chance to give bleeding
            if (rng(1, 20) == 1)
            {
                bleeding++;
            }

            return turnUpdate("Made a neat incision.");
        }
    },

    // Stitch up incision and fix bleeding
    {
        name: 'Stitches',
        use() {
            // Nothing to fix
            if (incisions <= 0 && bleeding <= 0)
            {
                return turnUpdate("There are no incisions to stich up.");
            }

            // No incisions but there is bleeding
            if (incisions <= 0 && bleeding > 0)
            {
                bleeding--;
                return turnUpdate("Badged up some wounds.");
            }

            // Fix incisions and bleeding if there is any 
            bleeding--;
            incisions--;
            return turnUpdate("Stitched up some incisions.");
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

            if (incisions <= 0)
            {
                return turnUpdate("You need to make an incision first.");
            }

            shatteredBones--;
            brokenBones++;
            return turnUpdate("Pinned a shattered bone together.");
        }
    },
    
    // Fix bleeding without reducing incisions
    {
        name: 'Clamps',
        use() {
            if (incisions <= 0)
            {
                return turnUpdate("There are no incisions yet.");
            }

            if (bleeding <= 0)
            {
                return turnUpdate("There is no bleeding to fix.");
            }
            
            bleeding--;
            return turnUpdate("Clamped up some blood vessels.");
        }
    },

    // Fix pulse
    {
        name: 'Transfusion',
        use() {
            if (pulse > 0) 
            {
                pulse--;
            }
            return turnUpdate("Transfused several pints of bloods into your patient.");
        }
    },
    
    // Get patient's case
    {
        name: 'Ultrasound',
        use() {
            if (caseName == '?') 
            {
                caseName = CASE.name;
                return turnUpdate(`The patient has a case of ${caseName}.`);
            }
            return turnUpdate("You don't need to scan the patient again.");
        }
    },

    // Fix stopped heart
    {
        name: 'Defibrillator',
        use() {
            if (!heart) 
            {
                pulse = 1;
                heart = true;
                return turnUpdate("You shocked the patient back to life!");
            }
            return turnUpdate("The patient's heart is still beating.");
        }
    },

    // Fix "problem"
    {
        name: 'Fix It',
        use() {
            if (caseName == '?')
            {
                return turnUpdate("You haven't scanned the patient yet.");
            }

            if (problem == 0) 
            {
                return turnUpdate("There is no problem.");
            } 
            
            if (incisions >= problem)
            {
                problem = 0;
                return turnUpdate("Fixed the problem.");
            }
        
            return turnUpdate("You need to get to the problem first.");
        }
    }
];
