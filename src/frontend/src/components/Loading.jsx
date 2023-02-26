import { Box, Grid, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Grid sx={{ height: "50vh", p: 3 }} container direction="column" justifyContent="flex-end" alignItems="center">
            <Grid item>
                <Box>
                    <CircularProgress />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Loading;
