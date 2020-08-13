import React from 'react';
import { Component, Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';
import OrderItem from './OrderItem';


//variable to store cuurent word

class Cart extends Component {

    state = {
        url :"",
        loading : false,
        redirect : false,
        cartItems : []
    }

    

    
    //handles click of done button
    
    componentDidMount() {
        const items = this.props.location.state.items;
        const withoutNull = items.filter(v => v.itemId !== null && v.quantity !==null);
        
        
        var myJsonString = JSON.stringify(withoutNull);

        console.log(myJsonString);
        axios.post('https://staging.api.zelish.in/zelish/shopnow/shoppingList', myJsonString, {
            headers: {
                'Content-Type': 'application/json',
            }})
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({cartItems: res.data.data})
      })
      }

    handleInput(e) {
        var value = e.target.value;
        this.setState({ url:value })
    }


    render() {
        return (
            <Fragment>
                {this.state.loading &&
                <LinearProgress/>
                }
                
                <Header/>

                <Grid >
                    {this.state.cartItems.length > 0 && <h4 style={{textAlign:"center", marginTop:"10px;" }}>Cart Items List</h4>}
                    
                {this.state.cartItems.length > 0 ?
                  this.state.cartItems.map((item, index) => {
                      item.index = index+1;
                       return <OrderItem item={item} key = {index+1} />
                 }):
                 <h4 style={{textAlign:"center", marginTop:"10px;" }}>No Ingredients Yet! Start Looking</h4>}
                </Grid>

                {this.state.cartItems.length > 0 && 
                <Grid container style={{marginTop:10, marginBottom:10}}>
                    <Grid item xs={4} sm={4} md={4}></Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <div style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary" style={{backgroundColor:"#02AA11", marginLeft: 5,
                paddingLeft :30, paddingRight :30, paddingTop: 10, paddingBottom:10}}
                onClick={this.navigateToCart}>Confirm Order</Button>
                        </div>
                       </Grid>

                </Grid>
                }

            </Fragment>
        );
    }
}

export default Cart;