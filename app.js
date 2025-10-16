const symbols = ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍪', '🍫'];
const cardsbl = [...symbols, ...symbols];
let boxes = document.querySelectorAll(".cell");
for (let i = 0; i < 16; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardsbl[i], cardsbl[j]] = [cardsbl[j], cardsbl[i]];
}
boxes.forEach((box, i) => {
    box.setAttribute("boxnum", cardsbl[i]);
})

function disable() {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}
function enable() {
    boxes.forEach((box) => {
        box.disabled = false;
    })
}

let clicks = [];
let boxval = [];
let moves = 0;
let matchedpairs = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.classList.add("flipped");
        setTimeout(() => {
            box.innerText = box.getAttribute("boxnum");
        }, 200);


        let a = box.getAttribute("boxnum");
        clicks.push(a);
        let bval = parseInt(box.getAttribute("num"));
        boxval.push(bval);
        if (boxval[0] === boxval[1]) {
            clicks = [];
            boxval = [];
            return;
        }
        if (clicks.length == 2) {
            if (clicks[0] == clicks[1]) {
                boxes[boxval[0]].disabled = true;
                boxes[boxval[1]].disabled = true;

                clicks = [];
                boxval = [];
                moves++;
                matchedpairs++;
            }
            else {
                disable();
                setTimeout(() => {
                    boxes[boxval[0]].innerHTML = "";
                    boxes[boxval[1]].innerHTML = "";
                    boxes[boxval[0]].disabled = true;
                    boxes[boxval[1]].disabled = true;
                    boxes[boxval[0]].classList.remove("flipped");
                    boxes[boxval[1]].classList.remove("flipped");

                    clicks = [];
                    boxval = [];
                    enable();
                }, 1200);

                moves++;
            }
        }
        document.querySelector(".msg").innerHTML = `Moves: ${moves}`;
        
        if (matchedpairs == 8) {
            let newRecord = false;
            const bestScore = parseInt(localStorage.getItem('bestScore')) || Infinity; //here infinity is not enclosed int the brackets beacuse This ensures that if there’s no stored score, it defaults to Infinity as a number, not a string.
            if (moves < bestScore) {
                localStorage.setItem('bestScore', moves);
                newRecord = true;
            }
            document.querySelector(".best").innerHTML = `Best: ${localStorage.getItem('bestScore')}`;

            document.getElementById("congo").classList.remove("hide");
            const updatedBest = localStorage.getItem('bestScore');

            let message = `Congratulations!! You Finished the Game in ${moves} Moves.<br> Best: ${updatedBest}.`
            if (newRecord) {
                message += `<br><span class="new-record">🎉 New Record!</span>`;
            }
            document.getElementsByClassName("win")[0].innerHTML = message;
        }

    })
})
function reset() {

    for (let i = 0; i < 16; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardsbl[i], cardsbl[j]] = [cardsbl[j], cardsbl[i]];
    }
    boxes.forEach((box, i) => {
        box.setAttribute("boxnum", cardsbl[i]);
        box.innerHTML = "";
        box.classList.remove("flipped");
        box.disabled = false;
    });
    clicks = [];
    boxval = [];
    moves = 0;
    matchedpairs = 0;
    document.getElementById("congo").classList.add("hide");
    document.getElementsByClassName("win")[0].innerHTML = "";
    document.querySelector(".msg").innerHTML = `Moves: ${moves}`;
    enable();
}
window.onload = () => {

    document.querySelector(".best").innerHTML = `Best: ${localStorage.getItem("bestScore") || "--"}`;
};
function resetbestscore() {
    const confirmReset = confirm("Are you sure you want to clear your Best Score? This action cannot be undone.");
    if (!confirmReset) return; // cancel if user clicks 'No'

    localStorage.removeItem('bestScore');
    document.querySelector(".best").innerHTML = `Best: --`;

    // Optional visual feedback
    document.querySelector(".rebest").innerText = "Cleared!";
    setTimeout(() => {
        document.querySelector(".rebest").innerText = "Clear Best";
    }, 1500);
}

    
