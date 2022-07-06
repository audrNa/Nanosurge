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
let resuscitationTime = 0;
let bacteria = 0;
let bleeding = 0;

let extraMessage = "";


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
    const bodyInfo = [
        ['incisions', incisions],
        ['broken-bones', brokenBones],
        ['shattered-bones', shatteredBones]
    ];
    for (const item of bodyInfo)
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

    // Extra Info
    document.getElementById('extra-message').innerHTML = extraMessage;
    extraMessage = "";   // Reset so it can checked again
    
    // Message
    document.getElementById('message').innerHTML = message;
    
    // Disable tools if needed
    toolToggle();
    return 0;
}

// Some logic, check for death scenarios, change up stats, check if surgery complete
// Returns an array of a boolean and a string
function check() 
{
    // Lose conditions

    if (temp > 120)
    {
        return [true, "The patient died of a fever."];
    }

    if (!heart && resuscitationTime <= 0)
    {
        return [true, "You failed to resuscitate the patient's heart in time!"];
    }


    // Win

    if (problem <= 0 && !fever && temp <= 103 && incisions <= 0 && 
        brokenBones <= 0 && shatteredBones <= 0 && heart && bleeding <= 0
        && pulse <= 1) 
    {
        
        return [true, "You've cured your patient!"];
    }


    // Stat Changes
    tempChange();
    statusCheck();
    bleed();
    heartbeat();
    bacteriaSpread();

    // Keep going
    return [false, ""];
}

// Toggles buttons depending on condition
let buttons = [];   // Defined later when game loads
function toolToggle()
{
    // Which buttons to disable this turn
    let killList = new Set();


    // what to disable

    // No vision: disable all except Sponge
    if (!vision)
    {
        for (let i = 1; i < buttons.length; i++)
        {
            killList.add(i);
        }
    }

    // Patient not scanned / Problem not yet reached / No problem
    // -> disable Fix It
    if (caseName == '?' || incisions < problem || problem == 0)
    {
        killList.add(12);
    }

    // No incisions: disable Pins and Clamps
    if (incisions <= 0)
    {
        killList.add(7);
        killList.add(8);
    }

    // Patient awake: disable Scalpel
    if (state == 0)
    {
        killList.add(5);
    }


    // Disable buttons in killList
    for (const i of killList)
    {
        buttons[i].setAttribute('disabled', '');
    }

    // Re-enable disabled buttons if not on killList this turn
    for (let i = 0; i < buttons.length; i++)
    {
        if (buttons[i].getAttribute('disabled') != null && !killList.has(i))
        {
            buttons[i].removeAttribute('disabled');
        }
    }
}


// Load game
document.addEventListener('DOMContentLoaded', function() {
    // Surgery Tools
    const toolsContainer = document.getElementById('tools');
    for (const item of TOOLS)
    {
        // Make button
        const button = document.createElement("button");
        button.innerHTML = item.name;
        button.setAttribute('type', 'button');
        button.className = "tool";
 
        // Insert to page
        toolsContainer.insertBefore(button, toolsContainer.lastElementChild.nextSibling);

        // Add function
        button.addEventListener('click', item.use);
    }

    // Save for toolToggle()
    buttons = toolsContainer.getElementsByClassName('tool');

    // Surgery Data
    turnUpdate("you are ready to kill the patient");    // 2022-07-02 i'll put a proper message here later
});


// Random Number Generator between min and max
function rng(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}  
