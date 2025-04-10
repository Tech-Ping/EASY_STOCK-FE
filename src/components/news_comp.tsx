import React from "react";
import './styles/news_component.css'
interface NewsCard {
    title: string;
    summary?: string;
    date? : string;
    link: string;
    type: 'inpage'| 'home';
    thumbnail?: string;
}

const NewsCardComponent : React.FC<NewsCard> = ({title, summary, date, link, type, thumbnail}) =>{
    return (
        <a href={link} className={`news-card ${type}`} target="_blank">
          {type === 'home' && (
            <>
              <div className="thumbnail" />
              <div className="news-content">
                <h4 className="news-title">{title}</h4>
                <p className="news-summary">{summary}</p>
              </div>
            </>
          )}
    
          {type === 'inpage' && (
            <div className="news-simple">
              <div className="news-simple-title">{title}</div>
              <div className="news-date">{date}</div>
            </div>
          )}
        </a>
      );
    };
    
    export default NewsCardComponent;