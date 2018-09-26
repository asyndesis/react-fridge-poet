module.exports = (function() {

    
 const wordLists = {
    basic: ['&','&','a','a','a','a','a','a','about','above','ache','ad','after','all','am','am','an','an','and','and','and','and','apparatus','are','are','arm','as','as','as','as','ask','at','at','at','away','bare','be','beat','beauty','bed','beneath','bitter','black','blood','blow','blue','boil','boy','breast','but','but','but','but','butt','by','by','can','chant','chocolate','cool','could','crush','cry','d','day','death','delirious','diamond','did','do','do','dream','dress','drive','drool','drunk','eat','ed','ed','ed','ed','egg','elaborate','enormous','er','es','est','fast','feet','fiddle','finger','fluff','for','forest','frantic','friend','from','from','garden','girl','go','goddess','gorgeous','gown','hair','has','have','have','he','he','head','heave','her','her','here','him','his','his','honey','hot','how','I','I','I','I','I','I','I','if','in','in','in','ing','ing','ing','ing','ing','ing','is','is','is','is','is','it','it','it','juice','lake','language','languid','lather','lazy','less','let','lick','lie','life','light','like','like','like','live','love','luscious','lust','ly','ly','ly','ly','mad','man','me','me','me','mean','meat','men','milk','mist','moan','moon','mother','music','must','my','my','my','need','never','no','no','not','not','of','of','of','of','on','on','one','or','our','over','pant','peach','petal','picture','pink','play','please','pole','pound','puppy','purple','put','rain','raw','recall','red','repulsive','rip','rock','rose','run','rust','s','s','s','s','s','s','s','s','s','s','s','sad','said','sausage','say','scream','sea','see','shadow','she','she','shine','ship','shot','show','sing','sit','skin','sky','sleep','smear','smell','smooth','so','soar','some','sordid','spray','spring','still','stop','storm','suit','summer','sun','sweat','sweet','swim','symphony','the','the','the','the','the','their','there','these','they','those','though','thousand','through','time','tiny','to','to','to','together','tongue','trudge','TV','ugly','up','urge','us','use','want','want','was','watch','water','wax','we','we','were','what','when','whisper','who','why','will','wind','with','with','woman','worship','y','y'],
    poet: ['&','&','&','&','a','a','a','a','a','a','a','about','after','air','all','almost','always','am','an','an','and','and','and','and','angel','are','are','as','as','ask','at','at','away','baby','be','belly','bleed','blue','blush','born','boy','breath','breeze','brilliant','bring','broken','brother','bug','but','but','but','by','cake','can','candy','caramel','cat','celebrate','champagne','child','cloud','coffee','color','come','concrete','cool','corduroy','could','crap','cup','d','d','dance','dark','day','dazzle','decay','delicious','desire','devour','did','die','dirt','do','do','dog','drink','e','e','eat','ed','ed','ed','embrace','er','er','es','es','eternity','explore','eye','fat','father','ferocious','fever','fire','fish','flower','fly','fool','for','for','for','from','from','ghost','girl','give','glass','go','go','god','good','grass','green','growl','hard','has','haunt','have','he','he','heal','heart','her','her','here','him','his','hole','home','hot','how','I','I','I','I','I','ice','if','in','in','in','ing','ing','ing','ing','ing','ing','is','is','is','is','is','it','it','it','it','joy','kiss','laugh','less','let','lie','life','like','like','like','linger','lip','liquid','listen','live','long','look','ly','ly','magic','make','man','marble','may','me','me','melt','men','moist','more','morning','must','my','my','naked','need','never','night','no','no','not','not','o','ocean','of','of','of','of','old','on','on','one','only','open','or','our','out','over','peace','perfume','picture','pie','poetry','poison','porcelain','prisoner','put','r','r','red','remember','rhythm','s','s','s','s','s','s','s','s','sacred','sad','said','sail','salt','secret','see','self','sex','she','she','sister','sky','slow','smile','smoke','so','soft','some','son','star','steam','steel','surround','than','that','the','the','the','the','their','them','then','there','they','thing','this','this','those','though','throb','time','to','to','to','to','tree','two','universe','up','use','vast','velvet','voice','wake','warm','was','we','we','were','wet','when','which','who','wild','will','window','with','with','woman','women','word','work','would','y','y','y','yet','you','you','you','young']
 };

    function spawnMagnets(listName) {
        var numWords = 600;
        let magnets = [];
        for (i = 0; i < numWords; i++){
            magnets.push({
                word: getRandomWord(wordLists[listName]),
                x: getRandomCoord(1960),
                y: getRandomCoord(1960),
                id: i
            })
        }
        return magnets;
    }

    function getRandomCoord(pixels){
        return Math.floor(Math.random() * pixels) + 1;
    }

    function getRandomWordOb(wordList) {
        var winner = Math.random();
        var threshold = 0;
        for (let i = 0; i < wordList.length; i++) {
            threshold += parseFloat(wordList[i].prob);
            if (threshold > winner) {
                return wordList[i].word
    
            }
        }
    }

    function getRandomWord(wordList){
        return wordList[Math.floor(Math.random() * (wordList.length-1)) + 1];
    }


    // Public API definition
    return {
        spawnMagnets: spawnMagnets
    };
})();