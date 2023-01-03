// get Input

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', () => {
    const wordInp = document.getElementById("wordInp");
    const word = wordInp.value;
    wordInp.value = "";
    fetchWordData(word);
})

const getPhoticsSource = (obj) => {
    for (let i = 0; i < obj.length; i++) {
        const { audio } = obj[i];
        if (audio) {
            return audio;
        }
    }
}


const outPutArea = document.getElementById("output-area");
const fetchWordData = (word) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            const mainObj = data[0];
            outPutArea.innerHTML = `
        <h4>Word :  <span>${mainObj.word}</span></h4>
        <h4 >Phonetic :  <span>${mainObj.phonetic ? mainObj.phonetic : "not available"}</span></h4>
        <audio class="audio" src="${getPhoticsSource(mainObj.phonetics)}" controls type="audio/mp3"></audio>
        <h4>Definitions : </h4>
        <div id="defiUl">
            <ul id="addDefinitions"></ul>
        </div>
        <h4>Example: </h4>
        <div>
            <ul id="addExamples"></ul>
        </div>
        `;
            addDefinitions("addDefinitions", mainObj.meanings);
            addExamples("addExamples", mainObj.meanings);
        });
}


const addDefinitions = (id, defiObj) => {
    let cnt = 0;
    const addDefinitions = document.getElementById(id);
    for (let i = 0; i < defiObj.length; i++) {
        const definitionsArr = defiObj[i];
        const arr = definitionsArr.definitions;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            const { definition } = element;
            if (definition) {
                const li = document.createElement('li');
                li.innerText = definition;
                addDefinitions.appendChild(li);
                cnt++;
            }
            if (cnt === 10) {
                return;
            }
        }
    }

}
const addExamples = (id, defiObj) => {
    let cnt = 0;
    const addDefinitions = document.getElementById(id);
    for (let i = 0; i < defiObj.length; i++) {
        const definitionsArr = defiObj[i];
        const arr = definitionsArr.definitions;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            const { example } = element;
            if (example) {
                const li = document.createElement('li');
                li.innerText = example;
                addDefinitions.appendChild(li);
                cnt++;
            }
            if (cnt === 10) {
                return;
            }
        }
    }
}