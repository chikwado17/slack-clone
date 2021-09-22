import React, { Component } from 'react';
import { app } from '../../firebase/firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
    }

    //handle input values change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //function to check if form input is empty
    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }

    //function to check if password length is less than 6 and to check if password matches each other
    isPasswordValid = ({ password, passwordConfirmation }) => {
        if(password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        }else if (password !== passwordConfirmation) {
            return false;
        }else {
            return true;
        }
    }


    //function to check if form inputs are valid
    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {

            error = { message: 'Fill in all fields' };
            this.setState({ errors : errors.concat(error) })
            return false;
        }else if(!this.isPasswordValid(this.state)) {

            error = { message: 'Password is invalid' };
            this.setState({ errors : errors.concat(error) })
            return false;
        }else {
            return true;
        }

    }


    //function to display the errors
    displayErrors = (errors) => {
        return errors.map((error, i) => {
            return (
                <p key={i}>{error.message}</p>
            )
        }) 
    }

    //functiont to handle input errors
    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
        ) 
        ? "error" 
        
        : ""
    }
 

    //handle registration form submit
    handleOnSubmit = async (event) => {
        event.preventDefault();
        if(this.isFormValid()) {

            this.setState({
                errors: [],
                loading: true
            })
            
            app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((createdUser) => {
                    console.log(createdUser);
                    this.setState({ loading: false })
                })
                .catch(err => {

                    this.setState({ 
                        errors:  this.state.errors.concat(err),
                        loading: false
                    })
            })
        }
    }


    

    render() { 
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;

        return ( 
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="teal" textAlign="center">
                        <Icon name="sign-out" color="teal" />
                        Register
                    </Header>
                    <Form onSubmit={this.handleOnSubmit} size="large">
                        <Segment stacked>
                            <Form.Input className={this.handleInputError(errors, 'username')} value={username} onChange={this.handleInputChange} fluid name="username" icon="user" iconPosition="left" placeholder="Username" type="text" />
                            <Form.Input className={this.handleInputError(errors, 'email')} value={email} onChange={this.handleInputChange} fluid name="email" icon="mail" iconPosition="left" placeholder="User Email" type="email" />
                            <Form.Input className={this.handleInputError(errors, 'password')} value={password} onChange={this.handleInputChange} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" type="password" />
                            <Form.Input className={this.handleInputError(errors, 'passwordConfirmation')} value={passwordConfirmation} onChange={this.handleInputChange} fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" type="password" />
                            <Button disabled={loading} className={loading ? 'loading': ''} color="teal" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message color="orange">
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
         );
    }
}
 
export default Register;