module.exports = (function() {

    function spawnMagnets() {
        let magnets = [
            {id:0, word: 'ing', x:10, y:20},
            {id:1, word: 'fart', x:30, y:50},
            {id:2, word: 'I', x:100,y:150},
            {id:3, word: 'am', x:100,y:150},
        ];
        return magnets;
    }
    // Public API definition
    return {
        spawnMagnets: spawnMagnets
    };
})();