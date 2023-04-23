import useForm from "../lib/useForm"
import Form from './styles/Form';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import DisplayError from "./ErrorMessage";

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION (
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload 
    ) {
        createProduct(data: {
            name: $name
            description: $description
            price: $price
            photo: {
                create: {
                    image: $image
                    altText: $name
                }
            }
        }) {
            id
            name
            price
            description
        }
    }
`;

export default function CreateProduct () {
    const {inputs, handleChange, clearForm, resetForm} = useForm({
        image: '',
        name: 'Bristol-00',
        description: 'Artwork from the Bristol Museum',
        price: 1000
    });

    const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs
    })

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault()
            const res = await createProduct();
            clearForm();
        }}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-aria-busy={loading}>
            <label htmlFor="image">
                    Image
                    <input required type="file" id="image" name="image" onChange={handleChange} />
                </label>
                <label htmlFor="name">
                    Name
                    <input type="text" id="name" name="name" placeholder="Art Work Name" value={inputs.name} onChange={handleChange} />
                </label>
                <label htmlFor="price">
                    Price
                    <input type="number" id="price" name="price" placeholder="Art Work Price" value={inputs.price} onChange={handleChange} />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea type="text" id="description" name="description" placeholder="Art Work Description" value={inputs.description} onChange={handleChange} />
                </label>
            <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    )
}