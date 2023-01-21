import React, { Component } from 'react'
import loading from './loading.gif'
export default class Spinners extends Component {
  render() {
    return (
      <div><div className='text-center'>
      <img className='my-3' src={loading} alt="loading"/>  
      </div></div>
    )
  }
}
