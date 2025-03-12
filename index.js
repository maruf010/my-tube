const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('videos-container').classList.add('hidden')
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('videos-container').classList.remove('hidden')
}

// remove active class
function removeActiveClass() {
    const activeBtns = document.getElementsByClassName('active');
    for (let btn of activeBtns) {
        btn.classList.remove('active');
    }
    // console.log(activeBtns)
}

// load categories
function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
// load videos
function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('active')
            displayVideos(data.videos)
        });
}
//load category videos active
const loadCategoriesVideo = (id) => {
    // console.log(id)
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add('active');
            displayVideos(data.category)
        })

}
// load video details
const loadVideoDetails = (videoID) => {
    console.log(videoID)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}



// display details
const displayVideoDetails = (video) => {
    // console.log(video)
    document.getElementById('video_details').showModal();
    const detailsConatiner = document.getElementById('details-container');
    detailsConatiner.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        <figure>
            <img src="${video.thumbnail}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-2xl">${video.title}</h2>
            <p>Channel: ${video.authors[0].profile_name}</p>
        </div>
    </div>
    `;
}
// display categories
function displayCategories(categories) {
    const displayContainer = document.getElementById('categories-container');
    for (let cat of categories) {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick='loadCategoriesVideo(${cat.category_id})' class="btn btn-sm px-5 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        displayContainer.append(div);
    }
}
// display videos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = "";
    if (videos.length == 0) {
        videosContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center col-span-full gap-5 py-5">
            <img class="w-44" src="./logo/Icon.png" alt="">
                <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
        </div>
        `;
        hideLoader();
        return;
    }
    // for(let video of videos){
    //     console.log(video)
    // }
    videos.forEach((video) => {    //for loop bade foreach use korlam.. for loop o use kora jeto..
        // console.log(video)
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-56 rounded-t-lg object-cover" src="${video.thumbnail}" alt="Shoes" />
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
                    <h1 class="card-title mb-2">${video.title}</h1>
                    <p class="name text-gray-500 text-sm flex mb-2">
                        ${video.authors[0].profile_name}
                        ${video.authors[0].verified == true ? `<img class="w-5 h-5 ml-2" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                            alt="">` : ``}
                    </p>
                    <p class="views text-gray-500 text-sm">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')"  class="btn btn-block">Show Details</button>
        </div>
        `;
        videosContainer.append(videoCard);
    });
    hideLoader();
}

document.getElementById('search-input').addEventListener('keyup', (event)=>{
    const input = event.target.value;
    loadVideos(input);
})

loadCategories()
