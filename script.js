async function getWord(url) {
    let response = await fetch(url)
    return await response.json()
}

let search = document.querySelector(".search")
let inputBox = document.querySelector(".inputBox")
search.addEventListener("click",()=>{
    const data = getWord(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputBox.value}`)
    inputBox.value = ""
    data
    .then(resp=>{addElements(resp)})
    .catch(err=>{console.log(err)})
})


function addElements(data){
    let dataCont = document.querySelectorAll(".data") 
    //The word
    dataCont[0].innerHTML = `<h1>${data[0]['word'].toUpperCase()}<h1><hr>` 
    //The meanings
    dataCont[1].innerHTML = `<h3>Meaning</h3>`
    for(const i of data[0]['meanings']){
        dataCont[1].innerHTML += `Part of Speech:${i["partOfSpeech"]}`
        for(const j of i["definitions"]){
            let n = document.createElement("div");
            n.classList.add("meaning");
            n.innerHTML = `<p>${j['definition']}</p>`
            dataCont[1].append(n)
        }
    }
    //Phonetics
    dataCont[2].innerHTML = `<h3>Phonetics</h3}`
    
    for(const i of data[0]['phonetics']){
        let aud = document.createElement("audio")
        dataCont[2].innerHTML += `<br>Phonetics:${i["text"]}`
        aud.src = i["audio"]
        aud.controls = true;
        aud.type = "audio/mp3"
        dataCont[2].append(aud)
    }
    dataCont[3].innerHTML = `<br><h3>Source URLS:</h3><a href=${data[0]['sourceUrls']}><p>${data[0]['sourceUrls']}</p></a>`
}