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
  loader.classList.add('is-hidden');
}
function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideBreedSelect() {
  select.classList.add('is-hidden');
}
function showBreedSelect() {
  select.classList.remove('is-hidden');
}

function hideError() {
  error.classList.add('is-hidden');
}
function showError() {
  error.classList.remove('is-hidden');
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
  setTimeout(() => {
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
  }, 1500); // 7 seconds delay (7000 milliseconds)
});





