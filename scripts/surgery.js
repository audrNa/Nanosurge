// basically Frontend of surgery.html with a few non-frontend stuff

// SFX
const clickSound = new Audio('./static/sounds/tool_use.wav');
const successSound = new Audio('./static/sounds/surgery_success.wav');
const failSound = new Audio('./static/sounds/surgery_fail.wav');

const MALPRACTICE_COST = -50;

// Status
var CASE;

var caseName;
var caseLevel;
var description;
var problem;
var price;

// Status variables 1
var eCurrent;
var state;
var temp;
var site;

// Status variables 2
var casings;
var brokenCables;
var burntCables;

// Status variables 3
var core;
var vision;

// Changes over turns
var overheating;
var sleepTime;
var resuscitationTime;
var dust;
var sparks;

// Global object for special cases
var Special = {};

// Body Data
let extraMessage = {
    text: "",
    add(text, color) {
        this.text += `<div class="text-${color}">> ${text}</div>`;
    }
};

// Start a surgery
function start(s)
{
    // Hide modal
    document.getElementById('modal').style.display = 'none';

    // Get a random case
    CASE = s != undefined ? CASES[s] : CASES[rng(0, CASES.length - 1)];
    caseName = '?';
    caseLevel = 0;
    description = 'Waiting for scan...';
    problem = CASE.problem;
    price = CASE.price;

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
    sleepTime = -1;
    resuscitationTime = 0;
    dust = CASE.dust;
    sparks = CASE.sparks;

    // Reset global object for special cases
    Special = {};

    // Start game
    turnUpdate("You are ready to operate on the robot.");

    // Warning when closing tab
    window.onbeforeunload = () => {
        return 2;
    };

    // Make player lose if they close tab
    window.onunload = () => {
        pay(MALPRACTICE_COST);
    };

    return `CASE: [${CASE.name}]  hey you are cheating`;
}

// Status items
const STATUS = [
    {
        id: 'case',
        value() { return [caseName, '']; }
    },

    {
        id: 'e-current',
        items: [
            ['High', 'good'],
            ['Medium', 'normal'],
            ['Low', 'warning'],
            ['Very Low', 'bad'],
            ['undefined', 'bad'],
            ['null', 'bad']
        ],
        value() { return this.items[Math.floor(eCurrent)]; }
    },

    {
        id: 'status',
        items: [
            ['ACTIVE', 'normal'],
            ['REACTIVATING', 'warning'],
            ['DEACTIVATED', 'good']
        ],
        value() { return (!core) ? ['OUT OF POWER', 'bad'] : this.items[state]; },
    },

    {
        id: 'temp',
        items: [
            [100, 'good'],
            [105, 'normal'],
            [110, 'warning'],
            [115, 'bad'],
            [727, 'bad']
        ],
        value() {
            for (const item of this.items)
            {
                if (temp < item[0])
                {
                    return [temp.toFixed(1), item[1]];
                }
            }
        }
    },

    {
        id: 'site',
        items: [
            ['Clean', 'good'],
            ['Dusty', 'warning'],
            ['Covered in Dust', 'bad']
        ],
        value() { return this.items[site]; }
    },

    {
        id: 'case-description',
        value() {return [description, '']; }
    },

    {
        id: 'case-level-n',
        items: [
            'normal',
            'good',
            'normal',
            'warning',
            'bad'
        ],
        value() { return [caseLevel ? caseLevel : '?', this.items[caseLevel]]; }
    }
];

// Status items that hide themselves if not an issue
const STATUS_2 = [
    {
        id: 'casings',
        class: 'bad',
        value() { return casings; }
    },

    {
        id: 'broken-cables',
        class: 'warning',
        value() { return brokenCables; }
    },

    {
        id: 'burnt-cables',
        class: 'bad',
        value() { return burntCables; }
    }
];

// Update status
function turnUpdate(message)
{
    // Check stats and store result
    const checkResult = check();

    // Status
    for (const item of STATUS)
    {
        const element = document.getElementById(item.id);
        element.innerHTML = item.value()[0];
        element.className = "text-" + item.value()[1];
    }

    // Status 2
    for (const item of STATUS_2)
    {
        const itemValue = item.value();
        // Show item if relevant
        if (itemValue > 0)
        {
            let row = document.getElementById(item.id);
            row.childNodes[3].innerHTML = `<code class="text-${item.class}">${itemValue}</code>`;
            row.removeAttribute('hidden');
        }
        // Hide if this is not a problem
        else
        {
            document.getElementById(item.id).setAttribute('hidden', '');
        }
    }

    // Body Data
    document.getElementById('extra-message').innerHTML = extraMessage.text ?
    extraMessage.text : "<div class='text-good'>No other abnormalities detected.</div>";

    // Reset so it can be checked again
    extraMessage.text = "";

    // Turn Message
    document.getElementById('message').innerHTML = message;

    // Disable irrelevant tools
    toolToggle();

    // Check result if end
    if (checkResult[0] != 0)
    {
        gameEnd(checkResult);
    }

    return 0;
}

function gameEnd(r)
{
    // Result
    // 0: Success | 1: Fail
    const RES = r[0] - 1;


    /* Make modal */
    const endModal = modals.surgeryEnd;
    endModal.header = ["Surgery Successful", "Surgery Failed"][RES];
    endModal.desc = r[1];

    // Pay if fail or success
    const earnings = pay(RES ? MALPRACTICE_COST : price);

    // Earnings on description
    const intSign = earnings[0] > 0 ? '+' : '-';
    const moneyChange = CURRENCY + thsp(Math.abs(earnings[0]));
    const newTotal = CURRENCY + thsp(earnings[1]);
    endModal.desc += `<hr>
    ${intSign} <code class="alt">${moneyChange}</code>
    <br>
    You now have <code class="alt">${newTotal}</code>.`;


    /* Record for statistics */
    const statistics = fetchPlayerStatistics();

    // Surgery
    switch (RES)
    {
        case 0:
            localStorage.setItem('nanosurge-surg-w', statistics.success + 1);
            break;
        case 1:
            localStorage.setItem('nanosurge-surg-l', statistics.fail + 1);
            break;
    }

    // Benzene
    if (earnings[0] > 0) {
        localStorage.setItem('nanosurge-benzene-total', statistics.benzeneTotal + earnings[0]);
    }


    // Disable all tools
    for (const button of buttons)
    {
        button.setAttribute('disabled', '');
    }

    // Flash modal
    modal(endModal);

    // SFX
    playSound([successSound, failSound][RES]);

    // Allow player to safely close tab
    window.onbeforeunload = () => {};
    window.onunload = () => {};
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
    { killList.add(11); }

    // No removed casings: disable Rescrew
    if (casings <= 0) { killList.add(6); }

    // Robot active: disable Unscrew
    if (state == 0) { killList.add(5); }

    // Nothing to fix / No removed casings: disable Soldering Iron
    if (brokenCables <= 0 || casings <= 0) { killList.add(1); }

    // Nothing to fix / No removed casings / No sparks: disable Electrical Tape
    if ((burntCables <= 0 || casings <= 0) && sparks <= 0)
    { killList.add(7); }

    // Robot already scanned: disable Scanner
    if (caseName != '?') { killList.add(9); }

    // No overheating: disable Coolant
    if (!overheating) { killList.add(3); }


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

// Add to player's money after surgery
function pay(x)
{
    // Calculate earnings | x * 1.5 * (playerLevel - 1)
    const earnings = Math.round(numbind(x) * Math.pow(1.5, fetchPlayerLevel() - 1));

    // Set new money
    const money = fetchPlayerBenzene();
    const newAmount = money + earnings;
    localStorage.setItem('nanosurge-benzene', newAmount);

    // Return gain and player's new amount of money
    return [earnings, newAmount];
}


// Load game
const keyBinds = new Object();
document.addEventListener('DOMContentLoaded', () => {
    // Surgery Tools
    const toolsContainer = document.getElementById('tools');
    for (const item of TOOLS)
    {
        // Make button
        const button = document.createElement('button');
        button.innerHTML = `
        <code>${item.keybind.toUpperCase()}</code>
        <img draggable="false" src="./static/sprites/${item.sprite}">
        `;
        button.setAttribute('type', 'button');
        button.setAttribute('disabled', '');
        button.setAttribute('class', 'tool');
        button.title = item.name;

        // Insert to page
        toolsContainer.appendChild(button);

        // Add function
        button.addEventListener('click', item.use);
        button.addEventListener('click', () => { playSound(clickSound) });

        // Save for toolToggle() and keybinds
        buttons.push(button);
        keyBinds[item.keybind] = button;
    }

    // Keybinds to tools
    document.addEventListener('keydown', (event) => {
        const tool = keyBinds[event.key];
        try {
            tool.focus();
            tool.click();
        } catch (e) {}
    });

    // Confirmation modal
    modal(modals.surgeryStart);
});
