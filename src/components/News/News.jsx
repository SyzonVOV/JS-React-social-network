import React from "react";
import style from "./News.module.css";
import StoreContext from "../../StoreContext";

function TheNewsContainer(props) {
  let news = props.state.news;
  let newsElements = news.map( news => <TheNews title={news.title}
                                                news={news.news}
                                                key={news.id}
                                                likes={news.likes}/> )

  return newsElements

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

function News() {
  return (
    <div>
      <h1>News</h1>
      <StoreContext.Consumer>
        { store => <TheNewsContainer state={store.getState().newsPage}/> }
      </StoreContext.Consumer>
    </div>
  )
}

export default News;