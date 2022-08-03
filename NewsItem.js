import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return <div className="my-3 ">
      <div className="card" >

        <img alt="habj" src={!imageUrl ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LZ2UTYUK4YI6ZA4PBT67NHGOHQ.jpg&w=1440" : imageUrl} />
        <div className="card-body">
          <h5 className="card-title">{title}...  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex:'1'}}>
            {source}
          </span></h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="blank" className="btn btn-sm btn-dark ">Read more</a>
        </div>
      </div>
    </div>;
  }
}

export default NewsItem;
