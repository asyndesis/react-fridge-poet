module.exports = (function() {

    var wordListBasic = [
        { word: '&', prob: '0.003125'},
        { word: '&', prob: '0.003125'},
        { word: 'a', prob: '0.003125'},
        { word: 'a', prob: '0.003125'},
        { word: 'a', prob: '0.003125'},
        { word: 'a', prob: '0.003125'},
        { word: 'a', prob: '0.003125'},
        { word: 'a', prob: '0.003125'},
        { word: 'about', prob: '0.003125'},
        { word: 'above', prob: '0.003125'},
        { word: 'ache', prob: '0.003125'},
        { word: 'ad', prob: '0.003125'},
        { word: 'after', prob: '0.003125'},
        { word: 'all', prob: '0.003125'},
        { word: 'am', prob: '0.003125'},
        { word: 'am', prob: '0.003125'},
        { word: 'an', prob: '0.003125'},
        { word: 'an', prob: '0.003125'},
        { word: 'and', prob: '0.003125'},
        { word: 'and', prob: '0.003125'},
        { word: 'and', prob: '0.003125'},
        { word: 'and', prob: '0.003125'},
        { word: 'apparatus', prob: '0.003125'},
        { word: 'are', prob: '0.003125'},
        { word: 'are', prob: '0.003125'},
        { word: 'arm', prob: '0.003125'},
        { word: 'as', prob: '0.003125'},
        { word: 'as', prob: '0.003125'},
        { word: 'as', prob: '0.003125'},
        { word: 'as', prob: '0.003125'},
        { word: 'ask', prob: '0.003125'},
        { word: 'at', prob: '0.003125'},
        { word: 'at', prob: '0.003125'},
        { word: 'at', prob: '0.003125'},
        { word: 'away', prob: '0.003125'},
        { word: 'bare', prob: '0.003125'},
        { word: 'be', prob: '0.003125'},
        { word: 'beat', prob: '0.003125'},
        { word: 'beauty', prob: '0.003125'},
        { word: 'bed', prob: '0.003125'},
        { word: 'beneath', prob: '0.003125'},
        { word: 'bitter', prob: '0.003125'},
        { word: 'black', prob: '0.003125'},
        { word: 'blood', prob: '0.003125'},
        { word: 'blow', prob: '0.003125'},
        { word: 'blue', prob: '0.003125'},
        { word: 'boil', prob: '0.003125'},
        { word: 'boy', prob: '0.003125'},
        { word: 'breast', prob: '0.003125'},
        { word: 'but', prob: '0.003125'},
        { word: 'but', prob: '0.003125'},
        { word: 'but', prob: '0.003125'},
        { word: 'but', prob: '0.003125'},
        { word: 'butt', prob: '0.003125'},
        { word: 'by', prob: '0.003125'},
        { word: 'by', prob: '0.003125'},
        { word: 'can', prob: '0.003125'},
        { word: 'chant', prob: '0.003125'},
        { word: 'chocolate', prob: '0.003125'},
        { word: 'cool', prob: '0.003125'},
        { word: 'could', prob: '0.003125'},
        { word: 'crush', prob: '0.003125'},
        { word: 'cry', prob: '0.003125'},
        { word: 'd', prob: '0.003125'},
        { word: 'day', prob: '0.003125'},
        { word: 'death', prob: '0.003125'},
        { word: 'delirious', prob: '0.003125'},
        { word: 'diamond', prob: '0.003125'},
        { word: 'did', prob: '0.003125'},
        { word: 'do', prob: '0.003125'},
        { word: 'do', prob: '0.003125'},
        { word: 'dream', prob: '0.003125'},
        { word: 'dress', prob: '0.003125'},
        { word: 'drive', prob: '0.003125'},
        { word: 'drool', prob: '0.003125'},
        { word: 'drunk', prob: '0.003125'},
        { word: 'eat', prob: '0.003125'},
        { word: 'ed', prob: '0.003125'},
        { word: 'ed', prob: '0.003125'},
        { word: 'ed', prob: '0.003125'},
        { word: 'ed', prob: '0.003125'},
        { word: 'egg', prob: '0.003125'},
        { word: 'elaborate', prob: '0.003125'},
        { word: 'enormous', prob: '0.003125'},
        { word: 'er', prob: '0.003125'},
        { word: 'es', prob: '0.003125'},
        { word: 'est', prob: '0.003125'},
        { word: 'fast', prob: '0.003125'},
        { word: 'feet', prob: '0.003125'},
        { word: 'fiddle', prob: '0.003125'},
        { word: 'finger', prob: '0.003125'},
        { word: 'fluff', prob: '0.003125'},
        { word: 'for', prob: '0.003125'},
        { word: 'forest', prob: '0.003125'},
        { word: 'frantic', prob: '0.003125'},
        { word: 'friend', prob: '0.003125'},
        { word: 'from', prob: '0.003125'},
        { word: 'from', prob: '0.003125'},
        { word: 'garden', prob: '0.003125'},
        { word: 'girl', prob: '0.003125'},
        { word: 'go', prob: '0.003125'},
        { word: 'goddess', prob: '0.003125'},
        { word: 'gorgeous', prob: '0.003125'},
        { word: 'gown', prob: '0.003125'},
        { word: 'hair', prob: '0.003125'},
        { word: 'has', prob: '0.003125'},
        { word: 'have', prob: '0.003125'},
        { word: 'have', prob: '0.003125'},
        { word: 'he', prob: '0.003125'},
        { word: 'he', prob: '0.003125'},
        { word: 'head', prob: '0.003125'},
        { word: 'heave', prob: '0.003125'},
        { word: 'her', prob: '0.003125'},
        { word: 'her', prob: '0.003125'},
        { word: 'here', prob: '0.003125'},
        { word: 'him', prob: '0.003125'},
        { word: 'his', prob: '0.003125'},
        { word: 'his', prob: '0.003125'},
        { word: 'honey', prob: '0.003125'},
        { word: 'hot', prob: '0.003125'},
        { word: 'how', prob: '0.003125'},
        { word: 'I', prob: '0.003125'},
        { word: 'I', prob: '0.003125'},
        { word: 'I', prob: '0.003125'},
        { word: 'I', prob: '0.003125'},
        { word: 'if', prob: '0.003125'},
        { word: 'in', prob: '0.003125'},
        { word: 'in', prob: '0.003125'},
        { word: 'in', prob: '0.003125'},
        { word: 'ing', prob: '0.003125'},
        { word: 'ing', prob: '0.003125'},
        { word: 'ing', prob: '0.003125'},
        { word: 'ing', prob: '0.003125'},
        { word: 'ing', prob: '0.003125'},
        { word: 'ing', prob: '0.003125'},
        { word: 'is', prob: '0.003125'},
        { word: 'is', prob: '0.003125'},
        { word: 'is', prob: '0.003125'},
        { word: 'is', prob: '0.003125'},
        { word: 'is', prob: '0.003125'},
        { word: 'it', prob: '0.003125'},
        { word: 'it', prob: '0.003125'},
        { word: 'it', prob: '0.003125'},
        { word: 'juice', prob: '0.003125'},
        { word: 'lake', prob: '0.003125'},
        { word: 'language', prob: '0.003125'},
        { word: 'languid', prob: '0.003125'},
        { word: 'lather', prob: '0.003125'},
        { word: 'lazy', prob: '0.003125'},
        { word: 'less', prob: '0.003125'},
        { word: 'let', prob: '0.003125'},
        { word: 'lick', prob: '0.003125'},
        { word: 'lie', prob: '0.003125'},
        { word: 'life', prob: '0.003125'},
        { word: 'light', prob: '0.003125'},
        { word: 'like', prob: '0.003125'},
        { word: 'like', prob: '0.003125'},
        { word: 'like', prob: '0.003125'},
        { word: 'live', prob: '0.003125'},
        { word: 'love', prob: '0.003125'},
        { word: 'luscious', prob: '0.003125'},
        { word: 'lust', prob: '0.003125'},
        { word: 'ly', prob: '0.003125'},
        { word: 'ly', prob: '0.003125'},
        { word: 'ly', prob: '0.003125'},
        { word: 'ly', prob: '0.003125'},
        { word: 'mad', prob: '0.003125'},
        { word: 'man', prob: '0.003125'},
        { word: 'me', prob: '0.003125'},
        { word: 'me', prob: '0.003125'},
        { word: 'me', prob: '0.003125'},
        { word: 'mean', prob: '0.003125'},
        { word: 'meat', prob: '0.003125'},
        { word: 'men', prob: '0.003125'},
        { word: 'milk', prob: '0.003125'},
        { word: 'mist', prob: '0.003125'},
        { word: 'moan', prob: '0.003125'},
        { word: 'moon', prob: '0.003125'},
        { word: 'mother', prob: '0.003125'},
        { word: 'music', prob: '0.003125'},
        { word: 'must', prob: '0.003125'},
        { word: 'my', prob: '0.003125'},
        { word: 'my', prob: '0.003125'},
        { word: 'my', prob: '0.003125'},
        { word: 'need', prob: '0.003125'},
        { word: 'never', prob: '0.003125'},
        { word: 'no', prob: '0.003125'},
        { word: 'no', prob: '0.003125'},
        { word: 'not', prob: '0.003125'},
        { word: 'not', prob: '0.003125'},
        { word: 'of', prob: '0.003125'},
        { word: 'of', prob: '0.003125'},
        { word: 'of', prob: '0.003125'},
        { word: 'of', prob: '0.003125'},
        { word: 'on', prob: '0.003125'},
        { word: 'on', prob: '0.003125'},
        { word: 'one', prob: '0.003125'},
        { word: 'or', prob: '0.003125'},
        { word: 'our', prob: '0.003125'},
        { word: 'over', prob: '0.003125'},
        { word: 'pant', prob: '0.003125'},
        { word: 'peach', prob: '0.003125'},
        { word: 'petal', prob: '0.003125'},
        { word: 'picture', prob: '0.003125'},
        { word: 'pink', prob: '0.003125'},
        { word: 'play', prob: '0.003125'},
        { word: 'please', prob: '0.003125'},
        { word: 'pole', prob: '0.003125'},
        { word: 'pound', prob: '0.003125'},
        { word: 'puppy', prob: '0.003125'},
        { word: 'purple', prob: '0.003125'},
        { word: 'put rr', prob: '0.003125'},
        { word: 'rain', prob: '0.003125'},
        { word: 'raw', prob: '0.003125'},
        { word: 'recall', prob: '0.003125'},
        { word: 'red', prob: '0.003125'},
        { word: 'repulsive', prob: '0.003125'},
        { word: 'rip', prob: '0.003125'},
        { word: 'rock', prob: '0.003125'},
        { word: 'rose', prob: '0.003125'},
        { word: 'run', prob: '0.003125'},
        { word: 'rust', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 's', prob: '0.003125'},
        { word: 'sad', prob: '0.003125'},
        { word: 'said', prob: '0.003125'},
        { word: 'sausage', prob: '0.003125'},
        { word: 'say', prob: '0.003125'},
        { word: 'scream', prob: '0.003125'},
        { word: 'sea', prob: '0.003125'},
        { word: 'see', prob: '0.003125'},
        { word: 'shadow', prob: '0.003125'},
        { word: 'she', prob: '0.003125'},
        { word: 'she', prob: '0.003125'},
        { word: 'shine', prob: '0.003125'},
        { word: 'ship', prob: '0.003125'},
        { word: 'shot', prob: '0.003125'},
        { word: 'show', prob: '0.003125'},
        { word: 'sing', prob: '0.003125'},
        { word: 'sit', prob: '0.003125'},
        { word: 'skin', prob: '0.003125'},
        { word: 'sky', prob: '0.003125'},
        { word: 'sleep', prob: '0.003125'},
        { word: 'smear', prob: '0.003125'},
        { word: 'smell', prob: '0.003125'},
        { word: 'smooth', prob: '0.003125'},
        { word: 'so', prob: '0.003125'},
        { word: 'soar', prob: '0.003125'},
        { word: 'some', prob: '0.003125'},
        { word: 'sordid', prob: '0.003125'},
        { word: 'spray', prob: '0.003125'},
        { word: 'spring', prob: '0.003125'},
        { word: 'still', prob: '0.003125'},
        { word: 'stop', prob: '0.003125'},
        { word: 'storm', prob: '0.003125'},
        { word: 'suit', prob: '0.003125'},
        { word: 'summer', prob: '0.003125'},
        { word: 'sun', prob: '0.003125'},
        { word: 'sweat', prob: '0.003125'},
        { word: 'sweet', prob: '0.003125'},
        { word: 'swim', prob: '0.003125'},
        { word: 'symphony', prob: '0.003125'},
        { word: 'the', prob: '0.003125'},
        { word: 'the', prob: '0.003125'},
        { word: 'the', prob: '0.003125'},
        { word: 'the', prob: '0.003125'},
        { word: 'the', prob: '0.003125'},
        { word: 'their', prob: '0.003125'},
        { word: 'there', prob: '0.003125'},
        { word: 'these', prob: '0.003125'},
        { word: 'they', prob: '0.003125'},
        { word: 'those', prob: '0.003125'},
        { word: 'though', prob: '0.003125'},
        { word: 'thousand', prob: '0.003125'},
        { word: 'through', prob: '0.003125'},
        { word: 'time', prob: '0.003125'},
        { word: 'tiny', prob: '0.003125'},
        { word: 'to', prob: '0.003125'},
        { word: 'to', prob: '0.003125'},
        { word: 'to', prob: '0.003125'},
        { word: 'together', prob: '0.003125'},
        { word: 'tongue', prob: '0.003125'},
        { word: 'trudge', prob: '0.003125'},
        { word: 'TV', prob: '0.003125'},
        { word: 'ugly', prob: '0.003125'},
        { word: 'up', prob: '0.003125'},
        { word: 'urge', prob: '0.003125'},
        { word: 'us', prob: '0.003125'},
        { word: 'use', prob: '0.003125'},
        { word: 'want', prob: '0.003125'},
        { word: 'want', prob: '0.003125'},
        { word: 'was', prob: '0.003125'},
        { word: 'watch', prob: '0.003125'},
        { word: 'water', prob: '0.003125'},
        { word: 'wax', prob: '0.003125'},
        { word: 'we', prob: '0.003125'},
        { word: 'we', prob: '0.003125'},
        { word: 'were', prob: '0.003125'},
        { word: 'what', prob: '0.003125'},
        { word: 'when', prob: '0.003125'},
        { word: 'whisper', prob: '0.003125'},
        { word: 'who', prob: '0.003125'},
        { word: 'why', prob: '0.003125'},
        { word: 'will', prob: '0.003125'},
        { word: 'wind', prob: '0.003125'},
        { word: 'with', prob: '0.003125'},
        { word: 'with', prob: '0.003125'},
        { word: 'woman', prob: '0.003125'},
        { word: 'worship', prob: '0.003125'},
        { word: 'y', prob: '0.003125'},
        { word: 'y', prob: '0.003125'}
    ];  

    function spawnMagnets() {
        var numWords = 300;
        let magnets = [];
        for (i = 0; i < numWords; i++){
            magnets.push({
                word: getRandomWord(wordListBasic),
                x: getRandomCoord(1200),
                y: getRandomCoord(800),
                id: i
            })
        }
        return magnets;
    }

    function getRandomCoord(pixels){
        return Math.floor(Math.random() * pixels) + 1;
    }
    function getRandomWord(wordList) {
        var winner = Math.random();
        var threshold = 0;
        for (let i = 0; i < wordList.length; i++) {
            threshold += parseFloat(wordList[i].prob);
            if (threshold > winner) {
                return wordList[i].word
    
            }
        }
    };


    // Public API definition
    return {
        spawnMagnets: spawnMagnets
    };
})();