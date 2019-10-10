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

// NOTE
// This is a "special" react component that does not strictly play by
// React's rules.
//
// Conceptually, this component creates a "portal" in React by
// closing its render method off from updates (by simply rendering a div and
// never accepting re-renders) then reconnecting itself to the React lifecycle
// by listening for any new props (using componentWillReceiveProps)

// React
import React, { Component, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as mapActions } from '../../../redux/reducers/map';

// ESRI
import { loadModules } from 'esri-loader';
import { createView } from '../../../utils/esriHelper';

// Styled Components
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

// Variables
const containerID = "map-view-container";

class Map extends Component {

  componentDidMount() {
    this.startup(
      this.props.mapConfig,
      containerID,
      this.props.is3DScene
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Tell React to never update this component, that's up to us
    return false;
  }

  addIt(search){
    console.log(search)
  }

  render() {
    return (
      <>
      
      <Container ref="mapDiv" id={containerID}></Container>
      <div id="zoomDiv">zoom</div>
      {
        console.log(this.props.searchValues)
      }
      
      </>
    );
  }

  // ESRI JSAPI
  startup = (mapConfig, node, isScene = false) => {
    createView(mapConfig, node, isScene).then(
      response => {
        this.init(response);
        this.setupEventHandlers(this.map);
        this.setupWidgetsAndLayers();
        this.finishedLoading();
      },
      error => {
        console.error("maperr", error);
        window.setTimeout( () => {
          this.startup(mapConfig, node);
        }, 1000);
      })
  }

  finishedLoading = () => {
    // Update app state only after map and widgets are loaded
    this.props.onMapLoaded();
  }

  init = (response) => {
    this.view = response.view
    this.map = response.view.map;
  }

  setupWidgetsAndLayers = () => {
    loadModules([
      
        "esri/request",
        "esri/tasks/Locator",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Search",
        "esri/widgets/Expand",
        "esri/widgets/Search/SearchSource",
        "esri/widgets/Zoom",
        "esri/Graphic",
        "esri/geometry/geometryEngine",
        "esri/geometry/Point"
        
       
    ])
    .then( ([
        esriRequest,
        Locator,
        BasemapGallery,
        Search,
        Expand,
        SearchSource,
        Zoom,
        Graphic,
        geometryEngine,
        Point,
        
        
    ]) => {

      const basemapGallery = new BasemapGallery({
        view: this.view,
       
      });

      var url = "https://api-adresse.data.gouv.fr/";
     
      var customSearchSource = new SearchSource({
        placeholder: "Search Here",
        // Provide a getSuggestions method
        // to provide suggestions to the Search widget
        getSuggestions: params => {
          // You can request data from a
          // third-party source to find some
          // suggestions with provided suggestTerm
          // the user types in the Search widget
          return esriRequest(url + "search/", {
            query: {
              q: params.suggestTerm.replace(/ /g, "+"),
              limit: 6,
              lat: this.view.center.latitude,
              lon: this.view.center.longitude
            },
            responseType: "json"
          }).then(results=> {
      console.log('my res' , results);
            // Return Suggestion results to display
            // in the Search widget
            return results.data.features.map(feature=> {

              return {
                key: "name",
                text: feature.properties.label,
                sourceIndex: params.sourceIndex
              };
            });
          });
        },
        // Provide a getResults method to find
        // results from the suggestions
        getResults: params=> {
          // If the Search widget passes the current location,
          // you can use this in your own custom source
          var operation = params.location ? "reverse/" : "search/";
          var query = {};
          // You can perform a different query if a location
          // is provided
          if (params.location) {
            query.lat = params.location.latitude;
            query.lon = params.location.longitude;
          } else {
            query.q = params.suggestResult.text.replace(/ /g, "+");
            query.limit = 6;
          }
  
          return esriRequest(url + operation, {
            query: query,
            responseType: "json"
          }).then(results=> {
            // Parse the results of your custom search
           
            var searchResults = results.data.features.map(feature=> {
              // Create a Graphic the Search widget can display
              var graphic = new Graphic({
                geometry: new Point({
                  x: feature.geometry.coordinates[0],
                  y: feature.geometry.coordinates[1]
                }),
                attributes: feature.properties
              });
              // Optionally, you can provide an extent for
              // a point result, so the view can zoom to it
              var buffer = geometryEngine.geodesicBuffer(
                graphic.geometry,
                100,
                "meters"
              );
              // Return a Search Result
              var searchResult = {
                extent: buffer.extent,
                feature: graphic,
                name: feature.properties.label
              };
              
              
              return searchResult;
            });

            let searchObj={
              text : params.suggestResult.text,
              searchData : searchResults[0]
            }
            this.props.addSearchResult(searchObj)
           // this.addSearchResult.bind(this,searchResults[0])
            // Return an array of Search Results
            return searchResults;
          });
        }
      });

      let  searchWidget = new Search({
        sources :[customSearchSource],
         view: this.view,
         includeDefaultSources:false,
          container : document.createElement("div"),
          
      })

      let searchExpand= new Expand({
        view : this.view,
        content : searchWidget.domNode,
        container : "expandDiv",
        expandIconClass : "esri-icon-basemap"
      })

      // this.view.ui.add(searchWidget, {
      //   position: "top-right"
      // });

    });
  }

  setupEventHandlers = (map) => {
    loadModules([

    ], (

    ) => {

      //
      // JSAPI Map Event Handlers go here!
      //

    });
  }
}

const mapStateToProps = state => ({
  config: state.config,
  map: state.map,
  searchValues: state.searchValues
});

const mapDispachToProps = dispatch => {
  return {
    addSearchResult: (obj) => dispatch({ type: "ADD_SEARCH_RESULT", value: obj }),
  };
};

export default connect(mapStateToProps, mapDispachToProps) (Map);
