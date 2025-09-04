# 📘 English জানালা — Learn Vocabularies Easily

An interactive **English learning web app** built with **HTML, TailwindCSS, DaisyUI, and JavaScript**, powered by the **Programming Hero Open API**.
It helps users learn new vocabularies by levels, view details, hear pronunciations, and even save words.

---

## 🔗 Live Demo

👉 [English জানালা on GitHub Pages](https://mdnurnabirana.github.io/English-Janala/)

---

## 🚀 Features

### 1. Levels & Lessons

* Dynamically fetch and display **all lesson levels** from the API.
* Highlight **active level buttons** so users can track progress.

### 2. Vocabulary Cards

* Show vocabulary words in a **card format** including:

  * Word
  * Meaning & Pronunciation
  * Buttons for **details** and **pronunciation**
* Handle missing data with fallback messages (Bangla + English).

### 3. Vocabulary Details Modal

* Open a **modal** with detailed information (from API):

  * Word with pronunciation
  * Example sentence
  * Synonyms (or fallback text if none found)
  * "Close" button

### 4. Pronunciation

* Click the **🔊 volume icon** to hear the word using **Web Speech API**.
* Default language: `en-US` (changeable).

### 5. Search Functionality

* Search any word from **all words API**.
* Resets active lesson when searching.

### 6. Loading Spinner

* Beautiful spinner shown while fetching words.

### 7. Error & Empty State Handling

* Shows **no word found** UI for invalid/empty lessons.
* Prevents UI break when `null` or `undefined` values come from API.

---

## ⚡ API Endpoints

| Endpoint                                                                                                   | Description           |
| ---------------------------------------------------------------------------------------------------------- | --------------------- |
| [https://openapi.programming-hero.com/api/levels/all](https://openapi.programming-hero.com/api/levels/all) | Get all levels        |
| [https://openapi.programming-hero.com/api/level/{id}](https://openapi.programming-hero.com/api/level/{id}) | Get words by level    |
| [https://openapi.programming-hero.com/api/word/{id}](https://openapi.programming-hero.com/api/word/{id})   | Get details of a word |
| [https://openapi.programming-hero.com/api/words/all](https://openapi.programming-hero.com/api/words/all)   | Get all words         |

Example:

[https://openapi.programming-hero.com/api/level/5](https://openapi.programming-hero.com/api/level/5)
[https://openapi.programming-hero.com/api/word/10](https://openapi.programming-hero.com/api/word/10)

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, TailwindCSS, DaisyUI
* **Icons:** FontAwesome
* **Fonts:** Google Fonts (Poppins, Hind Siliguri)
* **Logic:** Vanilla JavaScript (ES6+)
* **API:** Programming Hero Open API
* **Speech:** Web Speech API (`speechSynthesis`)

---

## 📂 Project Structure

```
├── index.html        # Main HTML file
├── styles.css        # Custom styles
├── scripts/
│   └── index.js      # All JavaScript functionality
├── assets/           # Images & logos
└── README.md         # Project documentation
```

---

## 🎯 Future Improvements

* [ ] Add **user authentication** (save progress).
* [ ] Save favorite words with a **heart button**.
* [ ] Make it a **PWA (offline support)**.
* [ ] Support **Bangla pronunciation**.

---

## 💻 Getting Started

Clone the repository and run it locally:

```
git clone https://github.com/mdnurnabirana/english-janala.git
cd english-janala
```

Then open `index.html` in your browser 🚀