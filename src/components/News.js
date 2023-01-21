import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinners from './Spinners';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class news extends Component {
    static defaultProps={
      country: 'in',
      pageSize: 6,
      category: 'general'
    }
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    constructor(props)
    {
        super(props);
        this.state={
                articles:[],
                loading: false,
                page:1,
                totalResults:0

        }
        document.title=this.props.category.charAt(0).toUpperCase()+this.props.category.substring(1,);
    }
    async componentDidMount()
    {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    }
    handlePrevClick= async()=>
    {
        console.log("Prev");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({
                page: this.state.page - 1,
                articles: parsedData.articles,
                loading: false
            }) 
    }
    handleNextClick = async()=>
    {
        console.log("next");
        if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            })
        }
    }
    fetchMoreData = async()=>
    {
      this.setState({page: this.state.page + 1});
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({articles: this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults,loading:false})
    }
  render() {
    return (
      <div className='container my-3 '>
       <h2 className='text-center'>Newsify - Top Headlines from {this.props.category.charAt(0).toUpperCase()+this.props.category.substring(1,)}</h2>
       {this.state.loading && <Spinners/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinners/>}
        >
          <div className="container">

          
       <div className="row">
       {this.state.articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
    </div>
       })}
       </div>
                
      </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&#8249; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8250;</button>
      </div> */}
      </div>
    )
  }
}
export default news
