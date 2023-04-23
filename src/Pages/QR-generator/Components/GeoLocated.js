import React from "react";
import { useGeolocated } from "react-geolocated";

const UserGeoLocated = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
                <a href={`https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`}>Google Maps</a>
        // <table>
        //     <tbody>
        //         <tr>
        //             <td>latitude</td>
        //             <td></td>
        //         </tr>
        //         <tr>
        //             <td>longitude</td>
        //             <td></td>
        //         </tr>
        //         <tr>
        //             <td>altitude</td>
        //             <td>{coords.altitude}</td>
        //         </tr>
        //         <tr>
        //             <td>heading</td>
        //             <td>{coords.heading}</td>
        //         </tr>
        //         <tr>
        //             <td>speed</td>
        //             <td>{coords.speed}</td>
        //         </tr>
        //     </tbody>
        // </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default UserGeoLocated;