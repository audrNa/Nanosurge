// Miscellaneous functions

const CURRENCY = '⏣';
const VERSION = '1.0.0-alpha';

// Random Number Generator between min and max inclusive
function rng(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Randomly return 1 based on c (0.0 to 1.0)
function chance(c)
{
    return rng(1, 100) <= c * 100 ? 1 : 0;
}

// Convert strings to number / others to 0
function numbind(n)
{
    const num = Number(n);
    if (num) { return num; }
    return 0;
}

// Thousands separator
function thsp(n)
{
    return n.toLocaleString('en-US');
}

// Plays an Audio that can overlap with other Audio
function playSound(audio)
{
    audio.cloneNode(true).play();
}

// Put version at the top of each page this file is included in
document.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('Nanosurge ' + VERSION + ' by audrNa'));
    div.setAttribute('id', 'version');

    document.body.prepend(div);
});
