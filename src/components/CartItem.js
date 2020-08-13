import React from 'react';
import { Component, Fragment } from "react";
import { Grid, Typography, Paper, TextField } from '@material-ui/core';

import Card from './cartMember';

class CartItem extends Component {

    

 render() {
     
        return (
            <Fragment>
                <Card item={this.props.item}/>
            </Fragment>
        );
    }
}

export default CartItem;