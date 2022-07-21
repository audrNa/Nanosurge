// index.html

// Player stats
let benzene = numbind(localStorage.getItem('nanosurge-benzene'));
let level = numbind(localStorage.getItem('nanosurge-level'));

// Random text everytime you load this page
const homeTexts = [
    'your home is boring',
    'Money here is called <code class="alt">⏣ Benzene</code>'
];

// Load some data
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('benzene').innerHTML = '⏣' + benzene;
    document.getElementById('rng-text').innerHTML = homeTexts[rng(0, homeTexts.length - 1)];
});
