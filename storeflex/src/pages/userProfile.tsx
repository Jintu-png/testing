import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import { getMobileNo, getName, getroleType, getUserEmail, getUserType } from '../utils/CommonUtils';
import Footer from '../components/footer/footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import { UserType } from '../components/atoms/adduser/UserHelper';



const UserProfile = () => {
    sessionStorage.setItem('email', getUserEmail());
    sessionStorage.setItem('name', getName());
    sessionStorage.setItem('mobile', getMobileNo());
    sessionStorage.setItem('roleType', getroleType());
    const [isDisabled, setIsDisabled] = useState(true);
    const [RoleCheck, setRoleCheck] = useState(false);
    const [CompanyCheck, setCompanyCheck] = useState(false);
    const [formData, setFormData] = useState(
        {
            name: sessionStorage.getItem('name') || '',
            company: '',
            phone: sessionStorage.getItem('mobile') || '',
            email: sessionStorage.getItem('email') || '',
            city: '',
            state: '',
            zip: '',
            roleType: sessionStorage.getItem('roleType') || ''
        }
    );


    useEffect(() => {
        roleCheck();
    }, [""]);

    const roleCheck = () => {
        if (getUserType() == 'CU') {
            setRoleCheck(true)
        }
        if (getUserType() == 'CL') {
            setCompanyCheck(true)
            setRoleCheck(true)
        }


    }



    // const [success, setSuccess] = useState("success");

    const handleClick = (event) => {
        setIsDisabled(!isDisabled)
        // console.log(event.target.disabled);
        // event.target.disabled = true;
    };


    const handleInput = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        // event.target.disabled = false;

        console.log(formData);

    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editProfilePhoto = () => {
        document.getElementById('fileInput')?.click();
    };


    return (
        <AppContainer>

            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()} />}
                right={

                    <div className='c-box-shadow-blue'>
                        <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                            <div>

                                <div className='p-bot-lg'>

                                    <div className="col-md-12">
                                        <div className="row border bg-white">
                                            <div className="col-md-4 p-0">
                                                <div className="border border-info p-4 h-100">
                                                    <div className="header text-center p-4">User Profile</div>
                                                    <div className="text-center">
                                                        <img className="border border-success rounded-circle" src="/images/face1.jpg" alt="profile" />

                                                        <button className='border' onClick={editProfilePhoto} style={{ background: 'white', position: 'absolute', border: '0px', borderRadius: 50, padding: '5px', marginLeft: '-30px', marginTop: '70px' }}><i className="lni lni-pencil"></i>
                                                            {/* <img style={{height:'25px',width:'30px'}} src="/images/camera_lead.jpg" alt="" /> */}
                                                        </button>


                                                        <div className="flex p-2">

                                                            <input
                                                                className="bg-{success} form-control font-weight-bold text-center"
                                                                name="name"
                                                                type="text"
                                                                value={formData?.name}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            // readOnly={true}
                                                            />

                                                            {/* <button className='btn btn-info p-1' onClick={handleClick}><i className="lni lni-pencil"></i></button> */}

                                                        </div>

                                                        <div className="flex p-2">

                                                            {/* <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">Company:</span>
                                                            </div> */}
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold text-center"
                                                                name='company'
                                                                type="text"
                                                                value={formData.company}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />

                                                            {/* <button className='btn btn-info p-1' onClick={handleClick}><i className="lni lni-pencil"></i></button> */}
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>


                                            <div className="col-md-8 p-0">
                                                <div className="col-md-12 p-0">
                                                    <div className="border border-info p-4">
                                                        <div className="header text-center p-2">User Details {getUserType()}</div>




                                                        <div className="flex p-2">

                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">Phone:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='phone'
                                                                value={formData?.phone}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />

                                                            {/* <button className='btn btn-info p-1' onClick={handleClick}><i className="lni lni-pencil"></i></button> */}
                                                        </div>

                                                        <div className="flex p-2">

                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">Email:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='email'
                                                                value={formData?.email}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />

                                                            {/* <button className='btn btn-info p-1' onClick={handleClick}><i className="lni lni-pencil"></i></button> */}
                                                        </div>

                                                        <div className="flex p-2">
                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">Address:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='city'
                                                                value={formData?.city}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />
                                                            {/* <button className='btn btn-info p-1' onClick={handleClick}><i className="lni lni-pencil"></i></button> */}
                                                        </div>

                                                        <div className="flex p-2">
                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">City:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='city'
                                                                value={formData.city}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />
                                                        </div>
                                                        <div className="flex p-2">
                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">State:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='city'
                                                                value={formData?.state}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />
                                                        </div>
                                                        <div className="flex p-2">
                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">Pin:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='city'
                                                                value={formData?.zip}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />
                                                        </div>

                                                        <div className="flex p-2">

                                                            <div className="input-group-prepend w-25">
                                                                <span className="input-group-text w-100 mr-1" id="basic-addon1">Role:</span>
                                                            </div>
                                                            <input
                                                                className="bg-{success} form-control font-weight-bold"
                                                                type="text"
                                                                name='roleType'
                                                                value={formData?.roleType}
                                                                onChange={handleInput}
                                                                disabled={isDisabled}
                                                            />

                                                        </div>



                                                        <div className="col-md-12">
                                                            <div className="text-center">
                                                                <button className='btn primary-btn rounded-full p-1 text-capitalize' onClick={handleShow}><i className="lni lni-pencil"></i> Update</button>
                                                            </div>
                                                        </div>

                                                    </div>





                                                    <Modal show={show}
                                                        size="lg"
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                        onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Update Profile</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Form>
                                                                <div className="row">
                                                                    <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Name</Form.Label>
                                                                        <Form.Control
                                                                            className='font-weight-bold'
                                                                            type="text"
                                                                            onChange={handleInput}
                                                                            value={''}
                                                                            autoFocus
                                                                        />
                                                                    </Form.Group>

                                                                    <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Phone</Form.Label>
                                                                        <Form.Control
                                                                            className='font-weight-bold'
                                                                            type="number"
                                                                            onChange={handleInput}
                                                                            value={''}
                                                                            autoFocus
                                                                        />
                                                                    </Form.Group>

                                                                </div>



                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                    <Form.Label>Company Name</Form.Label>
                                                                    <Form.Control
                                                                        className='font-weight-bold'
                                                                        type="text"
                                                                        onChange={handleInput}
                                                                        value={formData.company}
                                                                        disabled={CompanyCheck}
                                                                        autoFocus
                                                                    />
                                                                </Form.Group>


                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                    <Form.Label>Email</Form.Label>
                                                                    <Form.Control
                                                                        className='font-weight-bold'
                                                                        type="email"
                                                                        onChange={handleInput}
                                                                        value={''}
                                                                        autoFocus
                                                                    />
                                                                </Form.Group>

                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                    <Form.Label>Old Password</Form.Label>
                                                                    <Form.Control
                                                                        className='font-weight-bold'
                                                                        type="password"
                                                                        onChange={handleInput}
                                                                        value={''}
                                                                        autoFocus
                                                                    />
                                                                </Form.Group>

                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                    <Form.Label>New Password</Form.Label>
                                                                    <Form.Control
                                                                        className='font-weight-bold'
                                                                        type="password"
                                                                        onChange={handleInput}
                                                                        value={''}
                                                                        autoFocus
                                                                    />
                                                                </Form.Group>

                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                    <Form.Label>Confirm Password</Form.Label>
                                                                    <Form.Control
                                                                        className='font-weight-bold'
                                                                        type="password"
                                                                        onChange={handleInput}
                                                                        value={''}
                                                                        autoFocus
                                                                    />
                                                                </Form.Group>

                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                    <Form.Label>Address</Form.Label>
                                                                    <Form.Control
                                                                        className='font-weight-bold'
                                                                        type="text"
                                                                        onChange={handleInput}
                                                                        value={formData.city}
                                                                        autoFocus
                                                                    />
                                                                </Form.Group>

                                                                <div className="row">
                                                                    <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>City</Form.Label>
                                                                        <Form.Control
                                                                            className='font-weight-bold'
                                                                            type="text"
                                                                            onChange={handleInput}
                                                                            value={formData.city}
                                                                            autoFocus
                                                                        />
                                                                    </Form.Group>

                                                                    <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>State</Form.Label>
                                                                        <Form.Control
                                                                            className='font-weight-bold'
                                                                            type="text"
                                                                            onChange={handleInput}
                                                                            value={formData.state}
                                                                            autoFocus
                                                                        />
                                                                    </Form.Group>

                                                                </div>

                                                                <div className="row">
                                                                    <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Pin</Form.Label>
                                                                        <Form.Control
                                                                            className='font-weight-bold'
                                                                            type="text"
                                                                            onChange={handleInput}
                                                                            value={formData.zip}
                                                                            autoFocus
                                                                        />
                                                                    </Form.Group>

                                                                    <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Role</Form.Label>
                                                                        <Form.Control
                                                                            className='font-weight-bold'
                                                                            type="text"
                                                                            onChange={handleInput}
                                                                            value="CU"
                                                                            disabled={RoleCheck}
                                                                            autoFocus
                                                                        />
                                                                    </Form.Group>


                                                                </div>
                                                                <Button variant="secondary" className='btn sf-btn text-capitalize' onClick={() => swal({
                                                                    title: "Are you sure ?",
                                                                    buttons: {
                                                                        buttonOne: {
                                                                            text: "No",
                                                                            value: "ec",
                                                                            visible: true,
                                                                            className: "sf-btn",
                                                                        },
                                                                        buttonTwo: {
                                                                            text: "Yes",
                                                                            value: "nc",
                                                                            visible: true,
                                                                            className: "sf-btn",
                                                                        }
                                                                    }
                                                                }).then(function (Value) {
                                                                    if (Value === null) return false;

                                                                    if (Value === "ec") {
                                                                        return false
                                                                    }

                                                                    swal("Your password has been changed successfully!", "" + "", "success");
                                                                })}>
                                                                    Change Password
                                                                </Button>







                                                            </Form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" className='btn-sm text-capitalize' onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button variant="primary" className='btn-sm text-capitalize' onClick={handleClose}>
                                                                Save Changes
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>





                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Box>
                    </div >
                }
            />
            < Footer />
        </AppContainer >
    )
}

export default UserProfile;