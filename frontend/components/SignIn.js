import Form from './styles/Form';
import useForm from "../lib/useForm";
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION ($email: String!, $password: String!){
        ... on authenticationWithPasswordSuccess {
            item {
                id
                email
                name
            }
        }
    }
`;

export default function SignIn () {
    const {inputs, handleChange} = useForm({
        email: "",
        password: ""
    });

    const [sigin, {data, error, loading}] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY}]
    })

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Form method='POST' onSubmit={handleSubmit}>
            <h2>Sign In To Your Account</h2>
            <fieldset>
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