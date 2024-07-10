import { CircularProgress, Grid, Box } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#b0c4de', // Fondo #b0c4de
        padding: 4 
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: '#d3d3d3', 
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '200px'
        }}
      >
        <CircularProgress sx={{ color: '#9fa6b2' }} /> {/* Cambiado el color a #9fa6b2 */}
      </Box>
    </Grid>
  );
};
