import { useQuery } from "@apollo/client";
import gql from 'graphql-tag'
import Head from 'next/head';
import DisplayError from "./ErrorMessage";
import { SingleProductStyles } from "./styles/SingleProductStyles";

const SINGLE_PRODUCT_QUERY = gql`
query SINGLE_PRODUCT_QUERY($id: ID!) {
  Product(where: {
    id: $id
  }) {
    name
    description
    price
    id
    photo {
        altText
        image {
            publicUrlTransformed
        }
    }
  }
}
`;

export default function SingleProduct ({id}) {
    const {data, loading, error} = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {
            id
        }
    });
    if (loading) return <p>Loading....</p>;
    if (error) return <DisplayError error={error} />
    const {Product} = data;
    return (
        <SingleProductStyles>
            <Head>
                <title>Art Store | {Product.name}</title>
            </Head>
            <img src={Product.photo.image.publicUrlTransformed} alt={Product.altText} />
            <div className="details">
                <h2>{Product.name}</h2>
                <p>{Product.description}</p>
            </div>
        </SingleProductStyles >
    )
}