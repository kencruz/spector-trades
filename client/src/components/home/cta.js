import * as React from 'react';

import {Box, Grid, Typography, Container, TextField, Snackbar, Button, Card} from '@mui/material';

function CTA() {


  return (
    <Container component="section" sx={{ mt: 10, mb:10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Card>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'info.light',
                py: 8,
                px: 3,
              }}
            >
              <Box sx={{ maxWidth: 400 }}>
                
                <Typography variant="h2" component="h2" gutterBottom>
                  Rest and Vest
                </Typography>

                <Typography variant="h5">
                  Taste the holidays of the everyday close to home.
                </Typography>

                <Button
                  color="warning"
                  variant="contained"
                  href="/register"
                  sx={{ width: '100%', color: 'common.black', marginTop: '4em' }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Card>

        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750&q=80"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -48,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
              borderRadius: '8px'
            }}
          />

        </Grid>
      </Grid>
    </Container>
  );
}

export default CTA;
