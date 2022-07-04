// check() stuff

// Temperature changes
function tempChange()
{
    if (fever)
    {
        // Increase temperature
        temp += 3 + rng(0, 10) / 10;
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
    if (sleepTime > 0)
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
const bleedingTexts = [
    "The patient is slowly losing blood.",
    "The patient is losing blood.",
    "The patient is losing blood fast!"
];
function bleed()
{
    // If patient wake up while incisions then pain then patient panik then bleed
    if (incisions > 0 && state == 0)
    {
        bleeding += 0.5 + incisions * 0.5;
    }

    // Min 0 | Max 3
    if (bleeding < 0) { bleeding = 0; }
    if (bleeding > 3) { bleeding = 3; }

    // Damage heart
    if (bleeding > 0 && rng(1, 10 / bleeding) == 1)
    {
        pulse++;
    }

    // Extra Message
    if (bleeding > 0)
    {
        extraMessage += bleedingTexts[Math.floor(bleeding) - 1] + '\n';
    }
}

// Heart
function heartbeat()
{
    // Pulse gets weaker while asleep
    if (state != 0 && heart && rng(0, 10) == 0)
    {
        pulse++;
    }

    // No more pulse
    if (heart && pulse >= 4)
    {
        heart = false;
        resuscitationTime = 4;
    }

    // Pass time until patient dies if heart dead
    if (!heart)
    {
        resuscitationTime--;
    }
}

// Bacteria logic
function bacteriaSpread()
{
    // Minimum 0
    if (bacteria < 0) { bacteria = 0; }

    // + Bacteria for tool used
    bacteria += 1 * (1 + incisions * 0.5) * (1 + site * 0.5);

    // Bacteria make operation site dirty
    if (bacteria <= 25)
    {
        site = 0;
    }
    else if (bacteria <= 50)
    {
        // it's still fine
        site = 1;
    }
    else if (bacteria <= 75)
    {
        // oh no
        site = 2;
        extraMessage += "It's getting harder to see what you're doing.\n";
    }
    else
    {
        // oh fuck
        vision = false;
        extraMessage += "You can't see what you're doing!\n";
    }
}
