document.addEventListener('DOMContentLoaded', function() {
    const articleForm = document.getElementById('articleForm');
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    const articleList = document.getElementById('articleList');
  
    articleForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const title = titleInput.value;
      const content = contentInput.value;
  
      const article = {
        id: generateUniqueId(),
        title: title,
        content: content,
        date: new Date().toISOString()
      };
  
      saveArticle(article);
  
      titleInput.value = '';
      contentInput.value = '';
  
      updateArticleList();
    });
  
    articleList.addEventListener('click', function(e) {
      if (e.currentTarget && e.target.matches('button.delete')) {
        const articleId = e.target.dataset.id;
        deleteArticle(articleId);
        updateArticleList();
      }
    });
  
    function generateUniqueId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    function saveArticle(article) {
      const articole = getArticlesFromStorage() || [];
      articole.push(article);
      localStorage.setItem('articole', JSON.stringify(articole));
    }
  
    function deleteArticle(articleId) {
      const articole = getArticlesFromStorage() || [];
      const updatedArticles = articole.filter(function(article) {
        return article.id !== articleId;
      });
      localStorage.setItem('articole', JSON.stringify(updatedArticles));
    }
  
    function getArticlesFromStorage() {
      const articoleJSON = localStorage.getItem('articole');
      return JSON.parse(articoleJSON);
    }
  
    function updateArticleList() {
      const articole = getArticlesFromStorage() || [];
      articleList.innerHTML = '';
  
      articole.forEach(function(article) {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = article.title;
  
        const contentElement = document.createElement('p');
        contentElement.textContent = article.content;
  
        const dateElement = document.createElement('small');
        dateElement.textContent = new Date(article.date).toLocaleString();
  
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Șterge';
        deleteButton.dataset.id = article.id;
  
        articleElement.appendChild(titleElement);
        articleElement.appendChild(contentElement);
        articleElement.appendChild(dateElement);
        articleElement.appendChild(deleteButton);
  
        articleList.appendChild(articleElement);
      });
    }
  
    updateArticleList();
    
//pentru marirea imaginilor
const images = document.querySelectorAll('img');
let currentIndex = 0;

function zoomImage() {
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  // aici am folosit computedStyle
  const computedStyles = window.getComputedStyle(images[currentIndex]);
  const currentWidth = parseFloat(computedStyles.width);
  const currentHeight = parseFloat(computedStyles.height);

  images[currentIndex].style.width = (currentWidth *1.2) + 'px';
  images[currentIndex].style.height = (currentHeight * 1.2) + 'px';

  // Așteaptă 3 secunde 
  setTimeout(() => {
    images[currentIndex].style.width = currentWidth + 'px';
    images[currentIndex].style.height = currentHeight + 'px';
    currentIndex++; // următoarea imag
    zoomImage(); // 
  }, 3000);
}
zoomImage();

  });
  