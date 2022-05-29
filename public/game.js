i = 0
k = 0
to_add = ''

function processPokeResp(data) {
    to_add += `
    <div class="card" onclick="setup1()">
        <img id="img${loop}" class="front_face" src="${data.sprites.other["official-artwork"].front_default}" alt="">
        <img  class="back_face" src="../images/back.png" alt="">
    </div>`
}

pokemonnumber = 'max'
list = []
function listnumber() {
    numreq = i * k / 2
    number = 0
    if (pokemonnumber = 'max') {
        number = numreq
    } else {
        nubmer = parseInt(pokemonnumber);
    }

    for (o = 1; o <= number; o++) {
        randomnumber = Math.floor(Math.random() * 898)
        listnumber.push(randomnumber);
    }
    repcardnum = numreq - number
    if (repcardnum > 0) {
        for (o = 1; o <= repcardnum; 0++) {
            list.push(list[Math.floor(Math.random() * number)])
        }
    }

    for (o = 0; o < numreq; o++) {
        list.push(list[o])
    }
}

function shuffle(list1) {
    var array= list1;
    var z = array.length;
    t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}