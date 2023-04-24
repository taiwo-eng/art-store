import styled from "styled-components";

export const SingleProductStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items: top;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }
`;