import React, { Component } from 'react';
import LandingPage from './LandingPage';
import SearchBar from './SearchBar';
import axios from 'axios';
import { CssBaseline, Container } from '@mui/material';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendedRecipes: [],
            searchResults: [],
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchRecommendedRecipes();
    }

    fetchRecommendedRecipes = () => {
        const APP_ID = 'eec6d59b'; 
        const APP_KEY = 'e1fc9d587554d1ba64fc75ceda976a03'; 
        const url = `https://api.edamam.com/search?q=popular&app_id=${APP_ID}&app_key=${APP_KEY}`;

        axios.get(url)
            .then(response => {
                this.setState({ 
                    recommendedRecipes: response.data.hits,
                    isLoading: false 
                });
            })
            .catch(error => {
                this.setState({ 
                    error: error.message,
                    isLoading: false 
                });
            });
    };

    handleSearchResults = (recipes) => {
        this.setState({ searchResults: recipes });
    };

    render() {
        const { recommendedRecipes, searchResults, isLoading, error } = this.state;
        const recipesToDisplay = searchResults.length > 0 ? searchResults : recommendedRecipes;

        return (
            <div className="App">
                <CssBaseline />
                <Container>
                    <SearchBar onSearchResults={this.handleSearchResults} />
                    <LandingPage recipes={recipesToDisplay} isLoading={isLoading} error={error} />
                </Container>
            </div>
        );
    }
}

export default App;
