// Perks

// Perks' key numbers can be used only once once released
/* Required Keys */
// name
// desc
// limit        *how many times it can be bought
// price

// PERKS will be updated in home.js through perksListUpdate()
let PERKS = {};

// Sets unlocked perks to PERKS
function setPerks()
{
    // Reset perks
    PERKS = {};

    // Get unlocked perks
    switch (fetchPlayerLevel())
    {
        default:
            // Level 4 up: All
        case 4:
            // TODO
        case 3:
            // TODO
        case 2:
            // TODO
            Object.assign(PERKS,
            {
                3: {
                    name: 'Resistant Adhesive',
                    desc: `"Better electrical tapes"
                    <ul>
                        <li>Allows you to fix more sparks at once.</li>
                        <li>Each level increases the bonus fixes by <code class="alt">1</code>.</li>
                    </ul>`,
                    limit: 3,
                    price: 500
                },

                4: {
                    name: 'Extra Fuel',
                    desc: `"Extra fuel to use for generating more electrical current!"
                    <ul>
                        <li>Allows you to supply more electrical current at once.</li>
                        <li>Each level increases the bonus supplies by <code class="alt">1</code>.</li>
                    </ul>`,
                    limit: 2,
                    price: 300
                },

                5: {
                    name: 'Anti-dust Tech',
                    desc: `"From <code class="alt">Nep Co.</code>, they provide amazing technology to decrease the appearance of dust!"
                    <ul>
                        <li>Passive Perk: Halves dust accumulation per turn.</li>
                    </ul>`,
                    limit: 1,
                    price: 1500
                }
            });
        case 1:
            Object.assign(PERKS,
            {
                0: {
                    name: 'Soldering Certificate',
                    desc: `"Upgrade your soldering skills with money"
                    <ul>
                        <li>Allows you to solder an extra broken cable on the same turn.</li>
                        <li>Each level increases the bonus chance by <code class="alt">+50%</code>.</li>
                    </ul>`,
                    limit: 6,
                    price: 150
                },

                1: {
                    name: 'Magic Plier',
                    desc: `"A plier that may or may not be able to duplicate tape."
                    <ul>
                        <li>Allows you to fix an extra burnt cable on the same turn.</li>
                        <li>Each level increases the bonus chance by <code class="alt">+50%</code>.</li>
                    </ul>`,
                    limit: 6,
                    price: 150
                },

                2: {
                    name: 'Nanodrillers',
                    desc: `"Summon a few tiny robots to help unscrew and rescrew some casings for you!"
                    <ul>
                        <li>They kinda suck so there's only a chance they actually unscrew or rescrew on a turn.</li>
                        <li>Each level increases the chances of them helping by <code class="alt">+25%</code>.</li>
                    </ul>`,
                    limit: 8,
                    price: 250
                }
            });
    }
}
