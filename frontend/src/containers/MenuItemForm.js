import React, {useState, useContext, useRef} from "react";
import {Button, Form, Popover, Overlay} from "react-bootstrap";
import {RiPlayListAddFill} from "react-icons/ri";
import {toast} from "react-toastify";

import {addCategory} from "../apis";
import AuthContext from "../contexts/AuthContext";


const MenuItemForm = ({place, onDone}) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryFormShow, setCategoryFormShow] = useState(false);
    const [category, setCategory] = useState("");

    const target = useRef(null);

    const auth = useContext(AuthContext);

    const onAddCategory = async () => {
        const json = await addCategory({name: categoryName, place: place.id}, auth.token);
        console.log(json)
        if (json) {
            toast(`Category ${json.name} was created.`, {type: "success"});
            setCategory(json.id);
            setCategoryName("");
            setCategoryFormShow(false);
            onDone();
        }
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <div className="d-flex align-items-center">

                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option/>
                        {place?.categories?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Control>

                    <Button ref={target} variant="link" onClick={() => setCategoryFormShow(true)}>
                        <RiPlayListAddFill size={25}/>
                    </Button>

                    <Overlay
                        show={categoryFormShow}
                        target={target.current}
                        placement="bottom"
                        rootClose
                        onHide={() => setCategoryFormShow(false)}
                    >
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Category</Popover.Title>
                            <Popover.Content>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Category Name"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="standard" block onClick={onAddCategory}>
                                    Add Category
                                </Button>
                            </Popover.Content>
                        </Popover>

                    </Overlay>


                </div>
            </Form.Group>
        </div>
    )
}

export default MenuItemForm;
