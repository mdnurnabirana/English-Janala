const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
}   

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then((res) => res.json()).then(data => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML=""

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center p-5 h-full">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-medium text-xl mt-3">Meaning / Pronunciation</p>
            <h3 class="font-hind font-semibold text-[#374957] text-2xl mt-4">${word.meaning} / ${word.pronunciation}</h3>
            <div class="flex justify-between mt-12">
                <button class="bg-[#1A91FF10] px-4 py-3 rounded-lg hover:bg-[#1A91FF80]">
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

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button href="" onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    }
}

loadLessons();