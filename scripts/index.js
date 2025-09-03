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
                <button onclick="my_modal_5.showModal()" class="bg-[#1A91FF10] px-4 py-3 rounded-lg hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="bg-[#1A91FF10] px-4 py-3 rounded-lg hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        wordContainer.append(card);
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

loadLessons();