// Surgery tools

// Classn't for tools
const tool = {
    name: 'Unnamed',
    use() 
    {
        return turnUpdate("You tried to use air.");
    }
}

// Fix vision
const sponge = Object.create(tool);
sponge.name = 'Sponge';
sponge.use = () => {
    vision = true;
    return turnUpdate("Mopped up the operation site.");
}

// Fix broken bones
const splint = Object.create(tool);
splint.name = 'Splint';
splint.use = () => {
    if (brokenBones > 0)
    {
        brokenBones--;
        return turnUpdate("Splinted a broken bone.");
    }
    return turnUpdate("There are no broken bones to splint.");
}

// Clean site
const antiseptic = Object.create(tool);
antiseptic.name = 'Antiseptic';
antiseptic.use = () => {
    site = 0;
    return turnUpdate("Disinfected the operation site.");
}

// Help temperature
const antibiotics = Object.create(tool);
antibiotics.name = 'Antibiotics';
antibiotics.use = () => {
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

// Put patient to sleep
const anesthetic = Object.create(tool);
anesthetic.name = 'Anesthetic';
anesthetic.use = () => {
    sleepTime = 15;
    return turnUpdate("The patient is sleeping now.");
}

// Cut patient
const scalpel = Object.create(tool);
scalpel.name = 'Scalpel';
scalpel.use = () => {
        incisions++;
    return turnUpdate("Made a neat incision.");
}

// Fix cuts
const stitches = Object.create(tool);
stitches.name = 'Stitches';
stitches.use = () => {
    if (incisions > 0)
    {
        incisions--;
        return turnUpdate("Stitched up an incision.");
    }

    return turnUpdate("There are no incisions to stich up.");
}

// Fix shattered bones
const pins = Object.create(tool);
pins.name = 'Pins';
pins.use = () => {
    if (shatteredBones > 0) 
    {
        shatteredBones--;
        brokenBones++;
        return turnUpdate("Pinned a shattered bone together.");
    }
    return turnUpdate("There are no shattered bones to pin together.");
}

// Fix blood pulse
const transfusion = Object.create(tool);
transfusion.name = 'Transfusion';
transfusion.use = () => {
    if (pulse > 0) 
    {
        pulse--;
    }
    return turnUpdate("Transfused several pints of bloods into your patient.");
}

// Get condition of patient
const ultrasound = Object.create(tool);
ultrasound.name = 'Ultrasound';
ultrasound.use = () => {
    if (caseName == '?') 
    {
        caseName = CASE.name;
        return turnUpdate(`The patient has a case of ${caseName}.`);
    }
    return turnUpdate("You don't need to scan the patient again.");
}

// Fix stopped heart
const defibrillator = Object.create(tool);
defibrillator.name = 'Defibrillator';
defibrillator.use = () => {
    if (!heart) 
    {
        heart = true;
        return turnUpdate("You shocked the patient back to life!");
    }
    return turnUpdate("The patient's heart is still beating.");
}

// Fix problem
const fixit = Object.create(tool);
fixit.name = 'Fix It';
fixit.use = () => {
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

// List of the tools
const TOOLS = [sponge, splint, antiseptic, antibiotics, anesthetic, scalpel, stitches, pins, transfusion, ultrasound, defibrillator, fixit];
