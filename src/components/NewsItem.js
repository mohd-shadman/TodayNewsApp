import React, { Component } from 'react'



export class NewsItem extends Component {
  
  
  render() {
    let {title , description,imageUrl,newsUrl,author, date}=this.props;
    return (
      <div className='my-3'>
        
        <div className="card" style={{width: "18rem"}}>
          <img alt=' loading' src= {!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/6df9/live/9ead0950-f0d3-11ee-a8fd-eb66677e27e8.jpg":imageUrl} />
            <div className="card-body">
              <h5 className="card-title">{title} ...</h5>
              <p className="card-text">{description} ...</p>
              <p className="card-text"><small className="text-body-secondary"> By {author?author:'shadman'} on {new Date(date).toGMTString()}</small></p>
              <a rel='noreferrer' href={newsUrl}  className="btn btn-sm btn-dark">Read More...</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
