// load categories
function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
// load videos
function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
}


// display categories
function displayCategories(categories) {
    const displayContainer = document.getElementById('categories-container');
    for (let cat of categories) {
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn btn-sm px-5 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        displayContainer.append(div)
    }
}
// display videos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    // for(let video of videos){
    //     console.log(video)
    // }
    videos.forEach((video) => {    //for loop bade foreach use korlam.. for loop o use kora jeto..
        // console.log(video)
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure>
                <img class="w-full h-56" src="${video.thumbnail}" alt="Shoes"/>
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `;
        videosContainer.append(videoCard);
    });
}



loadCategories()
loadVideos()