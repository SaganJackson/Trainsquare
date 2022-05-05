import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import debug from 'sabio-debug';

const _logger = debug.extend('InventoryTable');

const InventoryTable = (props) => {
    const aInventoryItem = props.invtry;
    _logger('inventory props', props, aInventoryItem);

    const onLocalInventoryRowClicked = (e) => {
        e.preventDefault();
        props.onInventoryRowClicked(props.invtry, e);
    };

    const navigate = useNavigate();

    const handleEditInventoryBtn = () => {
        const stateForTransport = { type: 'INVENTORY_VIEW', payload: aInventoryItem };
        navigate(`/inventory/edit/${aInventoryItem.id}`, { state: stateForTransport });
    };

    return (
        <Card>
            <Card.Body>
                <Table responsive className="table-centered mb-0">
                    <tbody>
                        <tr>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">{aInventoryItem.workShopName}</h5>
                                <span className="text-muted font-13">Workshop Name</span>
                            </td>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">{aInventoryItem.summary}</h5>
                                <span className="text-muted font-13">Description</span>
                            </td>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">${aInventoryItem.basePrice}</h5>
                                <span className="text-muted font-13">Base Price</span>
                            </td>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">{aInventoryItem.quantity}</h5>
                                <span className="text-muted font-13">Quantity</span>
                            </td>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">{aInventoryItem.createdBy.firstName}</h5>
                                <span className="text-muted font-13">Contact Name</span>
                            </td>

                            <td>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                    <Link
                                        to={`/inventory/edit/${aInventoryItem.id}`}
                                        className="font-18 text-info me-2"
                                        onClick={handleEditInventoryBtn}>
                                        <i className="mdi mdi-pencil"></i>
                                    </Link>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                    <Link to="#" className="font-18 text-danger" onClick={onLocalInventoryRowClicked}>
                                        <i className="mdi mdi-trash-can-outline"></i>
                                    </Link>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

InventoryTable.propTypes = {
    invtry: PropTypes.shape({
        id: PropTypes.number,
        workShopName: PropTypes.string,

        summary: PropTypes.string,
        workshopId: PropTypes.number,
        quantity: PropTypes.number.isRequired,
        basePrice: PropTypes.number,
        createdBy: PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            avatarUrl: PropTypes.string,
        }),
    }),
    onInventoryRowClicked: PropTypes.func.isRequired,
};

export default React.memo(InventoryTable);
