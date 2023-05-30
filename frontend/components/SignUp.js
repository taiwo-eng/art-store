import Form from './styles/Form';
import useForm from "../lib/useForm";
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from "./ErrorMessage";
import Link from 'next/link';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser(data: {
            name: $name,
            email: $email,
            password: $password
        }) {
            id
            email
            name
        }
    }
`;

export default function SignUp () {
    const {inputs, handleChange, resetForm} = useForm({
        name: "",
        email: "",
        password: ""
    });

    const [signup, {data, loading, error}] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    })

    async function handleSubmit(e) {
        e.preventDefault();
        await signup().catch(console.error)
        resetForm();
    }

    if (data?.createUser) {
        return (
            <p>signed up with ${data?.createUser.email} - Please go ahead and sign in!</p>
        )
    }

    return (
        <Form method='POST' onSubmit={handleSubmit}>
            <h2>Create A New Account</h2>
            <Error error={error} />
            <fieldset>
            <label htmlFor='name'>
                    Name
                    <input type='name' name='name' placeholder='Your Full Name' autoComplete='name' value={inputs.name} onChange={handleChange} />
                </label>
                <label htmlFor='email'>
                    Email
                    <input type='email' name='email' placeholder='Your Email Address' autoComplete='email' value={inputs.email} onChange={handleChange} />
                </label>
                <label htmlFor='password'>
                    Password
                    <input type='password' name='password' placeholder='Password' value={inputs.password} onChange={handleChange} />
                </label>
                <button type='submit'>Sign In</button>
            </fieldset>
        </Form>
    )
}