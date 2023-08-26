const form = document.querySelector('#searchForm');
const imagesContainer = document.querySelector('.images-container');


form.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {params : {q: searchTerm}};
    const res = await axios.get(`http://api.tvmaze.com/search/shows/`, config);
    
    // const img = document.createElement('IMG');
    // img.src = res.data[0].show.image.medium;
    // document.body.append(img);
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    imagesContainer.innerHTML = ''
    for (result of shows){
        if (result.show.image){
            // console.log(result.show.name)
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');


            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            img.classList.add('grid-image');
            imgContainer.appendChild(img);
            //document.body.append(img);

            const title = document.createElement('p');
            title.textContent = result.show.name;
            title.classList.add('image-title');
            imgContainer.appendChild(title);

            imagesContainer.appendChild(imgContainer);
        }
        
    }
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth()+1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const getLatestTvShows = async () => {
    try {
        const today = getCurrentDate();
        const resLate = await axios.get(`http://api.tvmaze.com/schedule?country=US&date=`,today);
        makeImages(resLate.data);
    } catch(e) {
        console.log("EROOR", e);
    }
}

window.addEventListener('load', getLatestTvShows);