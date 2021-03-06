import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts'; 

class PrideForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            tshirt: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.email === "") {
            ToastsStore.error("Please enter a valid JnJ e-mail address");
        } else { 
            fetch('http://localhost:3001/pride', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(function() {
                ToastsStore.success("Thank you for registering! We'll see you on Saturday.")
            }).catch(function(e){
                ToastsStore.warning("Write to file failed. Please check if backend is up and running.");
            });
            this.setState({
                email: '',
                tshirt: ''
            });        
        }        
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="Description">
                <label className="FormField_Description">Johnson and Johnson will participate in the Belgium Pride Parade of 2019.<br></br>Make sure to register to get all the necessary info!</label>
            </div>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" autoComplete="off" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="tshirt">T-shirt Size</label>
                <input type="String" autoComplete="off" id="tshirt" className="FormField__Input" placeholder="Enter your T-shirt size (S, M, L, XL)" name="tshirt" value={this.state.tshirt} onChange={this.handleChange} />
            </div>
            <div className="FormField">
                  <button className="FormField__Button mr-20">Register</button>
                  <ToastsContainer classname="FormField__Button mr-20" store={ToastsStore} position="bottom_center"/>
            </div>
            </form>
          </div>
        );
    }
}

export default PrideForm;
