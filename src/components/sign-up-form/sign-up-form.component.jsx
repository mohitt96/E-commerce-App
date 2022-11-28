import { useState, useContext } from "react"
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../contexts/user.context"
import './sign-up-form.styles.scss'

const defualtFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defualtFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defualtFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user)
            await createUserDocumentFromAuth(user, {displayName})
            
            resetFormFields()
        } catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email is already in use')
            } else {
                console.log("Error while creating user: ", error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value}= event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName}/>
                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password}/>
                <FormInput label="Confirm Password" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm