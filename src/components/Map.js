import React from 'react'
import 'leaflet/dist/leaflet.css';



import { useMap,MapContainer,TileLayer,Marker, Popup, useMapEvents } from 'react-leaflet';



function LocationMarker() {


  const [position, setPosition] = React.useState(null)
  const map=useMap();
  map.locate()
   useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
      

    <Marker position={position} >
        <Popup>
            <div className="container text-white bg-dark">
               

                <h6>Lat:   {position.lat}</h6>
                <h6>Lng:   {position.lng}</h6>

            </div>
        </Popup>

     
      
    </Marker>
  )
}

export default function MapDemo() {


  return (
  <>


    <MapContainer center={[51.505, -0.09]} zoom={19} scrollWheelZoom={false}  className="mt-7">
   
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  /> 

  


  <LocationMarker/>



      
  
</MapContainer>
</>
  )
}
