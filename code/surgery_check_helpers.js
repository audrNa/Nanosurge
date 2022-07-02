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

// Heart
function heartbeat()
{
    // Pulse gets weaker while asleep
    if (state != 0 && heart && rng(0, 10) == 0)
    {
        pulse++;
    }

    // No more pulse
    if (heart && pulse == 4)
    {
        heart = false;
        heartDeadTime = 4;
    }

    // Pass time until patient dies if heart dead
    if (!heart)
    {
        heartDeadTime--;
    }
}

// Bacteria logic
function bacteriaSpread()
{
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
        extraMessage += "It's getting harder to see.\n";
    }
    else
    {
        // oh fuck
        vision = false;
        extraMessage += "You can't see what you're doing!\n";
    }
}
