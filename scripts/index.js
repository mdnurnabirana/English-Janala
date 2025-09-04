const createElements = (arr) => {
    if (!arr || arr.length === 0) {
        return `<span class="btn">No synonym found</span>`;
    }
    const htmlElmts = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElmts.join(" ");
}

const manageLoader = (status) => {
    if(status){
        document.getElementById("loader").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden")
    } else {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden")
    }   
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    manageLoader(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then((res) => res.json()).then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    });
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""
    if (words.length == 0) {
        wordContainer.innerHTML = `
                <div class="text-cente bg-sky-100 col-span-full rounded-xl py-10 space-y-6">
                    <img class="mx-auto" src="./assets/alert-error.png"/>
                    <p class="font-medium text-xl text-gray-600 text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="font-bold text-center text-black text-3xl">নেক্সট Lesson এ যান</h2>
                </div>
            `
        manageLoader(false)
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center p-5 h-full">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium text-xl mt-3">Meaning / Pronunciation</p>
            <h3 class="font-hind font-semibold text-[#374957] text-2xl mt-4">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</h3>
            <div class="flex justify-between mt-12">
                <button onclick="loadWordDetail(${word.id})" class="bg-[#1A91FF10] px-4 py-3 rounded-lg hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="bg-[#1A91FF10] px-4 py-3 rounded-lg hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        wordContainer.append(card);
        manageLoader(false);
    });
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" href="" onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    }
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (detail) => {
    const detailModal = document.getElementById("word-detail-container");
    detailModal.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">${detail.word} (<i class="fa-solid fa-microphone-lines"></i>:    ${detail.pronunciation})</h2>
        </div>
        <div>
            <h2 class="text-xl font-bold">Meaning</h2>
            <p>${detail.meaning}</p>
        </div>
        <div>
            <h2 class="text-xl font-bold">Example</h2>
            <p>${detail.sentence}</p>
        </div>
        <div>
            <h2 class="text-xl font-bold">সমার্থক শব্দগুলো</h2>
            <div class="mt-2">
                ${createElements(detail.synonyms)}
            </div>
        </div>
    `;

    document.getElementById("word_modal").showModal();
}

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    if (!searchValue) return;

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    })
})