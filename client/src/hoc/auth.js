import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';


export default function (SpecificComponent, option, adminRoute = null) {

    const dispatch = useDispatch();

    function AuthenticationCheck() {

        useEffect(() => {
            dispatch(auth()).then(response => console.log(response));
        }, []);

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}