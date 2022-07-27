// Perks

// Perks' key values can be used only once once released
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
                    desc: 'kikuohana',
                    limit: 100,
                    price: 100
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
