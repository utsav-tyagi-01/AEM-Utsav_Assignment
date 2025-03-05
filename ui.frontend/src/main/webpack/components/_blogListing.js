document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://dummyjson.com/products";
    let currentIndex = 0;
    const itemsPerPage = 6;
    let products = [];
    let filteredProducts = [];

    const container = document.querySelector(".card-container");
    const loadMoreBtn = document.querySelector(".btn");
    const searchBar = document.getElementById("search-bar");

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            products = data.products || [];
            filteredProducts = products;
            renderCards(true);
        } catch (error) {
            console.error("Cannot fetch data:", error);
        }
    }

    function renderCards(reset = false) {
        if (reset) {
            container.innerHTML = "";
            currentIndex = 0;
        }

        const nextProducts = filteredProducts.slice(currentIndex, currentIndex + itemsPerPage);

        nextProducts.forEach((product) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="card-image" style="background-image: url('${product.thumbnail}');">
                    <span class="category">${product.category}</span>
                    
                    <div class ="icon">
                    <div class="download">
                     <svg><use href="/apps/wknd/clientlibs/clientlib-site/resources/images/sprite/sprite.svg#download"/></svg>
                  </div>
                  <div class="share">
                  <svg ><use href="/apps/wknd/clientlibs/clientlib-site/resources/images/sprite/sprite.svg#share"/></svg>
                    
                  </div>  
                  </div>
                </div>
                <div class="card-content">
                    <div class="title">${product.title}</div>
                    <div class="description">${product.description}</div>
                    <div class="price-rating">
                        <span class="price">$${product.price}</span>
                        <span class="rating">⭐ ${product.rating}</span>
                    </div>
                    <div class="stock">${product.availabilityStatus}</div>
                    <a href="#" class="cta">READ MORE</a>
                </div>
            `;

            container.appendChild(card);
        });

        currentIndex += itemsPerPage;

        if (currentIndex >= filteredProducts.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "block";
        }
    }

    

    loadMoreBtn.addEventListener("click", () =>{
        renderCards();
    });


    function filterProducts(query) {
        filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        renderCards(true);
    }

    searchBar.addEventListener("input", (e) => {
        filterProducts(e.target.value.toLowerCase());
    });
    fetchData();
});