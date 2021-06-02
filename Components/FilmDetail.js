import React from 'react'
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from "../api/TMDBApi";
import moment from "moment";

class FilmDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            film: undefined
        };

        this.idFilm = this.props.navigation.state.params.idFilm;

        this._loadFilm(this.idFilm);

    }

    _loadFilm(id) {
        console.log(id);
        getFilmDetailFromApi(id).then(
            data => {
                this.setState({film: data})
            }
        );

    }

    _displayFilm() {
        if (this.state.film !== undefined) {
            return (
                <ScrollView>
                    <View style={styles.content}>
                        <Image style={styles.image} source={{uri: getImageFromApi(this.state.film.poster_path)}}/>
                        <Text style={styles.title}>{this.state.film.title}</Text>
                        <Text>Date de sortie
                            : {moment(new Date(this.state.film.release_date)).format('DD/MM/YYYY')}</Text>
                        <Text>Résumé du film
                            : {this.state.film.overview}</Text>
                    </View>
                </ScrollView>
            );
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    content: {
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 300,
        margin: 5,
        backgroundColor: 'gray'
    },
    title:{
        fontSize: 22
    }
});

export default FilmDetail;
