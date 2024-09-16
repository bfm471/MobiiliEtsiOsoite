import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.283790,
    longitude: 24.905580,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })
  const api_key = process.env.EXPO_PUBLIC_API_KEY;

  const handlePress = () => {
    getCoordinates();
    setAddress('')
  }

  const getCoordinates = () => {
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => setRegion({...region, latitude:data[0].lat, longitude:data[0].lon}))  
    .catch(error => console.error(error))
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker 
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}
        />
      </MapView>
      <View style={{ flex: 1 }}>
        <TextInput 
        style={{ width: '100%', borderWidth:1, fontSize: 20 }}
        placeholder='Enter address'
        onChangeText={text => setAddress(text)}
        value={address}/>
      </View>
      <View>
        <Button title='SHOW' onPress={handlePress} />
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '85%'
  }
});
