var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","as","at","be","because","been","before","being","below","between","both","but","by","could","did","do","does","doing","down","during","each","feel","feeling","few","for","from","further","had","has","have","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","it","it's","its","itself","let","let's","me","more","most","much","my","myself","nor","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","we","we'd","we'll","we're","we've","were","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","would","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

function analyze_it() {

    var input = document.getElementById('textArea').value;
    var inputmod = input.toLowerCase().replace(/[^'a-zA-Z ]+/g, ' ').replace('/ {2,}/', ' ');
    var disp = document.getElementById('disp');
    var scorediv = document.getElementById('score');
    var finalwords = [];
    var flag = 0;
    var sentimood = new Sentimood();
    var analysis = sentimood.analyze(inputmod);
    console.log("Score: "+analysis.score);
    console.log(analysis);

    finalwords = analysis.positive.words.concat(analysis.negative.words);
    console.log("Sentimental words: "+finalwords);

    var contents = inputmod.split(" ");
    var modText = '';
    var modScore = '';

    for (var i = 0; i < contents.length; i++) {
        if(finalwords.indexOf(contents[i]) === -1) {
            if(stopwords.indexOf(contents[i]) === -1) {
                modText += '<span>' + contents[i] + '</span> ';
            } else {
                modText += '<span class="stop">' + contents[i] + '</span> ';
            }

        } else {
            if(analysis.negative.words.indexOf(contents[i]) === -1) {
                modText += '<span class="strongpos">' + contents[i] + '</span> ';
            } else if(analysis.positive.words.indexOf(contents[i]) === -1) {
                modText += '<span class="strongneg">' + contents[i] + '</span> ';
            }
        }
    }
    if(analysis.score >= 4) {
        modScore = '<span class="strongpos"> Score: ' + analysis.score + String.fromCodePoint(0x1F603) + '</span> ';
    } else if(analysis.score > 0 && analysis.score < 4) {
        modScore += '<span class="pos"> Score: ' + analysis.score + String.fromCodePoint(0x1F642) + '</span> ';
    } else if(analysis.score < 0 && analysis.score > -4) {
        modScore += '<span class="neg"> Score: ' + analysis.score + String.fromCodePoint(0x1F641) + '</span> ';
    } else if(analysis.score <= -4) {
        modScore += '<span class="strongneg"> Score: ' + analysis.score + String.fromCodePoint(0x1F626) + '</span> ';
    } else {
        modScore += '<span> Score: ' + analysis.score + String.fromCodePoint(0x1F610) + '</span> ';
    }
    disp.innerHTML += modText+"<br/>";
    disp.scrollTop = disp.scrollHeight;
    scorediv.innerHTML = modScore;
}