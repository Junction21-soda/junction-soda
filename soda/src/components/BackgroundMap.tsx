import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import styled, { css } from "styled-components";
import Marker from "./Marker/Marker";
import StartMarker from "./Marker/StartMarker";
const MapsWrapper = styled.div`
  z-index: auto;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const BackgroundMap = (props: any) => {

  const [center, setCenter] = useState({ lat: 37.4988266, lng: 127.0586583 });
  const [zoom, setZoom] = useState(16);
  return (
   
    <MapsWrapper>
      <Wrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDnDOX7aho2uKHmv9HQTu085LxJ76Wt9FE" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
{/* 37.4999974,127.0562209 */}
          <StartMarker lat={37.5032941} lng={127.0633241}></StartMarker>
          <Marker lat = {37.5032983} lng={127.0611301}></Marker>
        </GoogleMapReact>
      </Wrapper>
    </MapsWrapper>
  );
};

export default BackgroundMap;
