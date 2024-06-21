import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const LandingPage = ({ recipes, isLoading, error }) => {
    if (isLoading) {
        return <Typography variant="h5" component="div">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h5" component="div">Error: {error}</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {recipes.length > 0 ? 'Recipes' : 'No Recipes Found'}
            </Typography>
            <Grid container spacing={4}>
                {recipes.map((recipe, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}>
                            <CardMedia
                                component="img"
                                alt={recipe.recipe.label}
                                height="140"
                                image={recipe.recipe.image}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {recipe.recipe.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Calories:</strong> {recipe.recipe.calories.toFixed(2)}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    href={recipe.recipe.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    sx={{ marginTop: '10px' }}
                                >
                                    View Recipe
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default LandingPage;

