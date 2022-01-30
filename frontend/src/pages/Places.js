import { Row, Col} from "react-bootstrap";
import React, {useEffect,useState, useContext } from 'react';
import styled from "styled-components";

import { fetchPlaces } from "../apis";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../contexts/AuthContext";

const Place = styled.div`
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        transform: scale(1.05);
    }
    > div {
        background-size: cover;
        height: 200px;
        border-radius: 5px;
    }
    > p {
        margin-top: 5px;
        font-size: 20px;
        font-weight: bold;
    }
`;


const Places = () => {
    const [places,setPlaces] = useState([]);
    const auth = useContext(AuthContext);

    const onFetchPlaces = async () => {
        const json = await fetchPlaces(auth.token);
        if (json) {
            setPlaces(json);
        }
    };

    useEffect(() => {
        onFetchPlaces();
    }, []);

    return (
        <MainLayout>
            <h3>My Places</h3>
            <Row>
                {places.map((place) => (
                    <Col key={place.id} lg={4}>
                        <Place>
                            <div style={{ backgroundImage: `url(${place.image})` }}></div>
                            <p>{place.name}</p>
                        </Place>
                    </Col>
                ))}
            </Row>
        </MainLayout>
    )
}

export default Places;