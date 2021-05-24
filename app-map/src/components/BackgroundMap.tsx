import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import styled, { css } from "styled-components";
import Marker from "./Marker/Marker";
import StartMarker from "./Marker/StartMarker";
import Car from "./Marker/Car";
const MapsWrapper = styled.div`
  z-index: auto;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const BackgroundMap = (props: any) => {


  const [center, setCenter] = useState({ lat: 37.502776, lng:127.0625817 });
  const [zoom, setZoom] = useState(16);
  return (
   
    <MapsWrapper>
      <Wrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >

          <StartMarker lat = {37.5032983} lng={127.0611301}></StartMarker>
          <Car lat={37.502776} lng={127.0625817}></Car>
          <Marker lat={37.5032941} lng={127.0633241}></Marker>
        </GoogleMapReact>
      </Wrapper>
    </MapsWrapper>
  );
};

export default BackgroundMap;
