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
      <nav className="news-navbar">
        <a href="/" className="news-navbar-brand">Home</a>
        <h2 className='news-title'>Latest News</h2>
      </nav>
      <ul className="news-news-list">
        {news.map((article) => (
            <li key={article.url} className="news-news-item">
              <div className="news-article-container">
                <a className='news-a' href={article.url} target="_blank" rel="noopener noreferrer">
                  <img src={article.urlToImage} alt={article.title} className="news-news-image"/>
                </a>
                <div className="news-news-content">
                  <a className='news-a'href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                  <p className='news-p'>{article.description}</p>
                </div>
              </div>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default News;