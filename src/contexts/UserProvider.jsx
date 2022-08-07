import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/Api"

// Export Context
export const UserContext = createContext()

// User 
const UserProvider = (props) => {

    // Route Navetate URL
    const navigate = useNavigate();

    // Account Details
    const [account, setAccount] = useState({})

    // Set Loading action
    const [loading, setLoading] = useState(false)

    // Set Error action
    const [error, setError] = useState({ status: false, message: '' })

    // Sign Up User
    const signUp = async (body) => {

        // Set loading status
        setLoading(true)

        // Send post action to API
        const { response, ok } = await apiPost('login', body)

        // Validate API response
        if (ok) {

            // Create Account Info
            let account = {
                'username' : body.username,
                'logged' : true,
                'role' : response.role
            }

            // Save Username
            window.localStorage.setItem('account', JSON.stringify(account))

            // Save Token in Local Storage
            window.localStorage.setItem('token', `token ${response.token}`)

            // Save Account Info
            setAccount(account)

            // Set error message
            setError({ status: false, message: '' });

            // Set loading status
            setLoading(false)

            // Redirect success view
            navigate('/')
        }
        else {

            // Set error message
            setError({ status: true, message: 'Credenciales invalidas' });

            // Set loading status
            setLoading(false)
        }
    }

    // Sign Out User
    const signOut = () => {

        // Clear Storage Data
        window.localStorage.removeItem('account')
        window.localStorage.removeItem('token')

        // Clear Account State
        setAccount({})

        // Reboot Route
        navigate('/login')
    }

    // Run to Load
    useEffect(() => {
        let account = window.localStorage.getItem('account')
        account === null ? setAccount({}) : setAccount(JSON.parse(account))
    }, [])

    // Return Constructor
    return (
        <UserContext.Provider value={{
            account, setAccount,
            signUp, signOut,
            loading, setLoading,
            error, setError
        }}>
            {props.children}
        </UserContext.Provider>
    )
};

// Export Provider
export default UserProvider;
