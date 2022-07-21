// Perks

// Make modals for items
function itemPage(item)
{
    // User info
    const playerBenzene = numbind(localStorage.getItem('nanosurge-benzene'));
    const perkPr = numbind(localStorage.getItem('nanosurge-perk-' + item));

    // Item info
    const itemModal = modals.purchaseConfirmation;

    itemModal.header = PERKS[item].name;
    itemModal.desc = PERKS[item].desc;
    itemModal.buttons[1].text = CURRENCY + PERKS[item].price;

    // Disable button if player cannot afford OR perk is already maxed
    if (playerBenzene < PERKS[item].price ||
        perkPr >= PERKS[item].limit)
    {
        itemModal.buttons[1].disabled = true;
    }
    // otherwise let them be able to purchase
    else
    {
        itemModal.buttons[1].disabled = false;
        itemModal.buttons[1].code = () => {
            purchase(item);
            document.getElementById('modal').style.display = 'none';
        };
    }

    // Make and flash modal
    modal(itemModal);
}

function purchase(item)
{
    const perkVar = 'nanosurge-perk-' + item;
    const perkPr = numbind(localStorage.getItem(perkVar));
    const playerBenzene = numbind(localStorage.getItem('nanosurge-benzene'));

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
    if (playerBenzene < PERKS[item].price)
    {
        return 3;
    }

    // Process transaction
    localStorage.setItem(perkVar, perkPr + 1);
    localStorage.setItem('nanosurge-benzene', playerBenzene - PERKS[item].price);

    return 0;
}


/* Required Keys */
// name
// id           *For localStorage
// description
// limit        *how many times it can be bought
// price

const PERKS = [
    {
        name: 'Soldering Certificate',
        id: '0',
        desc: 'fix broken cables more',
        limit: 5,
        price: 100
    },

    {
        name: 'Magic Plier',
        id: '1',
        desc: 'Fix burnt cables more.',
        limit: 5,
        price: 100
    }
];
