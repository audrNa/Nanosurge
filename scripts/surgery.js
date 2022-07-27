// + surgery_cases.js, surgery_tools.js, surgery_check.js, surgery_modal.js

const clickSound = new Audio('./static/sounds/Modern6.wav');
const MALPRACTICE_COST = -50;

// Status
let CASE;

let caseName;
let description;
let problem;
let price;

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
    sleepTime = 0;
    resuscitationTime = 0;
    dust = CASE.dust;
    sparks = CASE.sparks;

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
        /* Make modal */
        const headers = ["Surgery Successful", "Surgery Failed"];
        const endModal = modals.surgeryEnd;
        endModal.header = headers[checkResult[0] - 1];
        endModal.desc = checkResult[1];

        // Pay based on success or loss
        const earnings = pay(checkResult[0] == 1 ? price : MALPRACTICE_COST);

        // Description
        const intSign = earnings[0] > 0 ? '+' : '-';
        const moneyChange = CURRENCY + thsp(Math.abs(earnings[0]));
        const newTotal = CURRENCY + thsp(earnings[1]);
        endModal.desc += `<hr>
        ${intSign} <code class="alt">${moneyChange}</code>
        <br>
        You now have <code class="alt">${newTotal}</code>.`;

        // Disable all tools
        for (const button of buttons)
        {
            button.setAttribute('disabled', '');
        }

        // Flash modal
        modal(endModal);

        // Allow player to safely close tab
        window.onbeforeunload = () => {};
        window.onunload = () => {};
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
        button.addEventListener('click', () => { clickSound.cloneNode(true).play(); });

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
