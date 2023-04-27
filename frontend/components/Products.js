import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import { ProductListStyles } from './styles/ProductListStyles';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
        id
        name
        description
        price
        photo {
        id
        image {
            publicUrlTransformed
        }
        }
    }
}
`;

export default function Products ({page}) {
    const {data, error, loading} = useQuery(ALL_PRODUCTS_QUERY, {
        variables: {
            first: perPage,
            skip: page * perPage - perPage
        }
    });
    if (loading) return <p>Loading.....</p>
    if (error) return <p>{error}</p>
    return (
        <div>
            <ProductListStyles>
            {data.allProducts.map(product => <Product key={product.id} product={product} />)}
            </ProductListStyles>
        </div>
    )
}