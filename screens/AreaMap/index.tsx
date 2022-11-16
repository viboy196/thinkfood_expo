import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Callout, Circle, Marker, Region } from "react-native-maps";
import { RootStackScreenProps } from "../../navigation/types";
import { color1 } from "../../utils/helper/Color";
export interface _Location {
  location: { lat: number; long: number };
  name: string;
}
export type LocationMaps = {
  locationArea: _Location;
  listLocationContract: Array<_Location>;
};

export default function AreaMap({ route }: RootStackScreenProps<"AreaMap">) {

  const [location, setLocation] = useState<Location.LocationObject>();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [region, setRegion] = useState<Region>({
    latitude: 20.708337,
    longitude: 106.193384,
    latitudeDelta: 0.02522,
    longitudeDelta: 0.01221,
  });
    //   useEffect(() => {
    //     if(location){
    //         setRegion()
    //     }
    //   })

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsScale={true}
        onRegionChangeComplete={(
          region: Region,
          details?: { isGesture: boolean }
        ) => {
          setRegion(region);
        }}
      >
        {/* <Marker
            coordinate={{
              latitude: locationArea.location.lat,
              longitude: locationArea.location.long,
            }}
            pinColor="black"
          >
            <Callout>
              <Text>Khu vực {locationArea.name}</Text>
            </Callout>
          </Marker> */}
        {/* {listLocationContract.map((item) => (
          <Marker
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.long,
            }}
          >
            <Callout>
              <Text>vị trí {item.name}</Text>
            </Callout>
          </Marker>
        ))} */}
      </MapView>

      <View
        style={{
          backgroundColor: color1,
          width: 10,
          height: 10,
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },

  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 65,
  },
});
