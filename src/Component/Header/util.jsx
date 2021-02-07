import React from 'react'
import numeral from 'numeral'
import {Circle, Popup} from 'react-leaflet'


const casesTypeColor = {
    cases: {
        hex: "#CC1034",
        multiplier: 1000,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
}

export const prettyPrinStat = (stat) => 
  stat ? `+${numeral(stat).format("0.00a")}` : '+0'



export const sortData = (data) =>{
    const sortedData=[...data];

return  sortedData.sort((a,b)=>(a.cases > b.cases ? -1 : 1) )

    // sortedData.sort((a,b)=> {
  
    //     if (a.cases > b.cases){
    //         return -1;
    //     }else {
    //         return 1;
    //     }
    // })
    // return sortedData;
}
//// Drawing Circle in the map 
export const showDataOnmap = (data, casesType="cases")=> (
    data.map(country => (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={ casesTypeColor[casesType].hex}
        fillColor= {casesTypeColor[casesType].hex}
        redius ={
            Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
            }

        >
            <Popup>
            <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
            </Popup>
        </Circle>

    ))
);