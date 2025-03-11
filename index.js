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
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-56 rounded-lg object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-md text-sm">3hrs 56 min
                    ago</span>
            </figure>
            <div class="flex py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                            <img class="" src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="details pl-5">
                    <h1 class="card-title mb-2">Midnight Serenade</h1>
                    <p class="name text-gray-500 text-sm flex mb-2">
                        ${video.authors[0].profile_name}
                        <img class="w-5 h-5 ml-2" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                            alt="">
                    </p>
                    <p class="views text-gray-500 text-sm">${video.others.views} views</p>
                </div>
            </div>
        </div>
        `;
        videosContainer.append(videoCard);
    });
}



loadCategories()
loadVideos()