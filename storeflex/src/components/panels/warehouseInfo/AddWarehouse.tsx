import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import swal from 'sweetalert';
import Api from '../../../../src/api/Api';
import { LoaderFull } from '../../atoms/loader/loader';
import WearehouseAddress from './component/WearehouseAddress';
import WearehousePricing from './component/WearehousePricing';
import WarehouseHours from './component/WarehouseHours';
import WarehouseLayout, { WarehouseLayoutObj } from './component/WarehouseLayout';
import WarehouseDetails from './component/WarehouseDetails';
import { WarehousePostData, Hours } from '../../../api/ApiConfig';
import { WhDetail } from './component/WarehouseDetails';
import { Address, objectData, Warehouseprice } from '../../../utils/ResponseSchema';
import { Value } from 'sass';
import { AddBusiness } from '@mui/icons-material';
import Accordion from 'react-bootstrap/Accordion';



const AddWarehouse = () => {

    const api = new Api();
    const [isLoader, setIsLoader] = useState(false);
    const [whDetails, setWhDetails] = useState<WhDetail>({});
    const [whAddress, setWhAddress] = useState<Address>({});
    const [pricing, setPricing] = useState<Warehouseprice>({});
    const [whHours, setWhHours] = useState<Hours>({});
    const [whLayout, setLayout] = useState<WarehouseLayoutObj>({});

    const [priceList, setPriceList] = useState([{price: ""}]);
    const handlePriceAdd = () => {
        setPriceList([...priceList, { price:"" }]);
    }
    const handlePriceRemove = (index) => {
        const list = [...priceList];
        list.splice(index,1);
        setPriceList(list);
    }
    

    const onWarehouseDetailsUpdate = (data: WhDetail) => {
        setWhDetails(data);
        console.log(' onWarehouseDetailsUpdate >>> ', data);
    }
    const onWearehouseAddressUpdate = (data: Address) => {
        setWhAddress(data);
        console.log(' onWearehouseAddressUpdate >>> ', data);
    }
    const onWearehousePricingUpdate = (data: any) => {
        setPricing(data);
        console.log(' onWearehousePricingUpdate >>> ', data);
    }
    const onWarehouseHoursUpdate = (data: any) => {
        setWhHours(data);
        console.log(' onWarehouseHoursUpdate >>> ', data);
    }
    const onWarehouseLayoutUpdate = (data: any) => {
        setLayout(data);
        console.log(' onWarehouseLayoutUpdate >>> ', data);
    }

    const addWarehouse = () => {

        if (!whDetails?.warehouseName) {
            alert('Warehouse Name is Required');
        }
        else if (!whDetails?.descp) {
            alert('Warehouse Description is required');
        }
        else if (!whDetails?.warehouseTaxId) {
            alert('gst is required');
        }
        else if (!whDetails?.clientId) {
            alert('Client id is required');
        }
        else if (!whAddress?.plotNo) {
            alert('Plot No is required');
        }
        else if (!whAddress?.houseNo) {
            alert('House No is required');
        }
        else if (!whAddress?.streetDetails) {
            alert('Street No is required');
        }
        else if (!whAddress?.state) {
            alert('State is required');
        }
        else if (!whAddress?.city) {
            alert('City is required');
        }
        else if (!whAddress?.country) {
            alert('country is required');
        }
        else if (!whAddress?.pincode) {
            alert('Pincode is required');
        }
        else if (!whLayout?.dockhighdoors) {
            alert('Dock high door is required');
        }
        else if (!whLayout?.atgradedoors) {
            alert('At grade door is required');
        }
        else if (!whLayout?.ceillingheight) {
            alert('Clear Ceilling Height is required');
        }
        else if (!whLayout?.forkliftcapacity) {
            alert('Max Forklift Capacity is required');
        }
        else if (!pricing?.availspace) {
            alert('Total Available Space is required');
        }
        else if (!pricing?.ratesqtft) {
            alert('Rate(Rs)/sq.ft/month is required');
        }
        else if (!pricing?.minordersqt) {
            alert('Minimum Order Quantity is required');
        }
        else if (!whHours?.starttime) {
            alert('Facility houres is required');
        }
        else if (!whLayout?.facilitiesId) {
            alert('Facility qualifications is required');
        }
        else if (!whLayout?.storagesId) {
            alert('Storage layout is required');
        }
        else if (!whLayout?.industryId) {
            alert('Industries served is required');
        }


        else {
            const buildPostData = {} as WarehousePostData;
            buildPostData.clientId = whDetails?.clientId;
            buildPostData.warehouseName = whDetails?.warehouseName;
            buildPostData.warehouseTaxId = whDetails?.warehouseTaxId;
            buildPostData.descp = whDetails?.descp;
            buildPostData.address = [whAddress];
            buildPostData.hours = whHours;
            buildPostData.facilitiesId = whLayout.facilitiesId;
            buildPostData.industryId = whLayout.industryId;
            buildPostData.storagesId = whLayout.storagesId;
            buildPostData.dockhighdoors = whLayout.dockhighdoors;
            buildPostData.atgradedoors = whLayout.atgradedoors;
            buildPostData.ceillingheight = whLayout.ceillingheight;
            buildPostData.forkliftcapacity = whLayout.forkliftcapacity;

            setIsLoader(true);
            api.addWarehouse(buildPostData).then((resp) => {
                setIsLoader(false);
                if (resp && resp.methodReturnValue.clientId) {
                    // upladPhoto(imageData, resp.methodReturnValue.clientId);
                }
                swal('Success! Your warehouse has been added successfully!', {
                    icon: "success",
                    buttons: {
                        buttonOne: {
                            text: "OK",
                            visible: true,
                            className: "sf-btn",
                        }
                    }
                });
            }).catch((error) => {
                setIsLoader(false);
                console.log(' addWarehouse creation erroor ', error);
            });
        }
    }
    return (
        <>
            {isLoader && <LoaderFull />}
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='sf-ac'>
                        <div className='primary-gradient w100'>
                            <div className='font-white p-sm f-18px f-bold'>Warehouse Details</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <> {<WarehouseDetails onWarehouseDetailsUpdate={onWarehouseDetailsUpdate} />}</>
                        <> {<WearehouseAddress onWearehouseAddressUpdate={onWearehouseAddressUpdate} />}</>
                        <> {<WarehouseHours onWarehouseHoursUpdate={onWarehouseHoursUpdate} />}</>
                        <> {<WarehouseLayout onWarehouseLayoutUpdate={onWarehouseLayoutUpdate} />}</>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header className='sf-ac'>
                        <div className='primary-gradient w100'>
                            <div className='font-white p-sm f-18px f-bold'>Pricing</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <>     
                        {priceList.map((data,index)=>(
                            <div key={index}>
                                <WearehousePricing onWearehousePricingUpdate={onWearehousePricingUpdate}/>
                                {priceList.length - 1 === index && priceList.length < 4 && <Button variant="contained" color="primary" onClick={handlePriceAdd} style={{marginLeft:'20px'}}>Add Pricing</Button>}
                                {priceList.length > 1 && <Button variant="contained" color="secondary" onClick={()=>handlePriceRemove(index)} style={{marginLeft:'20px'}}>Remove Pricing</Button>}
                            </div>
                            
                        ))}
                           
                        </>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='p-top-md align-c'>
                <Button className='sf-btn' variant="contained" onClick={() => { alert('Cancel') }}> Cancel </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button className="btn primary-btn sf-btn" variant="contained" onClick={() => { addWarehouse() }}> Save </Button>
            </div>
        </>
    )
}

export default AddWarehouse;
