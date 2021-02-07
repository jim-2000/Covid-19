import React from 'react'
import { Avatar, Card, Grid, CardContent, Select,Paper, Table } from '@material-ui/core';
import './Header.css'

function Left({countries}) {
    return (
        <>
        <Grid item xs={12}>

            <CardContent className="MuiCard-main">
                
                    <h3>Live Cases By Country</h3>

                    <Table 
                    a = {countries}
                    />
                   {/* Some Table  */}
                    <h3>World Wide Country</h3>
                   {/* Some Table  */}
                
            </CardContent>

        </Grid>
        </>
    )
}

export default Left;
