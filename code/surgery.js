// + surgery_cases.js, surgery_tools.js, surgery_check.js, surgery_modal.js

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
let burntCables;

// Status variables 3
let core;
let vision;

// Changes over turns
let overheating;
let sleepTime;
let resuscitationTime;
let dust;
let sparks;

let extraMessage = "";

// Start a surgery
function start(s)
{
    // Get a random case
    CASE = s != undefined ? CASES[s] : CASES[rng(0, CASES.length - 1)];

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
    burntCables = CASE.burntCables;
    
    // Status variables 3
    core = true;
    vision = true;
    
    // Changes over turns
    overheating = CASE.overheating;
    sleepTime = 0;
    resuscitationTime = 0;
    dust = CASE.dust;
    sparks = CASE.sparks;

    // Start game
    turnUpdate('You are ready to kill the patient');
    return `CASE: ${CASE.name}`;
}

// Update status
function turnUpdate(message) 
{
    // Check stats and store result
    const checkResult = check();

    // Status
    document.getElementById('case').innerHTML = caseName;
    document.getElementById('e-current').innerHTML = ECURRENT_STATES[eCurrent];
    document.getElementById('status').innerHTML = (!core) ? 'OUT OF POWER' : STATES[state];
    document.getElementById('temp').innerHTML = (temp).toFixed(1);
    document.getElementById('site').innerHTML = SITE_CONDITIONS[site];

    // Status 2
    const bodyInfo = [
        ['casings', casings],
        ['broken-cables', brokenCables],
        ['burnt-cables', burntCables]
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

    // Check result
    if (checkResult[0] != 0)
    {
        const headers = ["Surgery Successful", "Surgery Failed"];
        modals.surgeryEnd.header = headers[checkResult[0] - 1];
        modals.surgeryEnd.desc = checkResult[1];
        modal(modals.surgeryEnd);
        return 0;
    }

    return 0;
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
    // -> disable Repair
    if (caseName == '?' || problem == 0 || casings < problem)
    {
        killList.add(11);
    }

    // No removed casings: disable Rescrew
    if (casings <= 0)
    {
        // Rescrew
        killList.add(6);
    }

    // Robot active: disable Unscrew
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
