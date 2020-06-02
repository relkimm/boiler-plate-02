import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

const LoginPage = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('test3@naver.com');
    const [password, setPassword] = useState('12345');

    const handleEmailChange = ({ target: { value } }) => {
        setEmail(value);
    }

    const handlePasswordChange = ({ target: { value } }) => {
        setPassword(value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const body = {
            email,
            password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.tokenSuccess) {
                    alert('Login success');
                    props.history.push('/');
                } else {
                    alert('Error');
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={handleFormSubmit}
            >
                <label>Email</label>
                <input type="email" value={email} onChange={handleEmailChange} />
                <label>Password</label>
                <input type="password" value={password} onChange={handlePasswordChange} />

                <br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage);