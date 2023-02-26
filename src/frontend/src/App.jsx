import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "./components/AppBar";
import Error from "./routes/Error";
import Home from "./routes/Home";

const theme = createTheme({
    palette: {
        type: "dark",
        text: {
            primary: "#263238",
            secondary: "#ededed",
        },
        primary: {
            main: "#b53f41",
        },
        secondary: {
            main: "#1db17b",
        },
        background: {
            default: "#303030",
            paper: "#424242",
        },
    },
});

const router = createBrowserRouter([
    {
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ],
    },
]);

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar>
                    <RouterProvider router={router} />
                </AppBar>
            </ThemeProvider>
        </>
    );
};

export default App;
