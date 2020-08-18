//a provider is just like the other react component, we are just gonna wrap everything in this provider component

import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            };
        default:
            return state
    }
}

export class Provider extends Component {

    state={
        track_list : [
            // {
            //     track: { track_name: 'abc' }
            // },
            // {
            //     track: { track_name: '123' }
            // },

        ],
        heading:'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))  //this will allow us to have a reducer where we can call dispatch from any consumer component to manipulate the state 
    }


    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            // console.log(res);
            this.setState({track_list: res.data.message.body.track_list});
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}   
                {/* //this is because provider is gonna wrap around every component so that we can access whatever state we put in this provider, we will be able to access through all other compoenets as long as we use consumer */}
            
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
//this is waht we import in components to be able to access the state from the context