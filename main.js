class Doggie {
    constructor() {
        this.ApiUrl = 'https://dog.ceo/api';
        this.imgElement = document.querySelector('img');
        this.bcgElement = document.querySelector('.featured-dog__bcg');
        this.tilesElement = document.querySelector('.tiles');
        this.spinnerElement = document.querySelector('.spinner');

        this.init();

    }

    showLoading() {
        this.spinnerElement.classList.add('spinner-visible');
    }

    hideLoading() {
        this.spinnerElement.classList.remove('spinner-visible');
    }

    getRandomImage() {
        return fetch(`${this.ApiUrl}/breeds/image/random`)
            .then(resp => resp.json())
            .then(data => data.message)
            .catch(err => console.log('Błąd', err));
    }
    listBreeds() {
        return fetch(`${this.ApiUrl}/breeds/list/all`)
            .then(resp => resp.json())
            .then(data => data.message)
    }

    getRandomDogByBreed(breed) {
        return fetch(`${this.ApiUrl}/breed/${breed}/images/random`)
            .then(resp => resp.json())
            .then(data => data.message);
    }


    showAllBreeds() {
        this.listBreeds()
            .then(breeds => {
                for (const breed in breeds) {
                    if (breeds[breed].length === 0) {
                        this.addBreed(breed)
                    } else {
                        for (const subBreed of breeds[breed]) {
                            this.addBreed(breed + '/' + subBreed);
                        }
                    }
                }
            })


    }

    showImageWhenReady(image) {
        this.imgElement.setAttribute('src', image);
        this.bcgElement.style.background = `url("${image}")`;
        this.hideLoading();
    }

    addBreed(breed, subBreed) {
        let name;
        let type;

        if (typeof subBreed === 'undefined') {
            name = breed;
            type = breed;
        } else {
            name = `${breed} ${subBreed}`;
            type = `${breed} ${subBreed}`;
        }

        const description = document.querySelector('.featured-dog__description')

        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');

        const nameDescription = document.createElement('p');
        const tileContent = document.createElement('div');
        tileContent.classList.add('tiles__content');
        tileContent.innerHTML = name;
        tileContent.addEventListener('click', () => {
            window.scrollTo(0, 0);
            this.showLoading();
            this.getRandomDogByBreed(type)
                .then(img => this.showImageWhenReady(img));

            description.innerHTML = `<p>Here you can see a very good doggie!</p> <br> <p class=featured-dog__description-name>${name}</p>`

        });

        tile.appendChild(tileContent);
        this.tilesElement.appendChild(tile);
    }


    init() {
        this.showLoading();
        this.getRandomImage()
            .then(img => this.showImageWhenReady(img));
        this.showAllBreeds()
    }


}

document.addEventListener("DOMContentLoaded", function () {

    new Doggie()

})