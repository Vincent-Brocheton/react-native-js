import React from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';

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
  }
})


class Search extends React.Component {

  constructor(props) {
    super(props);
    this._films = [];
  }

  _loadFilms(){
    getFilmsFromApiWithText("harry").then(data =>
      {
        this._films = data.results;
        this.forceUpdate();
      }
    );
  }

  render() {
    return (
      <View style={styles.margin_top}>
        <TextInput style={[styles.textinput, styles.margin_top]} placeholder='Titre du film' />
        <Button title='Rechercher' onPress={() => this._loadFilms()} />

        <FlatList
          data={this._films}
          keyExtractor={(item) =>  item.id.toString()  }
          renderItem={( {item} ) => <FilmItem  film={item} /> }
          />
      </View>
    );
  }

}

export default Search
