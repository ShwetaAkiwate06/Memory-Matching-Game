# 🧠 Memory Matching Game

A full-stack **Memory Matching Game** built using **HTML, CSS, and JavaScript** on the frontend and **Node.js + Express + MongoDB** on the backend to store and manage player scores.

Players flip cards to find matching pairs while the system tracks moves and stores high scores persistently.

---

## 🚀 Features

- 🃏 Interactive card-flipping gameplay  
- 📊 Move counter and best score tracking  
- 💾 Persistent score storage using MongoDB  
- 🔌 REST API built with Express.js  
- 🔄 Reset and clear best score functionality  
- 📱 Responsive and clean UI  

---

## 🛠 Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Frontend  | HTML, CSS, JavaScript |
| Backend   | Node.js, Express.js   |
| Database  | MongoDB (Mongoose)    |
| Dev Tools | Nodemon               |

---

## 📂 Project Structure

```text
Memory_Matching_Game/
├── models/
│ └── Score.js
├── routes/
│ └── scoreRoutes.js
├── public/
│ ├── index.html
│ ├── style.css
│ └── app.js
├── server.js
├── package.json
└── README.md
```
---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ShwetaAkiwate06/Memory-Matching-Game.git
   cd Memory-Matching-Game
   ```
   
2. Install dependencies:
   ```bash
    npm install
    ```

3. Start the server:
   ```bash
   nodemon server.js
   ```
4. Start MongoDB (if using local MongoDB):
   ```bash
   mongod
   ````
5. Open in browser:
   ```bash
   http://localhost:3000
   ```
---

## 🧩 How to Play

- Click two cards to flip them.
- If they match, they stay open.
- If they don’t, they flip back.
- Match all pairs in the minimum number of moves.

---

## 👩‍💻 Author
Shweta Akiwate
