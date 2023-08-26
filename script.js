const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {params : {q: searchTerm}};
    const res = await axios.get(`http://api.tvmaze.com/search/shows/`, config);
    // console.log(res.data[0].show.image.medium);
    // const img = document.createElement('IMG');
    // img.src = res.data[0].show.image.medium;
    // document.body.append(img);
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    const imagesContainer = document.querySelector('.images-container');
    for (result of shows){
        
        if (result.show.image){
            console.log("there is")
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            img.classList.add('grid-image');
            imagesContainer.appendChild(img);
            //document.body.append(img);
        }
        
    }
}

const getLatestTvShows = async () => {
    try {
        const resLate = await axios.get(`http://api.tvmaze.com/schedule?country=US&date=2023-08-01`);
        makeImages(resLate.data);
    } catch(e) {
        console.log("EROOR", e);
    }
}

window.addEventListener('load', getLatestTvShows);