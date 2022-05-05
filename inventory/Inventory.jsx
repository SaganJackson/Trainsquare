import React, { useState, useEffect, useCallback } from 'react';
import PageTitle from './PageTitle';
import * as service from '../../services/inventoryService';
import InventoryTable from './InventoryTable';
import { Row, Col } from 'react-bootstrap';
import AddInventory from './AddInventory';
import debug from 'sabio-debug';

const _logger = debug.extend('Inventory');

function Inventory() {
    const [pageData, setPageData] = useState({
        inventory: [],
        inventoryComponents: [],
    });

    const [workShopInfo, setWorkShop] = useState({
        workShopId: '',
        workShopName: '',
        summary: '',
        shortDescription: '',
        imageUrl: '',
        numberOfSessions: '',
        startTime: '',
        endTime: '',
        externalSiteUrl: '',
    });

    _logger(workShopInfo);

    const onDeleteRequested = useCallback((myInventory, eObj) => {
        _logger(myInventory.id, { myInventory, eObj });

        const handler = getDeleteSuccessHandler(myInventory.id);

        service.deleteById(myInventory.id).then(handler).catch(onDeleteError);
    }, []);

    const getDeleteSuccessHandler = (idToBeDeleted) => {
        _logger('getDeleteSuccessHandler', idToBeDeleted);

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.inventory = [...pd.inventory];

            const idxOf = pd.inventory.findIndex((inventory) => {
                let result = false;

                if (inventory.id === idToBeDeleted) {
                    result = true;
                }
                return result;
            });

            if (idxOf >= 0) {
                pd.inventory.splice(idxOf, 1);
                pd.inventoryComponents = pd.inventory.map(mapInventory);
            }

            return pd;
        });
    };

    const onDeleteError = (error) => {
        _logger('Deleteing', error);
    };

    _logger(pageData);

    const mapInventory = (aInventoryItem) => {
        return (
            <InventoryTable invtry={aInventoryItem} key={aInventoryItem.id} onInventoryRowClicked={onDeleteRequested} />
        );
    };

    useEffect(() => {
        _logger('firing useEffect for getInventory');
        service.paginate(0, 17).then(onGetInventorySuccess).catch(onGetInventoryError);
    }, []);

    const onGetInventorySuccess = (data) => {
        _logger(data);

        let arrayOfInventory = data.data.item.pagedItems;
        _logger({ arrayOfInventory });

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.inventory = arrayOfInventory;
            pd.inventoryComponents = arrayOfInventory.map(mapInventory);
            return pd;
        });

        setWorkShop({
            workShopName: arrayOfInventory[0].workShopName,
            shortDescription: arrayOfInventory[0].shortDescription,
            summary: arrayOfInventory[0].summary,
            imageUrl: arrayOfInventory[0].imageUrl,
        });
    };

    const onGetInventoryError = (error) => {
        _logger('error getting Inventory', error);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: 'Inventory', path: '/inventory', active: true }]}
                title={'Inventory'}
            />

            <Row>
                <Col xl={6} lg={6}>
                    <AddInventory />
                </Col>
                <Col xl={5} lg={6}>
                    <div>
                        <h4>Inventory Table</h4>
                    </div>
                    <div className="col">{pageData.inventory.map(mapInventory)}</div>
                </Col>
            </Row>
        </>
    );
}

export default Inventory;
