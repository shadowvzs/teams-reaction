import { Grid } from '@mui/material';
import React from 'react';
import ChatContainer from './ChatComponent/Index';

function App() {

    return (
        <Grid container justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <Grid item>
                <ChatContainer />
            </Grid>
        </Grid >

    );
}

export default App;