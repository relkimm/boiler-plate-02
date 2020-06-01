import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = (props) => {

    useEffect(() => {
        axios.get('/api')
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }, []);

    const handleButtonClick = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.logoutSuccess) {
                    alert('logout success!');
                    props.history.push('/login');
                }
                else {
                    alert('logout fail');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>

            <button onClick={handleButtonClick}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage;