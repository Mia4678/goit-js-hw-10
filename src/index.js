// import './styles.css';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');

const slim = new SlimSelect({
  select: '#breed-selected',
});


function hideLoader() {
  loader.classList.add('hidden');
}
function showLoader() {
  loader.classList.remove('hidden');
}
function hideBreedSelect() {
  select.classList.add('hidden');
}
function showBreedSelect() {
  select.classList.remove('hidden');
}

function hideError() {
  error.classList.add('hidden');
}
function showError() {
  error.classList.remove('hidden');
}
function clearCatInfo() {
  catInfo.innerHTML = '';
}
hideBreedSelect();

hideError();

showLoader();

fetchBreeds()
  .then(response => {
    const breeds = response.data;
    breeds.map(breed => {
      const options = breeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      });
      select.innerHTML = options.join('');
    });
    hideLoader();
    showBreedSelect();
  })
  .catch(error => {
    clearCatInfo();

    hideBreedSelect();
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    hideLoader();
    showError();
  });

select.addEventListener('change', () => {
  const breedId = select.value;
  showLoader();

  clearCatInfo();
  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      catInfo.innerHTML = `
        <img src="${data[0].url}" class="image-cat">
        <div class="content">
        <h3 class="subtitle">${data[0].breeds[0].name}</h3>
        <p class="text"> ${data[0].breeds[0].description}</p>
        <p class="text"><b>Temperament:</b> ${data[0].breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      clearCatInfo();
      hideBreedSelect();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      hideLoader();
      showError();
    });
});



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
  