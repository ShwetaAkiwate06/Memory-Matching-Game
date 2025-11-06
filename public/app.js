const symbols = ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍪', '🍫'];
const cardsbl = [...symbols, ...symbols];
let boxes = document.querySelectorAll(".cell");

// Initialize game board
function initializeGame() {
    // Create a copy and shuffle
    const shuffledCards = [...cardsbl];
    for (let i = 0; i < 16; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        console.log(i,shuffledCards[i],j,shuffledCards[j]);
    }
    for (let i = 0; i < 16; i++) {
        console.log(i,shuffledCards[i]);
    }
    boxes.forEach((box, i) => {
        box.setAttribute("boxnum", shuffledCards[i]);
        box.innerHTML = "";
        box.classList.remove("flipped");
        box.disabled = false;
    });
}

// Fetch best score from backend
async function fetchBestScore() {
    try {
        const res = await fetch('/api/scores');
        if (!res.ok) throw new Error('Failed to fetch scores');
        const topScores = await res.json();
        const best = topScores.length ? Math.min(...topScores.map(score => score.moves)) : '--';
        return best;
    } catch (err) {
        console.error('Error fetching best score:', err);
        return '--';
    }
}

// Update best score display
async function updateBestScoreDisplay() {
    const bestScore = await fetchBestScore();
    const bestScoreElement = document.querySelector(".best");
    if (bestScoreElement) {
        bestScoreElement.innerHTML = `Best: ${bestScore}`;
    }
    return bestScore;
}

function disableBoxes() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

function enableBoxes() {
    boxes.forEach((box) => {
        // Only enable boxes that haven't been matched
        if (!box.classList.contains('matched')) {
            box.disabled = false;
        }
    });
}

let clicks = [];
let boxval = [];
let moves = 0;
let matchedpairs = 0;

// Initialize game
initializeGame();

boxes.forEach((box, index) => {
    box.setAttribute("num", index);
    box.addEventListener("click", async () => {
        // Prevent clicking on already matched or flipped cards
        if (box.classList.contains("flipped") || box.classList.contains("matched")) {
            return;
        }

        box.classList.add("flipped");
        setTimeout(() => {
            box.innerText = box.getAttribute("boxnum");
        }, 200);

        let symbol = box.getAttribute("boxnum");
        let boxIndex = parseInt(box.getAttribute("num"));
        
        clicks.push(symbol);
        boxval.push(boxIndex);

        // Prevent comparing the same card twice
        if (boxval[0] === boxval[1]) {
            clicks.pop();
            boxval.pop();
            return;
        }

        if (clicks.length === 2) {
            moves++;
            document.querySelector(".msg").innerHTML = `Moves: ${moves}`;

            if (clicks[0] === clicks[1]) {
                // Match found
                boxes[boxval[0]].classList.add("matched");
                boxes[boxval[1]].classList.add("matched");
                matchedpairs++;

                clicks = [];
                boxval = [];
                enableBoxes();
            } else {
                // No match
                disableBoxes();
                setTimeout(() => {
                    boxes[boxval[0]].innerHTML = "";
                    boxes[boxval[1]].innerHTML = "";
                    boxes[boxval[0]].classList.remove("flipped");
                    boxes[boxval[1]].classList.remove("flipped");

                    clicks = [];
                    boxval = [];
                    enableBoxes();
                }, 1000);
            }

            // Check for game completion
            if (matchedpairs === 8) {
                setTimeout(async () => {
                    try {
                        // Save score to backend
                        const response = await fetch('/api/score', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: 'Guest', moves: moves })
                        });

                        if (!response.ok) throw new Error('Failed to save score');

                        console.log('Score saved successfully');
                        
                        // Get updated best score
                        const updatedBest = await updateBestScoreDisplay();
                        
                        // Show win message
                        document.getElementById("congo").classList.remove("hide");
                        let message = `Congratulations!! You Finished the Game in ${moves} Moves.<br>Best: ${updatedBest}.`;
                        
                        // Check if it's a new record (handle both number and string cases)
                        if (updatedBest !== '--' && moves < parseInt(updatedBest)) {
                            message += `<br><span class="new-record">🎉 New Record!</span>`;
                        }
                        
                        document.getElementsByClassName("win")[0].innerHTML = message;
                    } catch (err) {
                        console.error('Error saving score:', err);
                        // Fallback: still show congratulations even if save fails
                        document.getElementById("congo").classList.remove("hide");
                        document.getElementsByClassName("win")[0].innerHTML = 
                            `Congratulations!! You Finished the Game in ${moves} Moves.<br>Error saving score.`;
                    }
                }, 500);
            }
        }
    });
});

// Initialize on page load
window.onload = async () => {
    await updateBestScoreDisplay();
};

function reset() {
    initializeGame();
    clicks = [];
    boxval = [];
    moves = 0;
    matchedpairs = 0;
    
    // Remove matched class from all boxes
    boxes.forEach(box => {
        box.classList.remove("matched");
    });
    
    const congoElement = document.getElementById("congo");
    if (congoElement) {
        congoElement.classList.add("hide");
    }
    
    const winElement = document.getElementsByClassName("win")[0];
    if (winElement) {
        winElement.innerHTML = "";
    }
    
    document.querySelector(".msg").innerHTML = `Moves: ${moves}`;
    enableBoxes();
    updateBestScoreDisplay();

}

async function resetbestscore() {
    const confirmReset = confirm("Are you sure you want to clear all scores? This action cannot be undone.");
    if (!confirmReset) return;

    try {
        const response = await fetch('/api/scores', {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to clear scores');
        
        await updateBestScoreDisplay();
        
        const resetButton = document.querySelector(".rebest");
        if (resetButton) {
            resetButton.innerText = "Cleared!";
            setTimeout(() => {
                resetButton.innerText = "Clear Best";
            }, 1500);
        }
    } catch (err) {
        console.error('Error clearing scores:', err);
        alert('Failed to clear scores');
    }
}