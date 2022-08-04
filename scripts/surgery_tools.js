// Surgery tools

// Perk levels
const SolCer = fetchPerkPr(0);
const MagPlr = fetchPerkPr(1);
const NanDlr = fetchPerkPr(2);
const ResAdh = fetchPerkPr(3);
const ExtFue = fetchPerkPr(4);

/* Required Keys */
// name
// keybind
// sprite   always in static/
// use()

// use() must always execute turnUpdate()
const TOOLS = [
    // Fix vision
    {
        name: 'Blower',
        keybind: 'q',
        sprite: 'blower.png',
        use() {
            const LIMIT = 25;
            // Can't kill dust near LIMIT
            if (dust < LIMIT * 1.2)
            {
                return turnUpdate("Your blower is too powerful to clear smaller pieces of dust.");
            }

            // Kill dust up to LIMIT
            dust -= 50;
            if (dust < LIMIT) { dust = LIMIT; }
            return turnUpdate("Blew most of the dust away.");
        }
    },

    // Fix broken cables
    {
        name: 'Soldering Iron',
        keybind: 'w',
        sprite: 'soldering_iron.png',
        use() {
            if (brokenCables <= 0)
            {
                return turnUpdate("There are no broken cables to solder.");
            }

            if (casings <= 0)
            {
                return turnUpdate("You need to remove a casing first.");
            }

            // Soldering Certificate guaranteed and random bonus
            const C = 2;
            const gB = Math.floor(SolCer / C);
            const rngB = chance(SolCer % C / C);
            let bonus = gB + rngB;

            // Try to fix broken cables
            const past = brokenCables;
            brokenCables -= 1 + bonus;

            // Fix negative values
            if (brokenCables < 0) { brokenCables = 0; }
            bonus = past - brokenCables - 1;

            // Update turn
            let message = "Soldered <code>1</code> broken wire.";
            if (bonus) {
                message += `\n[SC]: You accidentally soldered an extra <code>${bonus}</code> broken cables!`;
            }
            return turnUpdate(message);
        }
    },

    // Clean site
    {
        name: 'Brush',
        keybind: 'e',
        sprite: 'brush.png',
        use() {
            dust -= 15;

            // Tell user if they should use a different tool now
            if (dust <= 1)
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
        keybind: 'i',
        sprite: 'coolant.png',
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
        keybind: 'o',
        sprite: 'disable.png',
        use() {
            sleepTime += 26;
            return turnUpdate("Disabled the robot temporarily.");
        }
    },

    // Unscrew a casing
    {
        name: 'Screwdriver: Unscrew',
        keybind: 'p',
        sprite: 'unscrew.png',
        use() {
            // doing something like this to someone is kinda weird
            if (state == 0)
            {
                return turnUpdate("The robot is still active.");
            }

            // 5% chance to give sparks
            sparks += chance(0.05);

            // Nanodrillers guaranteed and random bonus
            const C = 4;
            const gB = Math.floor(NanDlr / C);
            const rngB = chance(NanDlr % C / C);
            const bonus = gB + rngB;

            // Remove casings
            casings += 1 + bonus;

            // Update turn
            let message = "Unscrewed <code>1</code> casing.";
            if (bonus) {
                message += `\n[Nanodrillers]: Unscrewed <code>${bonus}</code> casings!`;
            }
            return turnUpdate(message);
        }
    },

    // Undo unscrew
    {
        name: 'Screwdriver: Rescrew',
        keybind: 'a',
        sprite: 'rescrew.png',
        use() {
            if (casings <= 0)
            {
                return turnUpdate("There are no missing casings.");
            }

            // Nanodrillers guaranteed and random bonus
            const C = 4;
            const gB = Math.floor(NanDlr / C);
            const rngB = chance(NanDlr % C / C);
            let bonus = gB + rngB;

            // Try to rescrew casings
            const past = casings;
            casings -= 1 + bonus;

            // Fix negative values
            if (casings < 0) { casings = 0; }
            bonus = past - casings - 1;

            // Update turn
            let message = "Rescrewed <code>1</code> casing.";
            if (bonus) {
                message += `\n[Nanodrillers]: Rescrewed <code>${bonus}</code> casings!`;
            }
            return turnUpdate(message);
        }
    },

    // Fix burnt cables
    {
        name: 'Electrical Tape',
        keybind: 's',
        sprite: 'electrical_tape.png',
        use() {
            // Nothing to fix
            if (burntCables <= 0 && sparks <= 0)
            {
                return turnUpdate("There are no burnt cables to retape.");
            }

            // Fix sparks first
            if (sparks > 0)
            {
                // Resistant Adhesive bonus
                let bonus = ResAdh;

                // Try to fix sparks
                const past = sparks;
                sparks -= 1 + bonus;

                // Fix negative values
                if (sparks < 0) { sparks = 0; }
                bonus = past - sparks - 1;

                // Update turn
                let message = "Taped a sparking wire.";
                if (bonus >= 1.0) {
                    message += `\n[Res. Adhesive] The tape resisted <code>${Math.ceil(bonus)}</code> other sparks!`;
                }
                return turnUpdate(message);
            }

            if (casings <= 0)
            {
                return turnUpdate("You need to remove a casing first.");
            }

            // Magic Plier guaranteed and random bonus
            const C = 2;
            const gB = Math.floor(MagPlr / C);
            const rngB = chance(MagPlr % C / C);
            let bonus = gB + rngB;

            // Try to fix burnt cables
            const past = burntCables;
            burntCables -= 1 + bonus;

            // Fix negative values
            if (burntCables < 0) { burntCables = 0; }
            bonus = past - burntCables - 1;

            // Convert to broken cables
            brokenCables += 1 + bonus;

            // Update turn
            let message = "Retaped <code>1</code> burnt cable.";
            if (bonus) {
                message += `\n[Magic Plier]: You retaped <code>${bonus}</code> other cables with a cut of same tape!`;
            }
            return turnUpdate(message);
        }
    },

    // Fix electrical current
    {
        name: 'Generator',
        keybind: 'd',
        sprite: 'generator.png',
        use() {
            // Extra Fuel bonus
            let bonus = ExtFue;

            // Try to subtract
            const past = eCurrent;
            eCurrent -= 1 + bonus;

            // Fix negative values
            if (eCurrent < 0) { eCurrent = 0; }
            bonus = past - eCurrent - 1;
            if (bonus < 0) { bonus = 0; }

            // Update turn
            let message = "Reenergized the robot with energy from the generator.";
            if (bonus >= 1.0) {
                message += `\n[Extra Fuel]: Bonus <code>+${Math.floor(bonus)}</code> levels of energy!`;
            }
            return turnUpdate(message);
        }
    },

    // Get patient's case
    {
        name: 'Scanner',
        keybind: 'k',
        sprite: 'scanner.png',
        use() {
            // Check if already scanned
            if (caseName != '?')
            {
                return turnUpdate("You don't need to scan the robot again.");
            }

            // Give case name, level, description, and required removed casings
            caseName = CASE.name;
            caseLevel = CASE.level;
            description = CASE.description;
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
        keybind: 'l',
        sprite: 'taser.png',
        use() {
            // Fix core if dead
            if (!core)
            {
                if (eCurrent > 2) {eCurrent = 2; }
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
        keybind: ';',
        sprite: 'repair.png',
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
