// Copyright 2019 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​

// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as mapActions } from '../redux/reducers/map';
import { actions as authActions } from '../redux/reducers/auth';

// Components
import TopNav from 'calcite-react/TopNav';
import TopNavBrand from 'calcite-react/TopNav/TopNavBrand';
import TopNavTitle from 'calcite-react/TopNav/TopNavTitle';
import TopNavList from 'calcite-react/TopNav/TopNavList';
import TopNavLink from 'calcite-react/TopNav/TopNavLink';

import SceneViewExample from './esri/map/SceneViewExample';

import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

import Map from './esri/map/Map';

// Styled Components
import styled from 'styled-components';

import Dock  from 'react-dock'
import Search from '../components/esri/map/Search'
import './esri/map/map.css'

const Container = styled.div`

`;

const MapWrapper = styled.div`
 
`;



class Main extends Component {

 state={
   fullyloaded: false,
   visiblity : true,
   maxW : "30rem",
   minW : "0.1rem",
 }

 componentDidMount(){


   this.setState({
     fullyloaded:true
   })

 }

 handleVisiblity=()=>{

   this.setState({
     visiblity: !this.state.visiblity,
 
   })
 }

 onSizeChange=(event)=>{

  console.log(event)

   if(this.state.visiblity){

    this.setState({
      maxW : "30rem"
    })

   }
   

 }
  onClickSearch=(graphic)=>{
 

  }

  render() {
    let dockStyle = {
      minWidth: "0.3rem",
      maxWidth: this.state.visiblity?this.state.maxW : this.state.minW,
      width : this.state.visiblity?this.state.maxW : this.state.minW,
      height: "100%",
      zIndex :0
    }

        
    return (
      <>


        <div className="container-fluid">
          <div className="row">
            <div className="col s3">
            <Dock slow={true} className="gray lighten-2" onSizeChange={this.onSizeChange} id="dockerId" dimMode="none" fluid={true} dockStyle={dockStyle} position='left' isVisible={true}>
                
        

            <div onClick={this.handleVisiblity} id="icons">
            <ul>
                <li className={this.state.visiblity ? 'valign-wrapper show' : 'valign-wrapper hide' } ><i className="material-icons">arrow_back</i></li>
                <li className={this.state.visiblity ? 'valign-wrapper hide' : 'valign-wrapper show' }><i className="material-icons">arrow_forward</i></li>
            </ul>
        </div>

        <div className={this.state.visiblity && this.state.fullyloaded ? 'row show space' : 'row hide space' }>
          <div className={this.state.visiblity && this.state.fullyloaded ? 'col s12 show searchBar' : 'col s12  hide searchBar' } id="expandDiv"></div>
        </div>
    
            
             
              </Dock>
           
              

              {/* <div className="searchResults">
                Search Results
                <br></br>
                <ul>
                {
                   this.props.map.searchValues.length >0 ?
                     (
                        this.props.map.searchValues.map((searchValue,count=0)=>{
                                return (
                                <li onClick={this.onClickSearch.bind(this,searchValue.graphic)} key={count++}>{searchValue.text}</li>
                                )
                         })
                         
                     )
                     :
                     <span>No Search Results</span>
                 }
                </ul>
             </div> */}

            
            </div>
          </div>
        </div>
        
        <Map className="esriMapContainer" id="mapID"
                  onMapLoaded={this.props.mapLoaded}
                  mapConfig={this.props.config.mapConfig}
                  is3DScene={false}
                />

             

         {/* <Container className="container">     
              <MapWrapper id="mapWra" className="mapWrapper">
              <Map id="mapID"
                  onMapLoaded={this.props.mapLoaded}
                  mapConfig={this.props.config.mapConfig}
                  is3DScene={false}
                />
            </MapWrapper>
            </Container> */}
      
      </>

    )
  }
}

const mapStateToProps = state => ({
  map: state.map,
  auth: state.auth,
  config: state.config,
  
})

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    ...mapActions,
    ...authActions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
