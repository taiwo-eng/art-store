import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import { ProductListStyles } from './styles/ProductListStyles';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
    allProducts {
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

export default function Products () {
    const {data, error, loading} = useQuery(ALL_PRODUCTS_QUERY);
    if (loading) return <p>Loading.....</p>
    if (error) return <p>{error.message}</p>
    return (
        <div>
            <ProductListStyles>
            {data.allProducts.map(product => <Product key={product.id} product={product} />)}
            </ProductListStyles>
        </div>
    )
}