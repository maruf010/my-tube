function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

function displayCategories(categories){
    const displayContainer = document.getElementById('categories-container');
    for(let cat of categories){
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn btn-sm px-5 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        displayContainer.append(div)
    }
}


loadCategories()