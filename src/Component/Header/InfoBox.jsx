import React from 'react'
import './Header.css'

import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({title,cases, total}) {
    return (
        <Card className="infobox">
            <CardContent >
                <Typography style={{textDecoration:'underline'}} className="infoBox_title" color="textSecondary" variant="h6" >
                    {title}
                </Typography>
                <Typography className="infoBox_cases" color="secondary" variant="" >
                   Today  {cases} 
                </Typography>
                <Typography className="infoBox_total" color="textPrimary" variant="h5" >
                Total  {total}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox;
