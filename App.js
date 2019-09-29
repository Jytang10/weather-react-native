import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";

const API_KEY = "d6725d34e6290bf49d083201a6c990bb";
export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeater(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
        error: error
        })
      }
    );
  }

  _getWeater = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp, 
        name: json.weather[0].main
      })
    })
  }

  render() {
    const { isLoaded, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden="true"></StatusBar>
        {isLoaded ? (
          <Weather /> 
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather...</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 100,
  }
});
