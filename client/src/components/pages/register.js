import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm"

const registerUrl = "http://localhost:3200/auth/register"


export default function Register() {

    const initialState = {
        email: "",
        password: "",
        age: 0,
        fullName: ""
    }
    const [data, handleChange] = useCustomForm(initialState)


    const handleRegister = async () => {
        console.log(data)
        // const result = await axios.post(registerUrl, this.state)
        // const { message, redirect } = result.data
        // alert(message)
        // if (redirect) this.props.history.push("/signIn")
    }


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div>
                <Avatar>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                     </Typography>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="age"
                        label="age"
                        type="number"
                        id="age"
                        autoComplete="age"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="fullName"
                        label="fullName"
                        type="fullName"
                        id="fullName"
                        autoComplete="fullName"
                        onChange={handleChange}
                    />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                    >
                        Register
                        </Button>

                </form>
            </div>

        </Container>
    );
}



