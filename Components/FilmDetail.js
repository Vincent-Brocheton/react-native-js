import React from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from "../api/TMDBApi";
import moment from "moment";
import {connect} from "react-redux";

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
        getFilmDetailFromApi(id).then(
            data => {
                this.setState({film: data})
            }
        );

    }

    _displayFavoriteImage() {
        let source = require('../img/EmptyHeart.png');
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            source = require('../img/heart.png')
        }
        return (<Image style={styles.favorite_image} source={source}/>)
    }

    _toggleFavorite() {
        const action = {
            type: 'TOGGLE_FAVORITE',
            value: this.state.film
        };
        this.props.dispatch(action);
    }

    _displayFilm() {
        if (this.state.film !== undefined) {
            return (
                <ScrollView>
                    <View style={styles.content}>
                        <Image style={styles.image} source={{uri: getImageFromApi(this.state.film.poster_path)}}/>
                        <Text style={styles.title}>{this.state.film.title}</Text>
                        <TouchableOpacity onPress={() => this._toggleFavorite()}>
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
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
    title: {
        fontSize: 22
    },
    favorite_image:{
        width: 40,
        height: 40
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(FilmDetail)
