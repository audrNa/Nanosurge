// index.html

// Player stats
let benzene = numbind(localStorage.getItem('nanosurge-benzene'));
let level = numbind(localStorage.getItem('nanosurge-level'));

// Random text everytime you load this page
const homeTexts = [
    'your home is boring',
    'Money here is called <code class="alt">⏣ Benzene</code>'
];

// Load data
document.addEventListener('DOMContentLoaded', () => {
    // Player benzene and random text
    document.getElementById('benzene').innerHTML = CURRENCY + benzene;
    document.getElementById('rng-text').innerHTML = homeTexts[rng(0, homeTexts.length - 1)];

    // Perks
    const perksList = document.getElementById('perks-list');
    for (const perk of PERKS)
    {
        // Make button
        const div = document.createElement('div');
        div.setAttribute('class', 'perks');

        const name = document.createElement('div');
        name.appendChild(document.createTextNode(perk.name));
        div.appendChild(name);

        const price = document.createElement('div');
        price.setAttribute('class', 'p-price');
        price.appendChild(document.createTextNode(CURRENCY + perk.price));
        div.appendChild(price);

        // Add function
        div.addEventListener('click', () => { itemPage(perk.id) });

        // Insert to page
        perksList.appendChild(div);
    }
});
