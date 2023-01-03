// get Input

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click',()=>{
    const wordInp = document.getElementById("wordInp");
    const word = wordInp.value;
    wordInp.value = "";
    fetchWordData(word);
})

const getPhoticsSource = (obj) =>{
    for (let i = 0; i < obj.length; i++) {
        const {audio} = obj[i];
        if(audio){
            return audio;
        }
    }
}


const outPutArea = document.getElementById("output-area");
const fetchWordData = (word) =>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
        console.log(data[0]);
        const mainObj = data[0];
        console.log(mainObj.phonetics);
        outPutArea.innerHTML = `
        <h4>Word :  <span>${mainObj.word}</span></h4>
        <h4 >Phonetic :  <span>${mainObj.phonetic}</span></h4>
        <audio class="audio" src="${getPhoticsSource(mainObj.phonetics)}" controls type="audio/mp3"></audio>
        <h4>Definitions : </h4>
        <div id="defiUl">
            <ul id="addDefinitions"></ul>
        </div>
        <h4>Example: <span>Our second goal of the match! Yes!</span></h4>
        `;
        addDefinitions("addDefinitions",mainObj.meanings);
    });
}


const addDefinitions = (id,defiObj) =>{
    const addDefinitions = document.getElementById("addDefinitions");
    console.log(defiObj);
    for (let i = 0; i < defiObj.length; i++) {
        const definitionsArr = defiObj[i];
        const arr = definitionsArr.definitions;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            const {definition} = element;
            const li = document.createElement('li');
            li.innerText = definition;
            addDefinitions.appendChild(li);
        }
    }
}