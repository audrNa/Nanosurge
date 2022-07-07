// + surgery_cases.js, surgery_tools.js, surgery_check_helpers.js, surgery_modal.js

// Definitions
const STATES = ['ACTIVE', 'REACTIVATING', 'DEACTIVATED'];
const SITE_CONDITIONS = ['Clean', 'Dusty', 'Covered in Dust'];
const ECURRENT_STATES = ['High', 'Medium', 'Low', 'Very Low'];
const GOOD_TEMP = 99.8;

// Status
let CASE;

let caseName;
let problem;

// Status variables 1
let eCurrent;
let state;
let temp;
let site;

// Status variables 2
let casings;
let brokenCables;
let shatteredBones;

// Status variables 3
let heart;
let vision;

// Changes over turns
let fever;
let sleepTime;
let resuscitationTime;
let bacteria;
let bleeding;

let extraMessage = "";

// Start a surgery
function start()
{
    // Get a random case
    CASE = CASES[rng(0, CASES.length - 1)];

    caseName = '?';
    problem = CASE.casings;
    
    // Status variables 1
    eCurrent = CASE.eCurrent;
    state = 0;
    temp = CASE.temp;
    site = 0;
    
    // Status variables 2
    casings = 0;
    brokenCables = CASE.brokenCables;
    shatteredBones = CASE.shatteredBones;
    
    // Status variables 3
    heart = true;
    vision = true;
    
    // Changes over turns
    fever = CASE.fever;
    sleepTime = 0;
    resuscitationTime = 0;
    bacteria = CASE.bacteria;
    bleeding = CASE.bleeding;

    // Start game
    turnUpdate('You are ready to kill the patient');
}

// Update status
function turnUpdate(message) 
{
    // End surgery and show modal if surgery is complete 
    const checkResult = check();
    if (checkResult[0] != 0)
    {
        const headers = ["Surgery Successful", "Surgery Failed"];
        modals.surgeryEnd.header = headers[checkResult[0] - 1];
        modals.surgeryEnd.desc = checkResult[1];
        modal(modals.surgeryEnd);
        return 0;
    }

    // Status
    document.getElementById('case').innerHTML = caseName;
    document.getElementById('pulse').innerHTML = ECURRENT_STATES[eCurrent];
    document.getElementById('status').innerHTML = (!heart) ? 'HEART STOPPED' : STATES[state];
    document.getElementById('temp').innerHTML = (temp).toFixed(1);
    document.getElementById('site').innerHTML = SITE_CONDITIONS[site];

    // Status 2
    const bodyInfo = [
        ['casings', casings],
        ['broken-cables', brokenCables],
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

// Check if job is done or keep going and make things harder
// Returns an array of a number and a string
function check() 
{
    // Lose conditions

    if (temp > 120)
    {
        return [2, "The patient died of a fever."];
    }

    if (!heart && resuscitationTime <= 0)
    {
        return [2, "You failed to resuscitate the patient's heart in time!"];
    }


    // Win

    if (problem <= 0 && !fever && temp <= 103 && casings <= 0 && 
        brokenCables <= 0 && shatteredBones <= 0 && heart && bleeding <= 0
        && eCurrent <= 1) 
    {
        
        return [1, "You've cured your patient!"];
    }


    // Stat Changes
    tempChange();
    statusCheck();
    bleed();
    heartbeat();
    bacteriaSpread();

    // Keep going
    return [0, ""];
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

    // Patient not scanned / No problem / Problem not yet reached
    // -> disable Fix It
    if (caseName == '?' || problem == 0 || casings < problem)
    {
        killList.add(12);
    }

    // No casings: disable Pins and Clamps
    if (casings <= 0)
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
        const button = document.createElement('button');
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

    // Confirmation modal
    modal(modals.surgeryStart);
});


// Random Number Generator between min and max
function rng(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}  
