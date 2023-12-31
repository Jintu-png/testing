import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import InputBox from '../../../atoms/textfield/InputBox';
import { validateAreaSpace, validateRate } from '../../../../utils/CommonUtils';
import { objectData, Warehouseprice } from '../../../../utils/ResponseSchema';
import { InputError } from '../../../atoms/textfield/InputError';

interface WearehousePricingProps {
    space?: number;
    rate?: number;
    quantity?: number;
    onWearehousePricingUpdate?: (data: any) => void;
}

const WearehousePricing = (props: WearehousePricingProps) => {

    const [spaceInfo, setSpaceInfo] = useState<objectData>({});
    const [rateInfo, setRateInfo] = useState<objectData>({});
    const [quantityInfo, setQuantityInfo] = useState<objectData>({});

    const [onUpdateInfo, setonUpdateInfo] = useState(false);

    useEffect(() => {
        if (onUpdateInfo) {
            setonUpdateInfo(false);
            onChangeUpdateInfo();
        }
    }, [onUpdateInfo]);

    const getVal = (obj: objectData) => {
        if (obj.isUpdated) {
            return obj.val
        } else {
            return undefined;
        }
    }
    const onChangeUpdateInfo = () => {
        if (props?.onWearehousePricingUpdate) {
            const obj = {} as Warehouseprice;
            obj.availspace = getVal(spaceInfo);
            obj.ratesqtft = getVal(rateInfo);
            obj.minordersqt = getVal(quantityInfo);
            props.onWearehousePricingUpdate(obj);
        }
    }

    const validateSpaceInfo = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        if (!obj.val) {
            obj.error = " *This can not be empty ";
        } else if (!validateAreaSpace(obj.val)) {
            obj.error = " Available Space should be between 100-2,00,000 sq.ft";
        } else {
            obj.error = '';
        }
        setSpaceInfo(obj);
        setonUpdateInfo(true);
    }

    const validateRateInfo = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        if (!obj.val) {
            obj.error = " *This can not be empty ";
        } else if (!validateRate(obj.val)) {
            obj.error = " Rate should be between 10-5000 Rs/sq.ft/month"
        } else {
            obj.error = '';
        }
        setRateInfo(obj);
        setonUpdateInfo(true);
    }
    const validateQuantityInfo = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        // if (!obj.val) {
        //     obj.error = " *Company Name is required. ";
        // // } else if (!validateCharacterLength(obj.val, 4, 50)) {
        // //     obj.error = " Company Name must be between 4 characters to 50 characters."
        // } else {
        //     obj.error = '';
        // }
        setQuantityInfo(obj);
        setonUpdateInfo(true);
    }



    return (
        <>
            <div>
                {/* <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>Pricing</div>
                </div> */}
                <div className='p-md'>
                    <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 12 }}>
                        <Grid item xs={4}>
                            <InputBox data={{ name: 'availablespace', label: 'Total Available Space (Sq.Ft)*', value: '' }}
                                onChange={validateSpaceInfo}
                            />
                            <InputError errorText={spaceInfo.error} />
                        </Grid>
                        <Grid item xs={4}>
                            <InputBox data={{ name: 'rate', label: 'Rental Rate(Rs)/Sq.Ft/30 days *', value: '' }}
                                onChange={validateRateInfo}
                            />
                            <InputError errorText={rateInfo.error} />
                        </Grid>
                        <Grid item xs={4}>
                            <InputBox data={{ name: 'quantity', label: 'Minimum Order Quantity (Sq.Ft)', value: '' }}
                                onChange={validateQuantityInfo}
                            />
                            <InputError errorText={quantityInfo.error} />
                        </Grid>
                        <Grid item xs={4}>
                            <InputBox data={{ name: 'quantity', label: 'Loading Price/Pallet', value: '' }}
                                onChange={validateQuantityInfo}
                            />
                            <InputError errorText={quantityInfo.error} />
                        </Grid>
                        <Grid item xs={4}>
                            <InputBox data={{ name: 'quantity', label: 'Unloading Price/Pallet', value: '' }}
                                onChange={validateQuantityInfo}
                            />
                            <InputError errorText={quantityInfo.error} />
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                            <InputBox data={{ type: 'date', name: 'fromdate', label: 'From' }} />
                        </Grid>
                        <Grid item xs={4}>
                            <InputBox data={{ type: 'date', name: 'todate', label: 'To' }} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}


export default WearehousePricing;