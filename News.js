import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    console.log("i am aconstructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = this.props.category;
  }

  async updateNews(pageNo) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00f8651535024c86ad52e789e8dfeab1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }
  async componentDidMount() {
   this.updateNews();
  }
  handlePreviousClick = async () => {

  this.setState({page: this.state.page - 1})
  this.updateNews();
  }
  handleNextClick = async () => {
   
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }
  render() {
    return <div className="container my-3">

      <h1 className="text-center" style={{ margin: '40px 0px' }}>Times - Top Headlines from {this.props.category}</h1>
      {this.state.loading && <Spinner />}

      <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>

            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.className} />
          </div>

        })}


      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
    </div>;
  }
}

export default News;
