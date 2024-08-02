const API_KEY = "176751e534d441e6863a5d677274eb57";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('Failed to load news. Please try again later.');
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    if (articles && articles.length > 0) {
        articles.forEach((article) => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        });
    } else {
        cardsContainer.innerHTML = "<p>No news articles found.</p>";
    }
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector(".news-img");
    const newsTitle = cardClone.querySelector(".news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name} | ${new Date(article.publishedAt).toLocaleDateString()}`;
    newsDesc.innerHTML = article.description || 'No description available.';
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav) curSelectedNav.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (query) {
        fetchNews(query);
        if (curSelectedNav) curSelectedNav.classList.remove("active");
        curSelectedNav = null;
    }
});
