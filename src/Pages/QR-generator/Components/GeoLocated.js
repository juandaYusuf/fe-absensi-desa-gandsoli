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
        {
            coordinate: "geolocation not available"
        }
    ) : !isGeolocationEnabled ? (
        {
            coordinate: "please enable locations service"
        }
    ) : coords && ({
        coordinate : {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
    })

    // return !isGeolocationAvailable ? (
    //     <div>Your browser does not support Geolocation</div>
    // ) : !isGeolocationEnabled ? (
    //     <div>Geolocation is not enabled</div>
    // ) : coords ? (
    //      <a href={`https://www.google.com/maps/search/?api=1&query=-6.2114,106.8446`}>Google Maps</a>
    //      <a href={`https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`}>Google Maps</a>
    // ) : (
    //     <div>Getting the location data&hellip; </div>
    // );
};
export default UserGeoLocated