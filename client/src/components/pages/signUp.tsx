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

const registerUrl = "http://localhost:3200/auth/register"

// const useStyles = makeStyles(theme => ({
//     '@global': {
//         body: {
//             backgroundColor: theme.palette.common.white,
//         },
//     },
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));
// const classes = useStyles();
export default class SignUp extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            email: "",
            password: "",
            age: 0,
            fullName: ""
        }
    }

    handleOnChange = (event: any) => {
        const { target } = event;
        this.setState({
            [target.name]: target.value
        })
    }

    handleRegister = async () => {
        const result = await axios.post(registerUrl, this.state)
        const { message, redirect } = result.data
        alert(message)
        if (redirect) this.props.history.push("/signIn")
    }

    render() {
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
                            onChange={this.handleOnChange}
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
                            onChange={this.handleOnChange}
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
                            onChange={this.handleOnChange}
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
                            onChange={this.handleOnChange}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleRegister}
                        >
                            Register
                        </Button>

                    </form>
                </div>

            </Container>
        );
    }

}

// export default withStyles(useStyles)(SignUp);
