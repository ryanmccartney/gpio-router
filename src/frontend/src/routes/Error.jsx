import { Typography, Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = ({ title = "404", message = "Not Found", showBack = false }) => {
    const navigate = useNavigate();

    const getButton = () => {
        if (showBack) {
            return (
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Back
                </Button>
            );
        }
    };
    return (
        <Grid sx={{ height: "50vh", p: 3 }} container direction="column" justifyContent="flex-end" alignItems="center">
            <Grid item>
                <Box>
                    <Typography sx={{ p: 1 }} variant="h3" color="textSecondary" align="center">
                        {title}
                    </Typography>
                    <Typography sx={{ p: 1 }} variant="h4" color="textSecondary" align="center">
                        {message}
                    </Typography>
                </Box>
                <Box sx={{ p: 1 }} textAlign="center">
                    {getButton()}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Error;
