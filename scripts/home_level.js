// Levels

// Make a modal for level up requirements
function levelPage()
{
    // Get player info and level up reqs
    const level = fetchPlayerLevel();
    const reqs = levelUpReqs[level];

    // Make modal
    const itemModal = modals.purchaseConfirmation;
    itemModal.header = `Level ${level + 1} Requirements`;
    itemModal.desc = '';

    // List perk requirements if there are any
    if (reqs)
    {
        for (const item of reqs.perks)
        {
            itemModal.desc += `<li> ${PERKS[item[0]].name} LVL ${item[1]} </li>`;
        }
    }

    // Money requirement
    itemModal.desc += `<li> <code class="alt">${CURRENCY + thsp(levelUpPrice())}</code> </li>`

    // Level up button
    itemModal.buttons[1].text = 'Level Up';
    if (checkReq())
    // Can level up
    {
        itemModal.buttons[1].disabled = false;
        itemModal.buttons[1].code = () => {
            levelUp();
            document.getElementById('modal').style.display = 'none';
        };
    }
    // Can't
    else
    {
        itemModal.buttons[1].disabled = true;
    }

    // Make and flash modal
    modal(itemModal);
}

// Let the player level up if they meet the requirements
function levelUp()
{
    // Check if player can afford
    const eligible = checkReq();
    if (!eligible)
    {
        return 1;
    }

    // Take money and set new level
    const clvl = fetchPlayerLevel();
    const playerBenzene = fetchPlayerBenzene();
    localStorage.setItem('nanosurge-benzene', playerBenzene - levelUpPrice());
    localStorage.setItem('nanosurge-level', clvl + 1);

    // Update page and all perks
    update();
    perksListUpdate();
}

// Check requirements
function checkReq()
{
    // Get player info
    const playerLevel = fetchPlayerLevel();
    const playerBenzene = fetchPlayerBenzene();
    const reqs = levelUpReqs[playerLevel];

    // Count perks that the player did not meet requirements of
    let miss = 0;
    if (reqs)
    {
        for (const item of reqs.perks)
        {
            const perkLvl = fetchPerkPr(item[0]);
            const lvlReq = item[1];
            if (perkLvl < lvlReq)
            {
                miss++;
            }
        }
    }

    // Check perks req and price
    if (miss <= 0 && playerBenzene >= levelUpPrice())
    {
        return true;
    }
    // Did not meet req
    return false;
}

// Return level up money requirement
function levelUpPrice()
{
    // basePrice * 1.5 * (playerLevel - 1)
    const basePrice = 2000;
    const level = fetchPlayerLevel();
    return Math.round(basePrice * Math.pow(1.5, level - 1));
}

const levelUpReqs = {
    1: {
        perks: [
            [0, 4], /* Soldering Certificate LVL 4 */
            [1, 4], /* Magic Pliers LVL 4 */
            [2, 2]  /* Nanodrillers LVL 2 */
        ],
    }
};
