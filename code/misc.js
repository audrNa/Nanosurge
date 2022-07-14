// Miscellaneous functions

// Random Number Generator between min and max
function rng(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}  
