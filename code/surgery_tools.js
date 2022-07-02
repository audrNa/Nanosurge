// Surgery tools

// Fix vision
function sponge() 
{
    vision = true;
    return turnUpdate("Mopped up the operation site.");
}

// Fix broken bones
function splint() 
{
    if (brokenBones > 0)
    {
        brokenBones--;
        return turnUpdate("Splinted a broken bone.");
    }
    return turnUpdate("There are no broken bones to splint.");
}

// Clean site
function antiseptic() 
{
    site = 0;
    return turnUpdate("Disinfected the operation site.");
}

// Help temperature
// TODO
function antibiotics() 
{
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
function anesthetic() 
{
    sleepTime = 15;
    return turnUpdate("The patient is sleeping now.");
}

// Cut patient
function scalpel() 
{
    incisions++;
    return turnUpdate("Made a neat incision.");
}

// Fix cuts
function stitches() 
{
    if (incisions > 0)
    {
        incisions--;
        return turnUpdate("Stitched up an incision.");
    }

    return turnUpdate("There are no incisions to stich up.");
}

// Fix shattered bones
function pins() 
{
    if (shatteredBones > 0) {
        shatteredBones--;
        brokenBones++;
        return turnUpdate("Pinned a shattered bone together.");
    }
    return turnUpdate("There are no shattered bones to pin together.");
}

// Fix blood pulse
function transfusion() 
{
    if (pulse > 0) {
        pulse--;
    }
    return turnUpdate("Transfused several pints of bloods into your patient.");
}

// Get condition of patient
function ultrasound() {

    if (caseName == '?') {
        caseName = CASE.name;
        return turnUpdate(`The patient has a case of ${caseName}.`);
    }
    return turnUpdate("You don't need to scan the patient again.");
}

// Fix stopped heart
function defibrillator() 
{
    if (!heart) {
        heart = true;
        return turnUpdate("You shocked the patient back to life!");
    }
    return turnUpdate("The patient's heart is still beating.");
}

// Fix problem
// TODO
function fixit() 
{
    if (problem == 0) {
        return turnUpdate("There is no problem.");
    } 
    
    if (incisions >= problem) {
        problem = 0;
        return turnUpdate("Fixed the problem.");
    }
    return turnUpdate("You need to get to the problem first.");
}
