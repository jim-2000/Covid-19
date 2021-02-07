import React from 'react'
import './map.css'
import { MapContainer as LeafletMap , TileLayer } from 'react-leaflet';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { showDataOnmap } from '../util'

function Mymap({countries,center,casesType, zoom}) {


    return (
        <div className="map" >
           
           <LeafletMap center={center} zoom={zoom}>
           <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.facebook.com/Exceptional.jim404/">Developerjim</a> Worked'
        />
               {showDataOnmap(countries,casesType)}
           </LeafletMap>
            
        </div>
    )
}


export default Mymap;
