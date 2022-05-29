a = 0;
b = 0;
to_add = '';
grid = 'low';
level = 'easy';
sel_add = '';
total = 0;
loop = 0;
result = '';
counter = 1;
length = 0;
width = 0;
randomnumber = 0;
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
    numreq = a * b / 2
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
        for (o = 1; o <= repcardnum; o++) {
            list.push(list[Math.floor(Math.random() * number)])
        }
    }

    for (o = 0; o < numreq; o++) {
        list.push(list[o])
    }
}

function shuffle(list1) {
    var array = list1;
    var l = array.length,
        j, k;
    while (l) {
        j = Math.floor(Math.random() * l--);
        k = array[l]
        array[l] = array[j];
        array[j] = k;
    }
    return array;
}

async function loadcards() {
    total = a * b;
    loop = 0;
    list = [];
    listnumber();
    array = shuffle(list);
    for (i = 1; i <= total; i++) {
        loop = i
        if (i == 1) {
            to_add += `<div id="game_grid">`
        }
        if (i % b == 1) {
            to_add += `<div class="ggrid">`
        }
        await $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${array[i - 1]}`,
            success: processPokeResp
        })
        console.log(i);

        if (i % b == 0) {
            to_add += `</div>`
        }
        if (i == total) {
            to_add += `</div">`
        }
        console.log(i);
    }

    jQuery("main").html(to_add)
}

function setgame() {
    $.ajax({
        url: `http://localhost:5000/game/insert/${grid}/${level}/${pokemonnum}/${result}/${formatted}`,
        type: "put",
        success: (res) => {
            console.log(res)
        }
    })
}

function display(type_) {
    $("main").empty();
    to_add = ''
    if (type_ == "low") {
        a = 2;
        b = 2;
        loadcards();
    } else if (type_ == "medium") {
        a, b = 4;
        loadcards();
    } else {
        a = 6;
        b = 6;
        loadcards();
    }
}
time = 30;
function settime() {
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "Lose";
            result = "Lose"
            setgame();
        } else {
            document.getElementById("timer").innerHTML = timeleft;
        }

        if ((pairsFound * 2 == list.length) && timeleft > 0 && counter == 1) {
            document.getElementById("timer").innerHTML = "Win"
            result = "Win"
            counter++
            setgame()
            clearInterval(downloadTimer)

        } else {
            timeleft -= 1;
        }

    }, 1000);
}

function gamestart() {
    var now = new Date(Date.now());
    var format = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    formatted = format
    counter = 1
    $("#timer").empty()
    timeleft = time
    pairsFound = 0

    display(grid)
    settime(timeleft)
}

function display1(data) {
    if (data == 'low') {
        $("#pokenum_type").empty()
        sel_add = ''
        sel_add += `
            <option value="max">max</option>
            <option value="2">2</option>
            <option value="3">3</option>
        `
        jQuery("#pokenum_type").html(sel_add)
    } else if (data == 'mid') {
        $("#pokenum_type").empty()
        sel_add = ''
        sel_add += `
            <option value="max">max</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        `
        jQuery("#pokenum_type").html(sel_add)
    } else {
        $("#pokenum_type").empty()
        sel_add = ''
        sel_add += `
            <option value="max">max</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
        `
        jQuery("#pokenum_type").html(sel_add)
    }
}

function display2() {
    if (grid == 'low' && level == 'easy') {
        time = 30
    } else if (grid == 'low' && level == 'medium') {
        time = 20
    } else if (grid == 'low' && level == 'hard') {
        time = 10
    } else if (grid == 'mid' && level == 'easy') {
        time = 40
    } else if (grid == 'mid' && level == 'medium') {
        time = 30
    } else if (grid == 'mid' && level == 'hard') {
        time = 20
    } else if (grid == 'high' && level == 'easy') {
        time = 60
    } else if (grid == 'high' && level == 'medium') {
        time = 45
    } else {
        time = 30
    }
}

function setup() {
    $("#grid_type").change(() => {
        grid = $("#grid_type option:selected").val();

        display1(grid)
        display2()
    })

    $("#level_type").change(() => {
        level = $("#level_type option:selected").val();
        display2()
    })


    $("#pokenum_type").change(() => {
        pokenum = $("#pokenum_type option:selected").val();
    })
}

$(document).ready(setup)