import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface CustomProps {
    hasError: Boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3a3a3a;
    margin-top: 80px;
    max-width: 550px;
`;

export const Form = styled.form<CustomProps>`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input {
        flex: 1;
        height: 70px;
        border: 0;
        padding: 0 24px;
        color: #3a3a3a;
        border-radius: 5px 0 0 5px;
        border: 2px solid #fff;
        border-right: 0;

        ${(props) =>
            props.hasError &&
            css`
                border-color: #c53030;
            `}

        &::placeholder {
            color: #a8a8b3;
        }
    }

    button {
        width: 210px;
        height: 70px;
        background: #04d361;
        border: 0;
        color: #fff;
        font-weight: bold;
        border-radius: 0 5px 5px 0;
        transition: background 0.2s;

        &:hover {
            background: ${shade(0.2, '#04d361')};
        }
    }
`;

export const Error = styled.span`
    color: #c53030;
    display: block;
    margin-top: 8px;
`;

export const Repositories = styled.div`
    max-width: 700px;
    margin-top: 80px;

    a {
        text-decoration: none;
        display: flex;
        width: 100%;
        align-items: center;
        padding: 24px;
        background: #fff;
        transition: transform 0.2s;

        &:hover {
            transform: translateX(10px);
        }

        & + a {
            margin-top: 16px;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        div {
            margin: 16px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            strong {
                font-size: 20px;
                color: #3d3d4d;
            }

            p {
                font-size: 18px;
                margin-top: 4px;
                color: #a8a8b3;
            }
        }
        svg {
            margin-left: auto;
            color: #cbcbd6;
        }
    }
`;
