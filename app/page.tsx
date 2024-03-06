import { Grid, Paper, Typography } from "@mui/material";


export default function Agenda() {
  return (
    <Grid container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh'
    }
    }>
      <Grid item xs={12} md={12} sx={{
        display: 'flex',
        justifyContent: 'center',

      }}>
        <Paper elevation={3} sx={{
          padding: 4,
          textAlign: 'center',
          backgroundColor: 'gray',
          color: 'white'
        }
        }>
          <Typography variant="h4">Agenda</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
