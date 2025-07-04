const apiKey = "920736660be741819f222646d8eb730d"; // Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');
const countrySelect = document.getElementById('country-select');

function fetchNews(country = 'us') {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      newsContainer.innerHTML = '';
      if (data.articles.length === 0) {
        newsContainer.innerHTML = "<p>No news found.</p>";
        return;
      }

      data.articles.forEach(article => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-article';
        newsElement.innerHTML = `
          <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
          <p>${article.description || ''}</p>
        `;
        newsContainer.appendChild(newsElement);
      });
    })
    .catch(err => {
      newsContainer.innerHTML = "<p>Error fetching news.</p>";
      console.error(err);
    });
}

// Load default news on page load
fetchNews();

// Update news on country change
countrySelect.addEventListener('change', () => {
  fetchNews(countrySelect.value);
});
