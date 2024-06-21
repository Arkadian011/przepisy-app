import React, { Component } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography} from '@mui/material';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            isLoading: false,
            error: null
        };
    }

    handleInputChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSearch = () => {
        this.setState({ isLoading: true, error: null });
        const APP_ID = 'eec6d59b'; 
        const APP_KEY = 'e1fc9d587554d1ba64fc75ceda976a03'; 
        const url = `https://api.edamam.com/search?q=${this.state.query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

        axios.get(url)
            .then(response => {
                this.props.onSearchResults(response.data.hits);
                this.setState({ isLoading: false });
            })
            .catch(error => {
                this.setState({ 
                    error: error.message,
                    isLoading: false 
                });
            });
    };

    render() {
        const { query, isLoading, error } = this.state;

        return (
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Recipes
                </Typography>
                <TextField 
                    label="Search" 
                    variant="outlined" 
                    fullWidth 
                    value={query}
                    onChange={this.handleInputChange}
                    sx={{ marginBottom: '20px' }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={this.handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </Button>
                {error && (
                    <Typography variant="h6" component="div" color="error" sx={{ marginTop: '20px' }}>
                        Error: {error}
                    </Typography>
                )}
            </Container>
        );
    }
}

export default SearchBar;
