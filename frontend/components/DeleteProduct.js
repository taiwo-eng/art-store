import { useMutation } from "@apollo/client";
import gql from "graphql-tag"

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

export default function DeleteProduct ({ id, children }) {
    const [deleteProduct, {loading}] = useMutation(DELETE_PRODUCT_MUTATION, {variables: {id}})
    return (
        <button disabled={loading} type="button" onClick={function () {
            if (confirm('Are you sure you want to delete this item?')) {
                deleteProduct().catch(function (err) {
                    alert(err.message)
                })
            }
        }}>{children}</button>
    )
}