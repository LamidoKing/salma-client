import React from 'react';
import userService from '../services/user-service';
// import GoogleMapReact from 'google-map-react';
import Mark from './common/Mark';
import ActionCableBase from './ActionCableBase';
import helpService from '../services/help-service';
import Helmet from 'react-helmet';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Map from './Map'
import './Home.css'


class Home extends ActionCableBase {
  state = {
    user: null,
    // center: {
  
    //   lat: -1.2717025,
    //   lng: 36.8380528
    // },
    // zoom: 13,
    helps: [],
    showModal: false,
    help: null
  }

  async componentDidMount() {
    const helps = await helpService.getHelps();
    if (helps) this.setState({helps});
    this.setState({user: userService.getUser()});
    this.notification = this.consumer.subscriptions.create({channel: 'HelpListChannel'}, {
      connected: () => {
        // console.log('connected to help list channel')
      },
      received: data => {
        this.setState({helps: data.helps})
      }
    })
  }

  handleBoundsChange = async (center, zoom, bounds, marginBounds) => {
    const [topLat, leftLong, bottomLat, rightLong] = bounds;
    const helps = await helpService.getHelpsByCoordinates(topLat, leftLong, bottomLat, rightLong);
    if (helps) this.setState({helps});
  }
 
  render() {
    const { helps, showModal, help } = this.state;

    return (
      <React.Fragment>
       <Helmet>
         <style type="text/css">{`
          body {
            background-color: rgb(222, 217, 251);
          }
          #map {
            height: 100vh;
          }   
          @media screen and (min-width: 700px) {
            .help-list {
              height: 78vh;
              overflow: scroll;
            }
          }
          .stats {
            text-align: center;
          }
          .stat-title {
            font-size: 18px;
            letter-spacing: 5px;
            color: #6b55e4;
            font-weight: bold;
          }
          .stat-value {
            font-size: 50px;
            font-weight: bold;
            line-height: 1;
          }
          .meta {
            font-size: 12px;
          }
          .card-text {
            font-size: 14px !important;
            color: #666;

          }
          .label.category {
            padding: 2px 8px;
            color: white; 
            border-radius: 7px; 
            font-weight: bold
          }
          @media screen and (max-width: 759px) {
            #map {
              height: 50vh;
            }
          }
          .modal-header {
            background-color: #ec13b4;
            color: #fff;
          }
          .modal-title {
            font-size: 16px;
            letter-spacing: 2px;
          }
          .modal .description {
            font-size: 14px;
            text-align: justify;
            overflow: wrap
          }
          
        `}</style>
       </Helmet>
       <div className="row">
        <div className="col-md-8 col-sm-12">
        
         
            <Map>
             
            {
                helps && helps.map((help) => {
                  return <Mark lat={help.lat} help={help}
                  lng={help.long} handleOpen={() => this.handleModalOpen(help)} 
                  key={help.id} type={help.category.color} /> 
                })
              }
            
              </Map>
          
        </div>
        <div className="col-md-4 bg-display">
          <div className="stats">
            <p className="stat-title text-white mt-1">UNFULFILLED</p>
            <p className="stat-value text-white">{helps.length}</p>
          </div>
          
          <div className="help-list ">
            {helps && helps.length > 0 ? helps.map(help => (
            <div className="card mb-3 " key={help.id}>
              <div className="card-header">
                {help.title}
              </div>
              <div className="card-body">
                <div className="row meta">
                  <div className="col-md-6"><span className="label category" style={{ backgroundColor: help.category.color }}>{help.category.name}</span></div>
                  <div className="col-md-6 text-end">Posted <span style={{ fontWeight: 'bold' }}>
                    {moment(help.created_at).fromNow()}
                  </span></div>
                </div>
                <p className="card-text">{help.description.substring(0, 70)}...
                  <Link as="a" onClick={() => this.handleModalOpen(help)}>View Details</Link>
                </p>
              </div>
              <div className="card-footer text-end" style={{ fontSize: 12 }}>
                Requested by <span style={{ fontWeight: 'bold'}}>{help.user.first_name} {help.user.last_name}</span>
              </div>
            </div>
            ))
            : 
            <div className="alert alert-info">No help found</div>}
          </div>
          
        </div>
        <Modal
          show={showModal}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
        { help && 
          <>
            <Modal.Header>
              <Modal.Title>{ help.title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-3" style={{ fontSize: '13px', lineHeight: 1}}>
                  <p><span className="label category" style={{ backgroundColor: help.category.color }}>{help.category.name}</span></p>
                  <p>By <strong>{ help.user.first_name } { help.user.last_name }</strong></p>
                  <p><span style={{ fontWeight: 'bold' }}>
                    {moment(help.created_at).fromNow()}
                  </span>
                  </p> 
                </div>
                <div className="col-9 description">
                  { help.description }
                </div>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Link to={`/help/${help.id}`} className="btn btn-success">
                { help.user_id === this.state.user.id ? 'View Offers' : 'Offer Help' }
              </Link>
            </Modal.Footer>
          </>
        }
        </Modal>
      </div>
      </React.Fragment>
    );
  }
  
  handleClose = () => {
    this.setState({showModal: false});
  }

  handleModalOpen = (help) => {
    this.setState({help, showModal: true});

    console.log("click")
  }

}
 
export default Home;