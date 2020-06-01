import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const RegisterPage = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = ({ target: { value } }) => {
        setEmail(value);
    }

    const handleNameChange = ({ target: { value } }) => {
        setName(value);
    }

    const handlePasswordChange = ({ target: { value } }) => {
        setPassword(value);
    }

    const handleConfirmPasswordChange = ({ target: { value } }) => {
        setConfirmPassword(value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) return alert('비밀번호는 일치해야 합니다.');

        const body = {
            email,
            name,
            password
        };

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.registerSuccess) {
                    alert('resgiter success');
                    props.history.push('/login');

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
                <label>email</label>
                <input type="email" value={email} onChange={handleEmailChange} />
                <label>name</label>
                <input type="text" value={name} onChange={handleNameChange} />
                <label>password</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <label>confirm password</label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                <br />
                <button>register</button>
            </form>
        </div>
    )
}

export default RegisterPage;