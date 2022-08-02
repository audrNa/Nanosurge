// index.html

// Random text everytime you load this page
const homeTexts = [
    "your home is boring",
    "Money here is called <code class='alt'>⏣ Benzene</code>",
    "If a perk has over 100% bonus chance, you'll have chance for another bonus allowing you to get 2 bonuses at once!",
    "<a href='https://myanimelist.net/anime/10165/Nichijou'>Nano-chan</a> is cute~"
];

// List of loaded perks
const pagePerks = new Object();

// Update page data
function update(perkId)
{
    // Get stats
    const benzene = fetchPlayerBenzene();
    const level = fetchPlayerLevel();

    // Update page
    document.getElementById('benzene').innerHTML = CURRENCY + thsp(benzene);
    document.getElementById('rng-text').innerHTML = homeTexts[rng(0, homeTexts.length - 1)];
    document.getElementById('level-n').innerHTML = level;

    // Update button if requested
    if (perkId != null)
    {
        // get old and new button
        const oldButton = pagePerks[perkId];
        const newButton = perkButton(perkId);

        // replace old button in page and list
        oldButton.replaceWith(newButton);
        pagePerks[perkId] = newButton;
    }
}

// Create a button for a perk
function perkButton(perkId)
{
    // Get perk data
    const perk = PERKS[perkId];
    const perkPr = fetchPerkPr(perkId);
    var price = CURRENCY + fetchPerkPrice(perkId);
    var classes = 'perks';

    // Check if player has already maxed this perk
    if (perkPr >= perk.limit)
    {
        price = 'MAX';
        classes = 'perks p-max';
    }

    /* Make button */
    const div = document.createElement('div');
    div.setAttribute('class', classes);

    const name = document.createElement('div');
    name.appendChild(document.createTextNode(perk.name));
    div.appendChild(name);

    const progress = document.createElement('div');
    progress.appendChild(document.createTextNode('LVL ' + perkPr));
    progress.setAttribute('class', 'p-lvl');
    div.appendChild(progress);

    const pricetag = document.createElement('strong');
    pricetag.setAttribute('class', 'p-price');
    pricetag.appendChild(document.createTextNode(price));
    div.appendChild(pricetag);

    // Add function
    div.addEventListener('click', () => { itemPage(perkId) });

    // Return the new element
    return div;
}

// Updates all perks and elements in perks-list
function perksListUpdate()
{
    // Set unlocked perks
    setPerks();

    // Update perks list
    const perksList = document.getElementById('perks-list');
    perksList.innerHTML = '';
    for (const item in PERKS)
    {
        // Create button
        const button = perkButton(item);

        // Insert to page
        perksList.appendChild(button);

        // Put to list
        pagePerks[item] = button;
    }
}

// Make modals for items
function itemPage(perkId)
{
    // Get perk data and modal
    const perk = PERKS[perkId];
    const itemModal = modals.purchaseConfirmation;

    // Get player and item info
    const playerBenzene = fetchPlayerBenzene();
    const perkPr = fetchPerkPr(perkId);
    const price = fetchPerkPrice(perkId);
    let priceDisplay = CURRENCY + thsp(price);

    // Disable purchase button if they already maxed this perk
    if (perkPr >= perk.limit)
    {
        itemModal.buttons[1].disabled = true;
        priceDisplay = 'MAX';
    }
    // or player cannot afford
    else if (playerBenzene < price)
    {
        itemModal.buttons[1].disabled = true;
    }
    // Otherwise let them be able to purchase
    else
    {
        itemModal.buttons[1].disabled = false;
        itemModal.buttons[1].code = () => {
            purchase(perkId);
            document.getElementById('modal').style.display = 'none';
        };
    }

    // Set info
    itemModal.header = `${perk.name} &#8212; LVL ${perkPr} / ${perk.limit}`;
    itemModal.desc = perk.desc;
    itemModal.buttons[1].text = priceDisplay;

    // Make and flash modal
    modal(itemModal);
}

// Purchase a perk
function purchase(perkId)
{
    // Get perk and player data
    const perkVar = 'nanosurge-perk-' + perkId;
    const perk = PERKS[perkId];
    const price = fetchPerkPrice(perkId);
    const playerBenzene = numbind(localStorage.getItem('nanosurge-benzene'));
    const perkPr = numbind(localStorage.getItem(perkVar));

    // Check if perk exists
    if (!perk)
    {
        return 1;
    }

    // Check if perk is already maxed
    if (perkPr >= perk.limit)
    {
        return 2;
    }

    // Check if player can afford
    if (playerBenzene < price)
    {
        return 3;
    }

    // Process transaction
    const newLvl = perkPr + 1;
    const newAmount = playerBenzene - price;
    localStorage.setItem(perkVar, newLvl);
    localStorage.setItem('nanosurge-benzene', newAmount);

    // Update page and perk button
    update(perkId);

    return 0;
}

// Load data
document.addEventListener('DOMContentLoaded', () => {
    // Player benzene and random text
    update();

    // Level
    document.getElementById('level').addEventListener('click', levelPage);

    // Perks
    perksListUpdate();
});


// Get price of a perk based on player's perk progress
function fetchPerkPrice(perkId)
{
    const pr = fetchPerkPr(perkId);
    return Math.round(PERKS[perkId].price * (pr * 0.5 + 1));
}
