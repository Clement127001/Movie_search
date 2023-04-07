const form = document.querySelector('#tvshows');
const imagelist = document.querySelector('.imgLoader');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.dir(form);

    //extracting show name from the form
    const showName = form.elements.query.value;


    // console.log("Showname : ", showname)

    //setting the serach term

    const queryTerm = { params: { q: showName } }

    const searchResult = await axios.get("https://api.tvmaze.com/search/shows", queryTerm);

    addImage(searchResult.data);

    form.elements.query.value = " ";

});

function addImage(result) {
    for (let res of result) {

        if (res.show.image.medium) {
            const mainDiv = document.createElement('div');
            mainDiv.classList.add('show1');

            const showTitle = document.createElement('h4');

            showTitle.innerText = res.show.name;
            console.log(res.show);
            console.log(showTitle);


            const imageOfShow = document.createElement('img');
            imageOfShow.src = res.show.image.medium;
            console.log(imageOfShow);

            const rating = document.createElement('p');
            if (res.show.rating) {
                rating.innerText = res.show.rating.average;
                console.log(rating);
            }

            else {
                rating.innerText = 'N/A';
            }

            mainDiv.append(showTitle);
            mainDiv.append(imageOfShow);
            mainDiv.append(rating);

            imagelist.append(mainDiv);


        }


    }
}
