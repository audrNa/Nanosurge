// Functions for receiving player data

// Get player's progress on a perk
function fetchPerkPr(perkId)
{
    return numbind(localStorage.getItem('nanosurge-perk-' + perkId));
}

// Get player's money
function fetchPlayerBenzene()
{
    return numbind(localStorage.getItem('nanosurge-benzene'));
}

// Get player's level at minimum 1
function fetchPlayerLevel()
{
    let level = numbind(localStorage.getItem('nanosurge-level'))
    if (level < 1) {
        level = 1;
    }
    return level;
}

// Get player statistics
function fetchPlayerStatistics()
{
    let statistics = {};
    statistics.success = numbind(localStorage.getItem('nanosurge-surg-w'));
    statistics.fail = numbind(localStorage.getItem('nanosurge-surg-l'));
    statistics.benzeneTotal = numbind(localStorage.getItem('nanosurge-benzene-total'));
    return statistics;
}
