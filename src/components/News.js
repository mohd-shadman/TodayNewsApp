import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=537521b65a2345109ec4d8fda9afbac1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  };

  handlePreClick = () => {
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({
          page: prevState.page - 1,
          loading: false,
        }),
        () => this.fetchData()
      );
    }
  };

  handleNextClick = () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
          loading: false,
        }),
        () => this.fetchData()
      );
    }
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <div className='container my-3'>
        <h2 className='text-center text-success'>Today<sub style={{ color: 'red' }}>News</sub> Top Headlines</h2>
        {loading && <Spinner />}
        <div className="row">
          {articles.length > 0 ? (
            articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ''}
                  description={element.description ? element.description.slice(0, 80) : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))
          ) : (
            <div className="col-md-12 text-center">
              <p>No articles found.</p>
            </div>
          )}
        </div>
        
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1 || loading} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize) || loading} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;




























// import React, { Component } from 'react';
// import NewsItem from './NewsItem';

// export class News extends Component {
//   articles = [];

//   constructor() {
//     super();
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults: 0
//     };
//   }

//   async componentDidMount() {
//     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1&page=1pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedata = await data.json();
//     console.log(parsedata);
//     this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults})
//   }

//   // fetchData = async () => {
//   //   let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1&page=${this.state.page-1}&pageSize=${}`;
//   //   let data = await fetch(url);
//   //   let parsedata = await data.json();
//   //   this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults });
//   // };

//   handlePreClick = async () => {
//     console.log('previous');
//     if (this.state.page - 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
//     }
//     else{
//             let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//             let data=await fetch(url)
//             let parsedata =await data.json()
//             console.log(parsedata)
//             this.setState({
//             page:this.state.page-1,
//             articles:parsedata.articlesss
//         })
      
//     }
//   };

//   handleNexClick = async () => {
//     console.log('next');
//     if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.state.totalResults/this.props.pageSize)) {
//     }
//     else{
//             let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//             let data=await fetch(url)
//             let parsedata =await data.json()
//             console.log(parsedata)
//             this.setState({
//             page:this.state.page+1,
//             articles:parsedata.articlesss
//         })
      
//     }
//   };

//   render() {
//     return (
//       <div className='container my-3'>
//         <h2 className='text-center text-success'>Today<sub style={{ color: 'red' }}>News</sub> Top Headlines</h2>
        
//         <div className="row">
//           {this.state.articles.map((element) => {
//             return (
//               <div className="col-md-4" key={element.url}>
//                 <NewsItem
//                   title={element.title ? element.title.slice(0, 40) : ''}
//                   description={element.description ? element.description.slice(0, 80) : ''}
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                 />
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="container d-flex justify-content-between">
//           <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
//           <button disabled={this.state.page >= Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNexClick}>Next &rarr;</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default News;





// import React, { Component } from 'react';
// import NewsItem from './NewsItem';

// export class News extends Component {
//   articles = [
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "World Central Kitchen founder José Andrés criticises Israel over aid workers' deaths",
//       "description": "José Andrés, who set up World Central Kitchen, criticises Israel over a deadly strike in Gaza.",
//       "url": "https://www.bbc.co.uk/news/world-us-canada-68716066",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/FAF6/production/_133064246_gettyimages-1406196934.jpg",
//       "publishedAt": "2024-04-03T16:07:22.8093309Z",
//       "content": "World Central Kitchen (WCK) founder José Andrés says he is \"heartbroken\" over the deaths of aid workers in a strike by Israel - which he has urged to stop its \"indiscriminate killing\". \r\nSeven of the… [+2757 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Bowen: The Israel-Gaza war is at a crossroads",
//       "description": "Will the killing of foreign aid workers exhaust the patience of Israel's allies?",
//       "url": "https://www.bbc.co.uk/news/world-middle-east-68722308",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/AEA3/production/_133070744_gettyimages-2036326724.jpg",
//       "publishedAt": "2024-04-03T15:22:14.902338Z",
//       "content": "All except the shortest wars have times when killing is an unchanging, grim routine. There are also moments, like the last few days in the Middle East, when events leave belligerents and their allies… [+9963 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Taiwan: Rescue efforts continue after 700 injured in earthquake",
//       "description": "The earthquake has caused building collapses, landslides and caused power outages across the island.",
//       "url": "https://www.bbc.co.uk/news/world-asia-68719996",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/FB97/production/_133070446_1f053a206a58c52241fa694e3cf0e0f4ccea79eb0_223_1477_8301000x563.jpg",
//       "publishedAt": "2024-04-03T14:37:14.3873529Z",
//       "content": "Media caption, Watch moment magnitude 7.4 earthquake hits Taiwan\r\nRescue efforts are under way in Taiwan after a 7.4 magnitude earthquake struck the island's eastern coast, killing at least nine and … [+4536 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Finnish school shooting motivated by bullying - police",
//       "description": "The suspect is accused of killing a boy aged 12 and wounding two girls in Vantaa.",
//       "url": "https://www.bbc.co.uk/news/world-europe-68720973",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/BE43/production/_133070784_8e7e67b6d2324b9512823cf0f1335b1dd67041861319_17_3801_21391000x563.jpg",
//       "publishedAt": "2024-04-03T13:52:20.4651431Z",
//       "content": "A 12-year-old suspected of shooting dead a boy at his school and seriously wounding two girls was motivated by bullying, Finnish police say.\r\nThe boy was detained some distance from his school in Van… [+2657 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Anya Taylor-Joy confirms she secretly got married to Malcolm McRae in 2022",
//       "description": "The Queen's Gambit star confirms she married her partner Malcolm McRae two years ago in New Orleans.",
//       "url": "https://www.bbc.co.uk/news/entertainment-arts-68721315",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/12422/production/_133068747_gettyimages-1389764659.jpg",
//       "publishedAt": "2024-04-03T12:37:17.7778693Z",
//       "content": "Actress Anya Taylor-Joy has confirmed she secretly got married to her partner Malcolm McRae in New Orleans in 2022. \r\nThe Queen's Gambit star told fans she married her \"best friend\" at a ceremony on … [+1748 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Luis Rubiales arrested in corruption investigation",
//       "description": "The former president of the Spanish football federation has been arrested after flying into Madrid.",
//       "url": "https://www.bbc.co.uk/news/world-europe-68721045",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/66AE/production/_133068262_mediaitem133068261.jpg",
//       "publishedAt": "2024-04-03T12:22:18.7311355Z",
//       "content": "Luis Rubiales, the former president of the Spanish football federation (RFEF), has been arrested as part of a corruption investigation.\r\nHe was detained on his arrival in Madrid from the Dominican Re… [+858 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Hunter Schafer: Euphoria star says she no longer wants to play trans characters",
//       "description": "Hunter Schafer says she does not want being transgender to be \"the centrepiece to what I'm doing\".",
//       "url": "https://www.bbc.co.uk/news/entertainment-arts-68721310",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/A146/production/_133068214_hsgettyimages-2075074852.jpg",
//       "publishedAt": "2024-04-03T12:22:16.1211877Z",
//       "content": "Euphoria actress Hunter Schafer has said she no longer wants to play transgender roles.\r\nThe 25-year-old transgender star shot to fame playing a trans character, Jules Vaughn, in HBO's hit teen drama… [+2026 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Ringleader of global monkey torture network, 'The Torture King', is charged",
//       "description": "Michael Macartney, 50, confessed to the BBC his role in an extreme monkey torture network.",
//       "url": "https://www.bbc.co.uk/news/world-us-canada-68716467",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/161BC/production/_133065509_dsc04028-3-4.jpg",
//       "publishedAt": "2024-04-03T12:07:23.6997653Z",
//       "content": "A ringleader in a global monkey torture network exposed by the BBC has been charged by US federal prosecutors.\r\nMichael Macartney, 50, who went by the alias \"Torture King\", was charged in Virginia wi… [+3210 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "England's 'largest gold nugget' fails to sell at auction",
//       "description": "Auctioneers had hoped the lump would sell for £30,000-£40,000 in the online sale.",
//       "url": "https://www.bbc.co.uk/news/articles/cw9zzx1y4zvo",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/6df9/live/9ead0950-f0d3-11ee-a8fd-eb66677e27e8.jpg",
//       "publishedAt": "2024-04-03T09:07:19.5084568Z",
//       "content": "Mr Brock made his discovery on farmland, during an organised dig for which he had turned up an hour late, using a machine that was \"pretty much kaput\".\r\nHe said he had only recently learned that it c… [+450 chars]"
//     },
//     {
//       "source": {
//         "id": "bbc-news",
//         "name": "BBC News"
//       },
//       "author": "BBC News",
//       "title": "Botswana offers to send 20,000 elephants to Germany",
//       "description": "Germany wants tougher limits on hunting the animals, but Botswana says it has too many of them.",
//       "url": "https://www.bbc.co.uk/news/world-68715164",
//       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/D3FA/production/_133066245_gettyimages-1760556586.jpg",
//       "publishedAt": "2024-04-03T02:52:14.7600286Z",
//       "content": "The president of Botswana has threatened to send 20,000 elephants to Germany in a political dispute.\r\nEarlier this year, Germany's environment ministry suggested there should be stricter limits on im… [+2198 chars]"
//     },
//   ];

//   constructor() {
//     super();
//     // console.log('hello i am shadman')
//     this.state = {
//       articles: this.articles,
//       loading: false,
//       page: 1

//     }
//   }
//   async componentDidMount() {
//     console.log('cdm');
//     let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1"
//     let data = await fetch(url)
//     let parsedata = await data.json()
//     // console.log(parsedata)
//     // this.setState({ articles: parsedata.articles })
//     this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults })
//   }
//   handlePreClick = async () => {
//     console.log('previous')
//     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1&page=${this.state.page - 1}&pageSize=20`;
//     let data = await fetch(url);
//     let parsedata = await data.json()
//     // console.log(parsedata)
//     this.setState({
//       page: this.state.page - 1,
//       articles: parsedata.articles
//     })
//   }
//   handleNexClick = async () => {
//     console.log('next');

//     if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

//     }
//     else {
//       let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=537521b65a2345109ec4d8fda9afbac1&page=${this.state.page + 1}&pageSize=20`;
//       let data = await fetch(url)
//       let parsedata = await data.json()
//       // console.log(parsedata)
//       this.setState({
//         page: this.state.page + 1,
//         articles: parsedata.articles
//       })
//     }
//   }

//   render() {
//     return (
//       <div className='container my-3'>
//         <h2 className='text-center text-success ' >Today<sub style={{color:'red'}}>News</sub>   Top Headlines</h2>
        
//         <div className="row">
//           {this.state.articles.map((element) => {
//             return <div className="col-md-4" key={element.url}>
//               <NewsItem title={element.title ? element.title.slice(0, 40) : ''} description={element.description ? element.description.slice(0, 80) : ''} imageUrl={element.urlToImage}
//                 newsUrl={element.url} className="card-img-top" />

//             </div>
//           })}

//           {/* <div className="col-md-4">
//           <NewsItem title='myTitle' description='mydesc' />

//         </div>
//         <div className="col-md-4">
//           <NewsItem title='myTitle' description='mydesc' />

//         </div> */}
//         </div>
//         <div className="container d-flex justify-content-between">
//           <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; previous</button>
//           <button disabled={this.state.page>=1} type="button" className="btn btn-dark " onClick={this.handleNexClick}>next &rarr;</button>
//         </div>
//       </div>
//     );
//   }

// }
// export default News;

