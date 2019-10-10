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


// Class
class Main extends Component {


  render() {
    let dockStyle = {
      minWidth: "10rem",
      maxWidth: "30rem",
      width: "0px",
      height: "100%",
      backgroundColor: "white",
      zIndex :0
    }
        
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col s3 position-relative">
            <Dock id="dockerId" dockStyle={dockStyle} position='left' isVisible={true}>
                <div>
                  <Search/>
              </div>
              <div className="searchResults">
                Search Results
                <br></br>
                <ul>
                {

                  
  
                     this.props.map.searchValues.length >0 ?
                     (
                        
                         this.props.map.searchValues.map((searchValue,count=0)=>{
                                return (
                                <li key={count++}>{searchValue.text}</li>
                                )
                         })
                         
                     )
                     
                     :
                     <span>No Search Results</span>
                 }
                </ul>
              
                
              </div>
            </Dock>
            </div>
                <div className="col s9">

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
