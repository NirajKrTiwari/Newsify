//import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'
import "./style.css";
export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: '' }}>
                    <div className='card2' style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'}}>
                    <span class="badge rounded-pill bg-danger" id="badge" style={{}}>
                        {source}
                    </span>
                </div>
                <img src={!imageUrl ? "https://www.masscommunicationtalk.com/wp-content/uploads/2011/10/News-handing-1024x615.gif" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    {/* <span class="badge bg-secondary">New</span> */}
                    <p className="card-text">{description}</p>
                    <p className='card-text'><small className='"text-muted author' >By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
            </div >
        )
    }
}

export default NewsItem
