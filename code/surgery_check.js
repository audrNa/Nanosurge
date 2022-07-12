// check() stuff
const GOOD_TEMP = 99.8;

// Check if job is done or keep going and make things harder
// Returns an array of a number and a string
function check() 
{
    // Lose conditions

    if (temp > 120)
    {
        return [2, "The robot exploded from overheating!"];
    }

    if (eCurrent >= 5)
    {
        return [2, "You killed the robot's core!"];
    }


    if (!core && resuscitationTime <= 0)
    {
        return [2, "You failed to resuscitate the robot's core in time!"];
    }

    if (sleepTime > 40)
    {
        return [2, "You permanently disabled the robot!"];
    }


    // Win

    if (problem <= 0 && !overheating && casings <= 0 && 
        brokenCables <= 0 && burntCables <= 0 && core && sparks <= 0
        && eCurrent <= 1) 
    {
        
        return [1, "You've successfully fixed the robot!"];
    }


    // Stat Changes
    tempChange();
    statusCheck();
    spark();
    heartbeat();
    dustSpread();

    // Keep going
    return [0, ""];
}


// Temperature changes
function tempChange()
{
    if (overheating)
    {
        // Increase temperature
        temp += 3 + rng(0, 10) / 10;
        extraMessage.add(["The robot's temperature is rising.", 'warning']);
    }
    else if (temp != GOOD_TEMP)
    {
        // Get it closer to GOOD_TEMP
        temp += (GOOD_TEMP - temp) / 2
    }
}

// Stuff related to state / status
function statusCheck()
{
    // Make time "go" so that the patient will wake up soon
    if (sleepTime > -1)
    {
        sleepTime--;
    }

    // Determine state of person
    if (sleepTime <= 0)
    {
        // Awake
        state = 0;
    }
    else if (sleepTime <= 3)
    {
        // Coming to
        state = 1;
    }
    else
    {
        // zzz
        state = 2;
    }
}

// Blood loss
const sparksTexts = [
    ["The robot's current is slowly leaking out.", 'normal'],
    ["The robot's current is leaking out.", 'warning'],
    ["The robot's current is leaking out fast!", 'bad']
];
function spark()
{
    // If patient wake up while casings then pain then patient panik then bleed
    if (casings > 0 && state == 0)
    {
        if (sleepTime == 0)
        {
            extraMessage.add(["The robot screams and flails!", 'bad']);
        }

        sparks += 0.5 + casings * 0.5;
    }

    // Min 0 & Max 3
    if (sparks < 0) { sparks = 0; }
    if (sparks > 3) { sparks = 3; }

    // "Leak current"
    if (eCurrent < 4 && sparks > 0 && rng(1, 6 / sparks) == 1)
    {
        eCurrent++;
    }

    // Extra Message
    if (sparks > 0)
    {
        extraMessage.add(sparksTexts[Math.floor(sparks) - 1]);
    }
}

// Heart
function heartbeat()
{
    // No more electric current
    if (core && eCurrent >= 4)
    {
        core = false;
        resuscitationTime = 3;
    }

    // Pass time until patient dies if heart dead
    if (!core)
    {
        resuscitationTime--;
    }
}

// dust logic
function dustSpread()
{
    // Minimum 0
    if (dust < 0) { dust = 0; }

    // + dust every turn
    dust += 1 * (1 + casings * 0.5) * (1 + site * 0.5) * (1 + sparks * 0.5);

    // dust make operation site dirty
    vision = true;
    if (dust <= 25)
    {
        site = 0;
    }
    else if (dust <= 50)
    {
        // it's still fine
        site = 1;
    }
    else if (dust <= 75)
    {
        // oh no
        site = 2;
        extraMessage.add(["It's getting harder to see what you're doing.", 'warning']);
    }
    else
    {
        // oh fuck
        vision = false;
        extraMessage.add(["You can't see what you're doing!", 'bad']);
    }

    // Chance to give overheating if dusty
    if (site != 0 && rng(1, 20 / site) == 1)
    {
        overheating = true;
    }
}
