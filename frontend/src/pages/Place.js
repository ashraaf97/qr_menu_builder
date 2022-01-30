import { IoMdArrowBack } from "react-icons/io";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import React, {useEffect, useState, useContext} from "react";

import { fetchPlace } from "../apis";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";

const Place = () => {
    const [place, setPlace] = useState({});

    const auth = useContext(AuthContext);
    const params = useParams();
    const history = useHistory();

    const onBack = () => history.push("/places");

    const onFetchPlace = async () => {
        const json = await fetchPlace(params.id, auth.token);
        if (json) {
            setPlace(json);
        }
    };

    useEffect(() => {
        onFetchPlace();
    }, []);

    return (
        <MainLayout>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <div className="d-flex align-items-center">
                            <Button variant="link" onClick={onBack}>
                                <IoMdArrowBack size={25} color="black"/>
                            </Button>
                            <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>
                        </div>
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
};

export default Place;