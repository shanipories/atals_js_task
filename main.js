import { fiveCountries, oneCountry } from "./functions.js";

const url = 'https://restcountries.com/v3.1';

const container = document.querySelector(".container");

const countriesAtHome = [
    "USA",
    "ISRAEL",
    "FRANCE",
    "THAILAND",
    "UK"
];

fiveCountries(url, container, countriesAtHome);

const brand = document.getElementById("brand");
brand.addEventListener("click", () => {
    fiveCountries(url, container, countriesAtHome)
});

const links = document.querySelectorAll(".linkToCountry");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
        oneCountry(`${url}/name/${links[i].text}`, url, container)
    })
}

const searchBtn = document.getElementById("searchBtn");
const searchCountry = document.getElementById("searchCountry");

searchBtn.addEventListener("click", () => {
    if (oneCountry(`${url}/name/${searchCountry.value}?fullText=true`, url, container) != null) {
        container.innerHTML = ``;
        container.innerHTML = `
            <div class="bg-body opacity-50 rounded-1 m-5 p-4">
            <h3 class="m-3">Sorry, We didn't find the country</h3>
            </div>`;
    }
    searchCountry.value = "";
});

const dropdownCountries = document.querySelector(".dropdown-menu");
dropdownCountries.innerHTML = ``;

const countriesDropdown = axios.get(`https://restcountries.com/v3.1/all?fields=name`)
countriesDropdown.then((res) => {
    res.data.map(element => {
        const country = document.createElement("li")
        country.classList = "fromDropToInfo";
        country.innerHTML = element.name.common;
        country.addEventListener("click", () => {
            oneCountry(`${url}/name/${element.name.common}`, url, container)
        });
        dropdownCountries.appendChild(country)
    })
});

