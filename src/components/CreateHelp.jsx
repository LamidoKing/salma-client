import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from './common/Alert';
import helpService from '../services/help-service';
import ActionCableBase from './ActionCableBase';
import people from '../images/undraw3.svg';

class CreateHelp extends ActionCableBase {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      title: '',
      category: '',
      description: '',
      long: '',
      lat: '',
      hasError: false,
      message: "",
      loading: false
    };
  }
  



  async componentDidMount() {
   

      

    const categories = await helpService.categories();
    console.log(categories)
    this.setState({categories});
    this.subscription = this.consumer.subscriptions.create({channel: 'HelpsChannel', id: 1 },
     {
      received: (data) => {
        // console.log(data);
      }
    });
  };

//     getPosition (position){
//       const currentPosition = {
//         lat: position.coords.latitude,
//         long: position.coords.longitude
//       }
//       if (position.coords) return this.setState({lat: position.coords.latitude,  long: position.coords.longitude});
// console.log(currentPosition)

// this.setState({
  

// })
//     };



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = async (e) => {
    const {title, category, description, long, lat} = this.state;
    this.setState({ loading: true })
    if (title === "") {
      this.setState({ hasError: true, message: "Title is required" });
    } else if (category === '') {
      this.setState({ hasError: true, message: "Category is required" });
    } else if (description === '') {
      this.setState({ hasError: true, message: "Description is required" });
    } else if (long === '') {
      this.setState({ hasError: true, message: "Longitude is required" });
    } else if (lat === '') {
      this.setState({ hasError: true, message: "Latitude is required" });
    } else {
      this.setState({ hasError: false, message: "" });
      try {
        const response = await helpService.create({
          title, category_id: category, description, long, lat
        });
        //console.log(response);
        if (response.status === 201) {
          this.setState({
            message: 'Help created successfully.',
            title: '', category: '', description: '', long: '', lat: '',
            loading: false
          })
        } else {
          let errorMessage = '';
          let errors = response.data;
          for (let key in errors) {
            for (let error of errors[key]) {
              errorMessage +=`${key.toUpperCase()} ${error} | `;
            }
          }
          this.setState({ hasError: true, message: errorMessage, loading: false})
        }
      } catch (exception) {
        this.setState({hasError: true, message: 'An error occurred', loading: false})
      }
    }
   this.setState({ loading: false })
  }

  render() {
    const {title, category, description,  categories, hasError, message, loading} = this.state;

    let messageClasses = "alert";
    if (hasError) messageClasses += " alert-danger";
    if (!hasError && message !== "") messageClasses += " alert-success";

    return ( 
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} - Seek Help</title>
          <style>
            {`
              .page-title {
                font-size: 22px;
                letter-spacing: 2px;
                font-weight: bold;
              }
            `}
          </style>
        </Helmet>
        <div className="container-fluid ">
            <div className="row mt-3">
              <div className="col-md-12 ">
                <h2 className="page-title">REQUEST FORM</h2>
              </div>
              <div className="col-md-6 ">
                <div className="alert alert-info">Complete this form please..</div>
                <Alert messageclasses={messageClasses} message={message} />
                
                  <div className="form-group mb-2">
                    <label className="control-label">Title</label>
                    <input className="form-control" value={title} name="title" onChange={this.handleChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label className="control-label">Category</label>
                    <select className="form-control" name="category" onChange={this.handleChange} value={category}>
                      <option>-- Choose a category --</option>
                      {categories.length > 0 && categories.map(category => 
                        <option value={category.id} key={category.id}>{category.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group mb-2">
                    <label className="control-label">Description</label>
                    <textarea className="form-control" value={description} name="description" onChange={this.handleChange} />
                  </div>
                  
                  <div className="form-group mb-2">
                    <label className="control-label">Longitude</label>
                    <input className="form-control" value={this.props.long} name="long" 
                    onChange={this.handleChange} placeholder=""/>
                  </div>

                  <div className="form-group mb-2">
                    <label className="control-label">Latitude</label>
                    <input className="form-control" value={this.props.lat} name="lat" 
                    onChange={this.handleChange} placeholder=""/>
                  </div>
                  
                  <button 
                    className="btn btn-success" 
                    disabled={loading ? true : false}
                    onClick={this.handleFormSubmit}
                  >
                    {loading ? '...' : 'Submit'}
                  </button>
              </div>
              <div className="col-md-6">
              <img src={people} alt="" style={{ width: '70%', height:'95%' }}/>

              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}
 
export default CreateHelp;