import React, { useEffect, useState } from 'react';
import './Header.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, FormControl, Grid, CardContent, Select,Paper, Card } from '@material-ui/core';
import m from '../me.jpg'
import InfoBox from './InfoBox'
import Mymap from './Map/Map';
import Table from './Table';
import { prettyPrinStat, sortData } from './util';
import LineGraph from './Map/LineGraph';
import "leaflet/dist/leaflet.css"



/// >>>>>>>>>>>>>>>>>>>>>> styled component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    flexGrow: 1,
    color:"tomato"
  },
  bg:{
    backgroundColor:"#ddd !important"
  }
  ,
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardMain: {
    marginTop: theme.spacing(8),
    marginRight: theme.spacing(2)
  },
  InfoBox:{
    marginTop: theme.spacing(2)
  }, 
  Country: {
    margin: theme.spacing(2),
    minHeight: theme.spacing(8)
  } 
  
}));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export default function MenuAppBar() {
  const classes = useStyles();

/// State  >>>>>>>>>>>>
const [Country, setCountry] = useState([])
const [countrySelect, setcountrySelect] = useState("worldwide")
const [CountryInfo, setCountryInfo] = useState({});
const [TableData, setTableData] = useState([])

// Map center 
const [mapCenter, setmapCenter] = useState({lat: 34.80746, lng: -40.4796})

// Map Zoom 
const [mapZoom, setmapZoom] = useState(2)
// createing circle map 
const [mapCountries, setmapCountries] = useState([])

// console.log(countrySelect) why it's call again and again
useEffect(()=> {
  // WHEN THE component load it's show all the data 
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then (data => {
    setcountrySelect("worldwide")
    setCountryInfo(data)
  })
  },[])

/// Covid Api Countrys  >>>>>>>>>>>>
// "https://disease.sh/v3/covid-19/countries"



useEffect(() => {
// GEINING ALL THE COUNTRY IN HARE 
  const getCountry =async  () => {
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((res) => res.json())
   .then((data)=> {
      const countries = data.map((country) => (
        {
          name:country.country,
          value: country.countryInfo.iso2,
          // flag: country.countryInfo.flag,

        }
      ));
      const sortedData = sortData(data)
      setTableData(sortedData) ;//<<< push all the data   in table field
      // creating country circle map
      setmapCountries(data)


      setCountry(countries);  

   });
}
   getCountry()    
}, []);



const onCountryChange = async (event) => {

  const CountryCode = event.target.value;


    const url =   
              CountryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all':
              `https://disease.sh/v3/covid-19/countries/${CountryCode}?strict=true` ;// /${CountryCode} means we are now query all the country to spacific a country

   await fetch(url)
    .then((response) => response.json() )
    .then((data) => {
    
    setcountrySelect(CountryCode)
    setCountryInfo(data);

// Change mapcenter by country select 
    setmapCenter([data.countryInfo.lat, data.countryInfo.lng])
// Changeing Map zoom by select country 
    setmapZoom(4)
// 

      // All of The data

    })
   
  // //https://disease.sh/v3/covid-19/all
};
// console.log("Country Info >>>>>>>>>>>",mapCenter)

// ==============>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>
  return (
  <div className="app">
    <div className={classes.root}>
        <Grid container  xs={12} >
          <Grid item md={8} xs={12} className="MuiAppBar-colorPrimary app_left" >
                      
              <AppBar position="static">
                <Toolbar>
                <Avatar alt="The Captaion" src={m} className={classes.large} />
                  <Typography variant="overline" className={classes.title}>
                    Covid-19 Tracker
                  </Typography>
                <Typography >
                          <FormControl className="app_dropdawon">
                            <Select                  
                                    variant="outlined"
                                    color="primary"
                                    value={countrySelect}
                                    onChange={onCountryChange}
                                    className="auto_menu_select"
                                    
                                >                        
                                   <MenuItem value="worldwide">Worldwide</MenuItem>
                                    {/* loop thorow all the menu  */}

                                  {
                                    Country.map((Country) => (
                                      <MenuItem className="auto_menu_option"  value={Country.value}>
                                        {Country.name}  </MenuItem>
              


                                    ))
                                  }
                                </Select>

                          </FormControl>
                </Typography>
                
                </Toolbar>
              </AppBar>

          <Paper style={{backgroundColor:"#f5f6fa"}} className={classes.Country}>
            
          <h3 className="country_namShow">Country Name :<span style={{ textAlign:'center', fontWeight:700}}> {CountryInfo.country} </span></h3></Paper>


            <Grid item xs={12} className="app_data">
                    <InfoBox 
                      title="CORONAVIRUS CASES"
                      cases={prettyPrinStat(CountryInfo.todayCases)}
                      total={CountryInfo.cases}
                      md={8}

                      />
                    
                    
                  <InfoBox
                              title="RECOVERED"
                              cases={prettyPrinStat(CountryInfo.todayRecovered)}
                              total={CountryInfo.recovered}
                              md={8}
                  />
            
              
                    <InfoBox 
                                title="DETH'S"
                                cases={prettyPrinStat(CountryInfo.todayDeaths)}
                                total={CountryInfo.deaths}
                    />
            </Grid>
       <Grid className={classes.Country}>
       <Mymap  
       center={mapCenter}
       zoom={mapZoom}
       countries={mapCountries}
       />
       </Grid>

        </Grid>

      <Grid item xs={12} md={4} className="app_right">
        <Card className="data_card">
            
        <CardContent>
        <h3 style={{textAlign:'center', fontWeight:'700'}}>Live Cases By Country</h3>

        <Table 
        countries={TableData}
        
        />
        {/* some thing  */}
        <h3 style={{textAlign:'center', marginTop:'15px' , fontWeight:'700'}}>World Wide New case </
        h3>
        <LineGraph />

        </CardContent>
             
            
        </Card>

        </Grid>
     </Grid>
    </div>
    <Grid container  className="" > 
         
            

       {/* Table */}
       {/* Graph */}



       {/* Map */}

    </Grid>

</div> 
  );
}
