// + surgery_cases.js, surgery_tools.js

// Definitions
const STATES = ['AWAKE', 'UNCONSCIOUS', 'COMING TO'];
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

    // Normal status
    document.getElementById('case').innerHTML = caseName; 
    document.getElementById('pulse').innerHTML = PULSES[pulse];
    document.getElementById('status').innerHTML = (!heart) ? 'HEART STOPPED' : STATES[state];
    document.getElementById('temp').innerHTML = (temp).toFixed(2);
    document.getElementById('site').innerHTML = SITE_CONDITIONS[site];
    document.getElementById('incisions').innerHTML = incisions;

    // Check if "problem is visible"
    if (CASE.incisions != 0 && incisions >= problem) 
    {
        document.getElementById('fix-it').removeAttribute('disabled');
    } 
    else 
    {
        document.getElementById('fix-it').setAttribute('disabled', '');
    }

    // Extra message
    let exm = '';
    if (brokenBones > 0) { exm += `Broken bones: ${brokenBones}\n`; }
    if (shatteredBones > 0) { exm += `Shattered bones: ${brokenBones}\n`; }
    document.getElementById('extra-message').innerHTML = exm;
    
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
        return [true, "The patient died of a fever."]
    }


    // Win
    if (problem <= 0 && !fever && temp <= 103 && incisions <= 0 && 
        brokenBones <= 0 && shatteredBones <= 0 && heart && pulse <= 1) 
    {
        
        return [true, "You've cured your patient!"];
    }

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
