import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './news.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      const response = await axios.get(url);
      setNews(response.data.articles);
    };
    fetchNews();
  }, []);



  
  return (
    <div>
      <h2>Latest News</h2>
      <ul className="news-list">
        {news.map((article) => (
          <li key={article.url} className="news-item">
            <img src={article.urlToImage} alt={article.title} className="news-image" />
            <div className="news-content">
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
              <p>{article.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;