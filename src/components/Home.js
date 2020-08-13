import React from 'react';
import { Component, Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import CartItem from './CartItem';
import Header from './Header';
import {Redirect} from 'react-router-dom';



//variable to store cuurent word

class Home extends Component {

    state = {
        items: [],
        url :"",
        loading : false,
        redirect : false
    }
    //handles click of done button
    handleButton() {
        this.setState({ loading: true});
        var headers = {"Access-Control-Allow-Origin": "*"}
        axios.get('https://staging.api.zelish.in/zelish/shopnow/?url='+this.state.url, headers)
        .then(res => {
            res.data.data.map((item, index) => {
                item.quantity = parseFloat(item.quantity)? parseFloat(item.quantity):1;
            });
            this.setState({ items: res.data.data, loading: false});

            console.log(this.state.items);
      })

    }

    handleInput(e) {
        var value = e.target.value;
        this.setState({ url:value })
    }

     navigateToCart = () => {
        this.setState({redirect:true})
    }


    render() {
        return (
            <Fragment>
            { this.state.redirect && <Redirect to={{
    pathname: '/cart',
    state: { items: this.state.items }
}}/> } 

                {this.state.loading &&
                <LinearProgress/>
                }
                
                <Header/>

                <Grid style={{height:20}}>
                    
                </Grid>

                <Grid container >
                    <Grid container item xs={1} sm={2} md={2}>

                    </Grid>

                <Grid container item xs={7} sm={6} md={6} >
                    <TextField id="outlined-basic" placeholder="Type the URL and hit Enter" variant="outlined" fullWidth
                    value={this.state.url} onChange={(e) => this.handleInput(e)}  />
                </Grid>
                <Grid container item xs={3} sm={3} md={3}>
                    <Button variant="contained" color="primary" style={{backgroundColor:"#02AA11", marginLeft: 5,
                     paddingLeft :30, paddingRight :30}}
                     onClick={(e) => this.handleButton(e)}>Search</Button>
                </Grid>
                </Grid>
                <Grid >
                    {this.state.items.length > 0 && <h4 style={{textAlign:"center", marginTop:"10px;" }}>Ingredients List</h4>}
                    
                {this.state.items.length > 0 ?
                  this.state.items.map((item, index) => {
                      item.index = index+1;
                       return <CartItem item={item} key = {index+1} />
                 }):
                 <h4 style={{textAlign:"center", marginTop:"10px;" }}>No Ingredients Yet! Start Looking</h4>}
                </Grid>

                {this.state.items.length > 0 && 
                <Grid container style={{marginTop:10, marginBottom:10}}>
                    <Grid item xs={4} sm={4} md={4}></Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <div style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary" style={{backgroundColor:"#02AA11", marginLeft: 5,
                paddingLeft :30, paddingRight :30, paddingTop: 10, paddingBottom:10}}
                onClick={this.navigateToCart}>Shop Now</Button>
                        </div>
                       </Grid>

                </Grid>
                }


            </Fragment>
        );
    }
}

export default Home;