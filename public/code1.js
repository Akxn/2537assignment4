hasFlippedCard = false;
lockboard = false;
firstCard = undefined;
secondCard = undefined;
pairsfound = 0;

function gamelogic() {

    // loadCards();
    $(".card").on("click", function () {
        if(lockboard) return;
        if(this == firstCard) return;
        if(!this.classList.contains("flip")){
        $(this).toggleClass("flip")

        if (!hasFlippedCard) {
            firstCard = $(this).find('.front_face')[0]
            hasFlippedCard = true;
        } else {
            // 2nd card
            secondCard = $(this).find('.front_face')[0]
            console.log(firstCard, secondCard);
            hasFlippedCard = false;
            checkForMatch();
        }
}})

function checkForMatch() {
    if ($(`#${firstCard.id}`).attr("src") ==
        $(`#${secondCard.id}`).attr("src")) {
        console.log("A Match!");
        pairsFound++;
        disableCards();

    } else {
        console.log("not a Match!");
        unflipCards();
    }
}

function resetboard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondcard] = [null, null];
}

function disableCards() {
    $(`#${firstCard.id}`).parent().off("click")
    $(`#${secondCard.id}`).parent().off("click")
    resetboard();
}

function unflipCards() {
    lockboard = true;
    setTimeout(() => {
        $(`#${firstCard.id}`).parent().removeClass("flip")
        $(`#${secondCard.id}`).parent().removeClass("flip")
        resetboard();
    }, 1000);
}
}

$(document).ready(gamelogic);