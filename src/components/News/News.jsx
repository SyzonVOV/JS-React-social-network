import React from 'react';
//import style from "./News.module.css";
import { connect } from 'react-redux';

function TheNewsContainer(props) {
  let news = props.news;
  return news.map(news => <TheNews title={ news.title }
                                   news={ news.news }
                                   key={ news.id }
                                   likes={ news.likes }/>)

}

function TheNews(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <p>{props.news}</p>
        <div>{props.likes}</div>
      </div>
    </div>
  )
}

function News(props) {
  return (
    <div>
      <h1>News</h1>
      <TheNewsContainer news={props.news}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  news: state.newsPage.news
})
export default connect(mapStateToProps)(News);