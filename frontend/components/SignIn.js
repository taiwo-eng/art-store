import Form from './styles/Form';
import useForm from "../lib/useForm";
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from "./ErrorMessage";
import Link from 'next/link';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION ($email: String!, $password: String!){
        authenticateUserWithPassword (email: $email, password: $password) {
        ... on UserAuthenticationWithPasswordSuccess {
            item {
                id
                email
                name
            }
        }
        ... on UserAuthenticationWithPasswordFailure {
            code
            message
        }
        }
    }
`;

export default function SignIn () {
    const {inputs, handleChange, resetForm} = useForm({
        email: "",
        password: ""
    });

    const [signin, {data, loading}] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY}]
    })

    async function handleSubmit(e) {
        e.preventDefault();
        await signin();
        resetForm();
    }

    const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;

    return (
        <Form method='POST' onSubmit={handleSubmit}>
            <h2>Sign In To Your Account</h2>
            <Error error={error} />
            <fieldset>
                <label htmlFor='email'>
                    Email
                    <input type='email' name='email' placeholder='Your Email Address' autoComplete='email' value={inputs.email} onChange={handleChange} />
                </label>
                <label htmlFor='password'>
                    Password
                    <input type='password' name='password' placeholder='Password' value={inputs.password} onChange={handleChange} />
                </label>
                <div className='create-new-account'>
                    <p>
                        <Link href='/signup'>
                            Sign Up
                        </Link>
                    </p>
                </div>
                <button type='submit'>Sign In</button>
            </fieldset>
        </Form>
    )
}