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
            <section id="search" className="section section-search white darken-1 white-text center scrollspy">
            <div className="container">
              <div className="row">
                <div id="expandDiv" className="col s12">
              

                

                  {/* <div class="input-field">
                  <i  class="material-icons black-text">menu <input type="text" class="white grey-text" placeholder="Search Here"/></i>                
                  </div> */}
                  
                </div>
              </div>
            </div>
          </section>
        )
    }
}
