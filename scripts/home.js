// index.html

// Player stats
let benzene = numbind(localStorage.getItem('nanosurge-benzene'));
let level = numbind(localStorage.getItem('nanosurge-level'));

// Random text everytime you load this page
const homeTexts = [
    'your home is boring',
    'Money here is called <code class="alt">⏣ Benzene</code>'
];

// Create a button for a perk
// Takes perk object as parameter
function perkButton(perk)
{
    // Variables
    const perkPr = numbind(localStorage.getItem('nanosurge-perk-' + perk.id));
    var price = CURRENCY + perk.price * (perkPr + 1);
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
    div.addEventListener('click', () => { itemPage(perk.id) });

    // Return the new element
    return div;
}

// Make modals for items
function itemPage(item)
{
    // Get user info
    const playerBenzene = numbind(localStorage.getItem('nanosurge-benzene'));
    const perkPr = numbind(localStorage.getItem('nanosurge-perk-' + item));

    // Get item info
    const itemModal = modals.purchaseConfirmation;
    const price = PERKS[item].price * (perkPr + 1);
    var priceDisplay = CURRENCY + thsp(price);

    // Disable purchase button if they already maxed this perk
    if (perkPr >= PERKS[item].limit)
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
            purchase(item);
            document.getElementById('modal').style.display = 'none';
        };
    }

    // Set info
    itemModal.header = `${PERKS[item].name} &#8212; LVL ${perkPr} / ${PERKS[item].limit}`;
    itemModal.desc = PERKS[item].desc;
    itemModal.buttons[1].text = priceDisplay;

    // Make and flash modal
    modal(itemModal);
}

// Purchase a perk
function purchase(item)
{
    const perkVar = 'nanosurge-perk-' + item;
    const perkPr = numbind(localStorage.getItem(perkVar));
    const playerBenzene = numbind(localStorage.getItem('nanosurge-benzene'));
    const price = PERKS[item].price * (perkPr + 1);

    // Check if perk exists
    if (!PERKS[item])
    {
        return 1;
    }

    // Check if perk is already maxed
    if (perkPr >= PERKS[item].limit)
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

    // Update page
    document.getElementById('benzene').innerHTML = CURRENCY + thsp(newAmount);
    const oldItem = document.getElementById('perks-list').children[item];
    const newItem = perkButton(PERKS[item]);
    oldItem.replaceWith(newItem);

    return 0;
}

// Load data
document.addEventListener('DOMContentLoaded', () => {
    // Player benzene and random text
    document.getElementById('benzene').innerHTML = CURRENCY + thsp(benzene);
    document.getElementById('rng-text').innerHTML = homeTexts[rng(0, homeTexts.length - 1)];

    // Perks
    const perksList = document.getElementById('perks-list');
    for (const item of PERKS)
    {
        // Create button
        const button = perkButton(item);

        // Insert to page
        perksList.appendChild(button);
    }
});
