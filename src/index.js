// import './styles.css';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
}

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');


let arrId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrId
    });
    })
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};



// const refs = {
//   selectForm: document.querySelector(".breed-select"),
// loader: document.querySelector(".loader"),
// error: document.querySelector(".error"),
// catInfo: document.querySelector(".cat-info"),
// bodyJs: document.querySelector("body")
// }

// refs.error.setAttribute("hidden", true);
// refs.loader.setAttribute("hidden", true)
// refs.selectForm.addEventListener("change", renderCat)

// fetchBreeds()
// .then(response => {
//   refs.error.setAttribute("hidden", true);
//   const breeds = response.data;
//   const breedNames = breeds.map(breed => breed.name); 
//   createBreedsSelect(breedNames);

// })
// .catch(error => {refs.loader.setAttribute("hidden", true);
//       refs.error.removeAttribute("hidden");
//       refs.catInfo.innerHTML = " ";});


// function createBreedsSelect(breedNames) {
// const selectElement = refs.selectForm;

// breedNames.forEach(breedName => {
//   const optionElement = document.createElement('option');
//   optionElement.value = breedName;
//   optionElement.textContent = breedName;
//   selectElement.appendChild(optionElement);
// });
// }
// function renderCat(e) {
// e.preventDefault();
// refs.loader.removeAttribute("hidden");
// let catsBreedName = e.currentTarget.value;
// console.log(catsBreedName);

// let foundBreed = false; 

// fetchBreeds()
//   .then(response => {
//     refs.error.setAttribute("hidden", true);
//     const breeds = response.data;

//     for (let i = 0; i < breeds.length; i++) {
//       if (breeds[i].name === catsBreedName) {
//         let catsBreedDescr = breeds[i].description;
//         let catsTemperament = breeds[i].temperament;
//         console.log(catsBreedDescr);
//         console.log(catsTemperament);
//         let chosenCat = breeds[i].id;

//         Promise.all([getCatImage(chosenCat), catsBreedDescr, catsTemperament])
//           .then(([catPicture, breedDescr, temperament]) => {
           
//             refs.catInfo.innerHTML = `<div><h1>${catsBreedName}</h1><p>${breedDescr}<br><b>Temperament:</b> ${temperament}</p></div>`;
//             refs.loader.setAttribute("hidden", true); 
//           })
//           .catch(error => {refs.loader.setAttribute("hidden", true);
//       refs.error.removeAttribute("hidden");
//       refs.catInfo.innerHTML = " ";});

//         foundBreed = true; 
//         break; 
//       }
//     }

//     if (!foundBreed) {
//       refs.loader.setAttribute("hidden", true);
//       refs.error.removeAttribute("hidden");
//     }
//   })
//   .catch(error => {refs.loader.setAttribute("hidden", true);
//       refs.error.removeAttribute("hidden");
//       refs.catInfo.innerHTML = " ";});
// }

// function getCatImage (breedId){ const pictureUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=%22live_QizwG36WpcJn3g8MpfMLtUHPQYLKvggVkcmarBeXGmgXp17Vzihd9AFNXfBzcDUY%22`;
//  let catPicture = " ";
//  fetchCatByBreed(breedId).then(data => {
//    catPicture = data[0].url;
//    console.log(catPicture);
//    const imgElement = document.createElement('img');
//    imgElement.src = catPicture; 

//   refs.catInfo.style.display= "flex";
//   refs.catInfo.style.flexDirection= "row-reverse";
//   refs.catInfo.style.gap="20px";
 

//    refs.catInfo.appendChild(imgElement);
//    imgElement.style.width="300px";


//    return catPicture;
//  }).catch(error => {refs.loader.setAttribute("hidden", true);
//       refs.error.removeAttribute("hidden");
//       refs.catInfo.innerHTML = " ";});
  