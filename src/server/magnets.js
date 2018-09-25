module.exports = (function() {

    function spawnMagnets() {
        let magnets = [
            {id:0, word: 'ing', x:10, y:20},
            {id:1, word: 'fart', x:30, y:50},
            {id:2, word: 'I', x:100,y:150},
            {id:3, word: 'am', x:100,y:150},
        ];
        console.log(getRandom(wordListBasic));
        return magnets;

    }

    var wordListBasic = [
        {word:'a',prob:'0.5'},
        {word:'can',prob:'0.4'},
        {word:'magical',prob:'0.1'},
    ];  
    
    function getRandom(wordList) {
        var winner = Math.random();
        var threshold = 0;
        for (let i = 0; i < problist.length; i++) {
            threshold += parseFloat(problist[i].prob);
            if (threshold > winner) {
                return problist[i]
    
            }
        }
    };


    // Public API definition
    return {
        spawnMagnets: spawnMagnets,
        getRandom: getRandom
    };
})();