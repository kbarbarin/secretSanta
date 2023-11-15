import React, { useEffect } from 'react'
import { auth } from '../../firebase/Firebase'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
    const navigation = useNavigate()

    useEffect(() => {
        if (auth.currentUser === null) {
            navigation('/signin')
        }
    }, [navigation])

    return <>{props.children}</>
}