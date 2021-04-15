import React from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text, ActivityIndicator } from 'react-native';

import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithText} from '../api/TMDBApi'


const styles = StyleSheet.create({
  textinput: {
    borderColor: 'black' ,
    borderWidth:1,
    marginLeft: 5,
    marginRight:5,
    height:50
  },
  margin_top: {
    marginTop: 20
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


class Search extends React.Component {

  constructor(props) {
    super(props);
    //  this._films = [];
    // utilisation de state
    this.searchedText =  "";
    this.state = { films : [], isLoading: false }
  }

  _loadFilms(){
    this.setState({isLoading:true});

  setTimeout(() =>   getFilmsFromApiWithText(this.searchedText).then(data =>
    {
      this.setState({films: data.results, isLoading: false})
    }
  ) , 2000);
  }

  _searchedTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {

      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }

  render() {
    console.log(this.state.isLoading)
    return (
      <View style={styles.margin_top}>
        <TextInput style={[styles.textinput, styles.margin_top]}
        placeholder='Titre du film'
        onChangeText={(text) => this._searchedTextInputChanged(text)}
        onSubmitEditing={() => this._loadFilms()} />
        <Button title='Rechercher' onPress={() => this._loadFilms()} />

        <FlatList
          data={this.state.films}
          keyExtractor={(item) =>  item.id.toString()  }
          renderItem={( {item} ) => <FilmItem  film={item} /> }
          />

          {this._displayLoading()}
      </View>
    );
  }

}

export default Search
