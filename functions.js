const getData = async (url) => {
    const res = await fetch(url);
    return res.json();
};


const renderCardFromFive = (data, url, container) => {
    const colCard = document.createElement("div");
    colCard.classList = "colCard col-md-3 p-1 m-4";
    const card = document.createElement("div");
    card.classList = "card bg-body opacity-50 p-2";
    card.innerHTML = `
    <img src="${data[0].flags.png}" alt="${data[0].flags.alt}" class="imgFiveFlags m-3"/>
    <h3 class="text-body text-center">${data[0].name.common}</h3>`;
    const btnInfo = document.createElement("button");
    btnInfo.classList = "moreInfoBtns rounded-1 m-2";
    btnInfo.innerHTML = "To more information";
    btnInfo.dataset.name = data[0].name.common;
    btnInfo.addEventListener("click", () => {
        oneCountry(`${url}/name/${btnInfo.dataset.name}`, url, container)
    })
    card.appendChild(btnInfo);
    colCard.appendChild(card);
    container.appendChild(colCard)
}


const fiveCountries = async (url, container, countriesAtHome) => {
    container.innerHTML = ``;
    try {
        countriesAtHome.map(async element => {
            const data = await getData(`${url}/name/${element}`);
            renderCardFromFive(data, url, container);
        })
    } catch (error) {
        console.log(error);
    }

}


const renderCardOfCountry = (res, url, container) => {
    const countrySize = res[0].area;
    const constantValue = 14;
    const zoomLevel = Math.max(0, Math.round(constantValue - 0.468 * Math.log2(countrySize)));
    const card = document.createElement("div");
    card.classList = "bg-body opacity-50 rounded-1 m-5 p-4";
    const headOfCard = document.createElement("div");
    headOfCard.classList = "d-flex align-items-center";
    headOfCard.innerHTML = `
        <img src="${res[0].flags.png}" alt="${res[0].flags.alt}" class="imgFiveFlags m-3" width="200px"/>
        <div>
            <h3 class="text-center">${res[0].name.common}</h3>
            <h5 class="text-center">POP: ${res[0].population}</h5>
            <h5 class="text-center">region: ${res[0].region}</h5>
            <h5 class="text-center">capital: ${res[0].capital}</h5>
            <h5 class="text-center">languages: ${Object.keys(res[0].languages)}</h5>
        </div>`;
    card.appendChild(headOfCard);
    const bottomOfCard = document.createElement("div");
    card.appendChild(bottomOfCard);
    bottomOfCard.innerHTML += `
        <iframe width="100%" height="70%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${res[0].latlng[0]},${res[0].latlng[1]}&hl=es&z=${zoomLevel}&amp;output=embed">
        </iframe>
        <h5 class="text-center">States with borders:</h5>`;
    if (res[0].borders != null) {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${res[0].borders}&fields=name`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    const border = document.createElement("h6");
                    border.classList = "myBorders text-center";
                    border.innerHTML = res[i].name.common;
                    border.addEventListener("click", () => {
                        oneCountry(`${url}/name/${res[i].name.common}`, url, container)
                    })
                    bottomOfCard.appendChild(border)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        bottomOfCard.innerHTML += `
        <h6 class="text-center">There is no borders</h6>`;
    }
    container.innerHTML = ``;
    container.appendChild(card);
}


const oneCountry = async (myUrl, url, container) => {
    try {
        const res = await getData(myUrl);
        if (res.status !== 404)
            renderCardOfCountry(res, url, container);
        else
            throw res.message;
    } catch (err) {
        return err;
    }

}


export { fiveCountries, oneCountry }
