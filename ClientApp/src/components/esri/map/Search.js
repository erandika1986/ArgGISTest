import React, { Component, useRef } from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'


export default class Search extends Component {
  
  constructor(props){
    super(props);
    this.inputRef=React.createRef()
  }

  handleSearch(e){
    console.log('this' )
  }
    render() {
        return (
            <section id="search" className="">
            <div className="container">
              <div className="row">
              <div id="expandDiv" className="col s9">
              
              </div>
                    
              </div>
            </div>
          </section>
        )
    }
}
