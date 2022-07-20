// Miscellaneous functions

const VERSION = '0.1.0';

// Random Number Generator between min and max inclusive
function rng(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Put version at the top of each page this file is included in
document.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('Nanosurge ' + VERSION));
    div.setAttribute('id', 'version');

    document.body.prepend(div);
});
