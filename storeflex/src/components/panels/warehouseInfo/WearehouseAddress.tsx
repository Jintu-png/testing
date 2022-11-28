import React from "react";
import { Grid, TextareaAutosize, Button } from '@mui/material';
import InputBox from '../../atoms/textfield/InputBox';
import GetState from '../../atoms/state/GetState';
import GetCompany from "../../atoms/company/GetCompany";


const WearehouseAddress = () => {
    return (
        <>

            <div className='m-bot-lg'>
                <div className='primary-gradient m-bot-md'>
                    <div className='font-white p-sm f-18px f-bold'>Where's warehouse located?</div>
                </div>
                {/* {showBusinessAddress()} */}
                <div className='p-md'>
                <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                    <Grid item xs={4}>
                        <div> Company </div>
                        <div className='p-top-md'>
                            {<GetCompany />}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>Profile Photo</div>
                        <div className='p-top-md'>
                            <input type="file" className="form-control" />
                        </div>
                    </Grid>
                </Grid>
                    </div>

                <div className='p-md'>
                    <div>
                        <div>
                            <Grid container >
                                <Grid item xs={12}>
                                    <InputBox data={{ name: 'whAddress', label: 'Warehouse address *', value: '' }}
                                    // onChange={validateAddress}
                                    />
                                    {/* {address && <p className="text-red">{address}</p>} */}
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                                <Grid item xs={4}>
                                    <InputBox data={{ name: 'cityname', label: 'City*', value: '' }}
                                    // onChange={validateCityName}
                                    />
                                    {/* {city && <p className="text-red">{city}</p>} */}
                                </Grid>
                                <Grid item xs={4}>
                                    <div> State </div>
                                    <div className='p-top-md'>
                                        {<GetState />}
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <InputBox data={{ name: 'zipcode', label: 'Zip*', value: '' }}
                                    // onChange={validateZipCode}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WearehouseAddress;