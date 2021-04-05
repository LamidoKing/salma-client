import React, { Component } from "react";
import { Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Link} from 'react-router-dom'

// import redMarker from "../../images/red-marker.svg";
// import blackMarker from "../../images/black-marker.svg";
import { Helmet } from "react-helmet";
// import { latLng } from "leaflet";

class Mark extends Component {
  state = {
    defaultWidth: 30,
  };

  handleMouseOver = e => {
    // e.target.width = 45;
    console.log("click")
  };

  handleMouseOut = e => {
    e.target.width = this.state.defaultWidth;
  };


  render() {


    return (
      <React.Fragment>
        <Helmet>
          <style>{`
            .marker {
              cursor: pointer
            }
          `}</style>
        </Helmet>
      

        <Marker 
         position={[this.props.lat,this.props.lng]}
        //  width={this.state.defaultWidth}
         className="marker"
        //  onMouseOver={this.handleMouseOver}
        //  onMouseLeave={this.handleMouseOut}
        //  eventHandlers={{
        //   click: this.props.handleopen
        // }}
        

         >
              <Popup>
                <div className="card bg-dark text-white">
                <h1>{this.props.help.title}</h1>
                <p>{this.props.help.description}</p>
                <Link to={`/help/${this.props.help.id}`} className="btn btn-success text-white">
                  Offer Help
              </Link>

                </div>
                
          
        </Popup>
           
           </Marker>
      </React.Fragment>
    );

  }
}

export default Mark;
