// index.html

// Get money as a number
let benzene = Number(localStorage.getItem('benzene'));

// Set money to 0 if it doesn't exist
if (!benzene) 
{
    localStorage.setItem('benzene', 0);
    benzene = 0;
}

// Random text everytime you load this page
const homeTexts = [
    'your home is boring', 
    'Money here is called <code class="alt">⏣ Benzene</code>',
    '<a href="https://twitter.com/Nepteruno" target="_blank">nep</a>'
];

// Load some data
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('benzene').innerHTML = '⏣' + benzene.toFixed(2);
    document.getElementById('rng-text').innerHTML = homeTexts[rng(0, homeTexts.length - 1)];
});
