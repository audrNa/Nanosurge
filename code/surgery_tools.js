// Surgery tools

// Each tool needs 'name' (string) and 'use()'
// use() must always execute turnUpdate()
const TOOLS = [
    // Fix vision
    {
        name: 'Blower',
        use() {
            // Can't kill dust below 30
            if (dust < 30)
            {
                return turnUpdate("Your blower is too powerful to clear smaller pieces of dust.")
            }

            // Kill dust up to 25
            dust -= 50;
            if (dust < 25) { dust = 25; }
            return turnUpdate("Blew most of the dust away.");
        }
    },

    // Fix broken cables
    {
        name: 'Soldering Iron',
        use() {
            if (brokenCables <= 0)
            {
                return turnUpdate("There are no broken cables to solder.");
            }
            
            if (casings <= 0)
            {
                return turnUpdate("You need to remove a casing first.");
            }

            // There are broken cables
            brokenCables--;
            return turnUpdate("Soldered the broken wire.");
        }
    },

    // Clean site
    {
        name: 'Brush',
        use() {
            dust -= 15;

            // Tell user if they should use a different tool now
            if (dust <= 0)
            {
                return turnUpdate("The operation site is clean enough.");
            }
            // Otherwise they can keep using Brush
            return turnUpdate("Brushed off small pieces of dusts.");
        }
    },

    // Help temperature
    {
        name: 'Coolant',
        use() {
            temp -= 6;
            
            // 50% chance to kill overheating 
            if (rng(0, 1) == 0)
            {
                overheating = false;
            }

            return turnUpdate("Gave the robot a bit of coolant through its mouth.");
        }
    },

    // Put patient to sleep
    {
        name: 'Disable',
        use() {
            sleepTime += 26;
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

            // 5% chance to give sparks
            if (rng(1, 20) == 1)
            {
                sparks++;
            }

            return turnUpdate("Unscrewed a casing.");
        }
    },

    // Undo unscrew
    {
        name: 'Rescrew',
        use() {
            if (casings <= 0)
            {
                return turnUpdate("There are no missing casings.");
            }

            casings--;
            return turnUpdate("Rescrewed a casing.");
        }
    },

    // Fix burnt cables
    {
        name: 'Electrical Tape',
        use() {
            // Nothing to fix
            if (burntCables <= 0 && sparks <= 0)
            {
                return turnUpdate("There are no burnt cables to retape.");
            }

            // Fix sparks first
            if (sparks > 0)
            {
                sparks--;
                return turnUpdate("Taped a sparking wire.");
            }

            if (casings <= 0)
            {
                return turnUpdate("You need to remove a casing first.");
            }

            // Fix burnt cables
            burntCables--;
            brokenCables++;
            return turnUpdate("Retaped a burnt wire.");
        }
    },

    // Fix electrical current
    {
        name: 'Generator',
        use() {
            eCurrent--;
            if (eCurrent < 0) 
            {
                eCurrent = 0;
            }
            return turnUpdate("Reenergized the robot with energy from the generator.");
        }
    },
    
    // Get patient's case
    {
        name: 'Scanner',
        use() {
            // Check if already scanned
            if (caseName != '?') 
            {
                return turnUpdate("You don't need to scan the robot again.");
            }

            // Give case name and required removed casings
            caseName = CASE.name;
            let message = `This robot has a case of <code>${caseName}</code>.\n`;
            if (problem > 0)
            {
                message += `You will need to remove <code>${problem}</code> casings to solve all problem(s).`;
            }
            else
            {
                message += `You don't need to remove any casings.`;
            }
            return turnUpdate(message);
        }
    },

    // Fix stopped heart
    {
        name: 'Taser',
        use() {
            // Fix core if dead
            if (!core) 
            {
                eCurrent = 2;
                core = true;
                return turnUpdate("You shocked the robot's core back to life!");
            }

            // Kill core if patient is awake
            if (state == 0)
            {
                eCurrent = 5;
                core = false;
                return turnUpdate("You shocked the robot's core.");
            }

            return turnUpdate("The robot's core is still alive.");
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
                return turnUpdate("Magically fixed all problem(s)!");
            }
        
            return turnUpdate("You need to get to the problem first.");
        }
    }
];
