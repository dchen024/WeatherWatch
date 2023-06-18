import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './news.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [newsDescription, setNewsDescription] = useState('');

  const generateNewsDescription = useCallback(async () => {
    const prompt = `Here's a rundown of the latest news!\n
      Top 5 Stories include :\n
      ____\n
      ____\n
      ____\n
      ____\n
      ____\n`;

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
          n: 1,
        }),
      });

      const previousDescription = "Here's a rundown of the latest news!\nTop 5 Stories include :\n"

      const data = await response.json();
      console.log(data);
      const generatedDescription = data.choices[0].text.trim(); // Extract the generated news description
      setNewsDescription(previousDescription + generatedDescription); // Set the news description state
    } catch (error) {
      console.error('Error generating news description:', error);
    }
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      const response = await axios.get(url);
      setNews(response.data.articles);
      generateNewsDescription(); // Call the generateNewsDescription function after fetching news articles
    };
    fetchNews();
  }, [generateNewsDescription]);

  return (
    <div>
      <nav className="news-navbar">
        <a href="/" className="news-navbar-brand">Home</a>
        <h2 className='news-title'>Latest News</h2>
      </nav>
      <div className="weather-container">
        <h2>News Description</h2>
        <p className='newsDescription'>{newsDescription}</p> 
      </div>
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