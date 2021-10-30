const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const mvList = document.getElementById('.mvList');
const searchBar = document.getElementById('searchBar');
let datas = [];


/*SLIDER*/ 
arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
        }px)`;
    } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
    }
    });
});

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredMovies = datas.filter((movie) => {
        return (
            movie.title.toLowerCase().includes(searchString) 
        );
     });
     displayCharacters(filteredMovies);
});

const loadMovies = async () => {
    try {
        const res = await fetch('assets/movies.json');
        datas = await res.json();
        displayMovies(datas);
    } catch (err) {
        console.log(err)
    }
};

const displayMovies = (movies) => {
    const htmlString = movies
        .map((movie) => {
            return `
            <li class="movie">
                <h2>${movie.title}</h2>
                <p>Release Date: ${movie.release_date}</p>
                <img src="${movie.poster_path}"></img>
            </li>
        `;
        })
        .join('');
    mvList.innerHTML = htmlString;
};

loadMovies();


