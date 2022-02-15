async function getKata() {
    
    const api = "./kata.json";
    const data = await fetch(api);
    const json = await data.json();
    
    let katas = json;
    
    console.log(katas);
    
    let sortedWrapper = document.querySelector('#sortedWrapper');
    let availableKyu = new Set(katas.map(el => el.kata_kyu)).forEach(kyu => {
        let div = document.createElement('div')
        div.classList.add('col-12', 'mb-3', 'd-flex', 'justify-content-center')
        div.innerHTML = `
        <button class="btn btn-sort" data-kyu="${kyu}">🤓 kata nivel ${kyu} kyu</button>
        `
        sortedWrapper.appendChild(div)
    })

    let sortByAll = document.querySelector('#sortByAll')
    sortByAll.addEventListener('click', () => {
      showKata(katas)
    })

    let searchByKata = document.querySelector('#searchByKata');
    searchByKata.addEventListener('keyup', (e) => {
      let valueInput = e.target.value
      let filterBytitle = katas.filter(el => el.kata_title.toLowerCase().match(valueInput))
      console.log(filterBytitle);
      showKata(filterBytitle)
    })
    

    let kyu = document.querySelectorAll('[data-kyu]').forEach(btn => {
      btn.addEventListener('click', ()=> {
        let filteredKata = katas.filter(kata => kata.kata_kyu == btn.getAttribute('data-kyu'))
        showKata(filteredKata);
      })
    })



   
    

    
    
    let kataWrapper = document.querySelector('#kataWrapper');
    function showKata(kata) {
        kataWrapper.innerHTML = "";
        let allKata = kata.forEach(el => {
            let elementKata = document.createElement('div')
            elementKata.classList.add('col-12', 'col-md-4', 'mb-3', 'd-flex', 'justify-content-center')
            elementKata.innerHTML = `
                <div class="card">
                  <div class="card-body d-flex flex-column justify-content-around">
                  <img src="./logo.png" width="50" class="d-block mx-auto" alt="">
                  <div>
                    <p class="card-title">⚔️ ${el.kata_title}</p>
                    <h6 class="card-subtitle mb-2">🔥 ${el.kata_kyu} kyu</h6>
                    <p class="card-text" style="font-size:11px;">📒 ${el.kata_topics}</p>
                  </div>
                  <div class=" d-block mx-auto ">
                    <a href="${el.kata_link}" class="btn-kata">🚀 ENTRENA</a>
                  </div>
                 </div>
                </div>
            
            `
            
            kataWrapper.appendChild(elementKata);
            
        })
        
        
    }
    
    
    showKata(katas);
    
}

getKata()