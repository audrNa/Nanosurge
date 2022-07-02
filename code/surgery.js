// + surgery_cases.js, surgery_tools.js

// Definitions
const STATES = ['AWAKE', 'COMING TO', 'UNCONSCIOUS'];
const SITE_CONDITIONS = ['Clean', 'Unsanitized', 'Unsanitary'];
const PULSES = ['Strong', 'Steady', 'Weak', 'Extremely Weak'];
const GOOD_TEMP = 99.8;

// Status
const CASE = CASES[rng(0, CASES.length - 1)];   // Get random case

let caseName = '?';
let problem = CASE.incisions;

// Status variables 1
let pulse = CASE.pulse;
let state = 0;
let temp = CASE.temp;
let site = 0;

// Status variables 2
let incisions = 0;
let brokenBones = CASE.brokenBones;
let shatteredBones = CASE.shatteredBones;

// Status variables 3
let heart = true;
let vision = true;

// Changes over turns
let fever = CASE.fever;
let sleepTime = 0;
let heartDeadTime = 4;

// Update status
function turnUpdate(message) 
{
    // End surgery and show modal if surgery is complete 
    const checkResult = check();
    if (checkResult[0]) 
    {
        document.getElementById('modal-message').innerHTML = checkResult[1];
        document.getElementById('modal-trigger').click();
        return 0;
    }

    // Status
    document.getElementById('case').innerHTML = caseName; 
    document.getElementById('pulse').innerHTML = PULSES[pulse];
    document.getElementById('status').innerHTML = (!heart) ? 'HEART STOPPED' : STATES[state];
    document.getElementById('temp').innerHTML = (temp).toFixed(1);
    document.getElementById('site').innerHTML = SITE_CONDITIONS[site];

    // Status 2
    const exm_items = [
        ['incisions', incisions],
        ['broken-bones', brokenBones],
        ['shattered-bones', shatteredBones]
    ];
    for (const item of exm_items)
    {
        if (item[1] > 0)
        {
            let row = document.getElementById(item[0]);
            row.childNodes[3].innerHTML = `<code>${item[1]}</code>`;
            row.removeAttribute('hidden');
        }
        else
        {
            document.getElementById(item[0]).setAttribute('hidden', '');
        }
    }


    // Check if "problem is visible"
    if (CASE.incisions != 0 && incisions >= problem) 
    {
        document.getElementById('fix-it').removeAttribute('disabled');
    } 
    else 
    {
        document.getElementById('fix-it').setAttribute('disabled', '');
    }
    
    // Message
    if (message != undefined) { document.getElementById('message').innerHTML = message; }
    return 0;
}

// Some logic, check for death scenarios, change up stats, check if surgery complete
// Returns an array of a boolean and a string
function check() 
{
    // Lose conditions

    if (incisions > 0 && state == 0) 
    {
        return [true, "You stabbed the awake patient!"];
    }

    if (temp > 120)
    {
        return [true, "The patient died of a fever."];
    }

    if (!heart && heartDeadTime < 0)
    {
        return [true, "You failed to restart the patient's heart in time!"];
    }


    // Win

    if (problem <= 0 && !fever && temp <= 103 && incisions <= 0 && 
        brokenBones <= 0 && shatteredBones <= 0 && heart && pulse <= 1) 
    {
        
        return [true, "You've cured your patient!"];
    }


    // Stat Changes

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

    // Pulse gets weaker while asleep
    if (state != 0 && heart && rng(0, 10) == 0)
    {
        pulse++;
    }

    // No more pulse
    if (pulse > 3)
    {
        pulse = 3;
        heart = false;
        heartDeadTime = 4;
    }

    // Pass time until heart dies
    if (!heart)
    {
        heartDeadTime--;
    }

    // Keep going
    return [false, ""];
}


// Load surgery
document.addEventListener('DOMContentLoaded', function() {
    turnUpdate();
});


// Random Number Generator between min and max
function rng(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}  
