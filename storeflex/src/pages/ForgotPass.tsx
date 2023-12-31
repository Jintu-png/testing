import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../api/Api';
import { USER_TYPE, PAGES } from '../utils/Constants';
import { gapi } from "gapi-script";
import { LoaderFull } from '../components/atoms/loader/loader';
import swal from 'sweetalert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navbar, Container } from 'react-bootstrap';
import Footer from '../components/footer/footer';
import { validateEmail } from '../utils/CommonUtils';

const ForgotPass = () => {

    const api = new Api();
    const [loader, setLoader] = useState(false);

    let userType = '';

    const url = window.location.href;

    if (url && url.indexOf(PAGES.SignIn.adminPath) !== -1) {
        userType = USER_TYPE.SfUser;
    } else {
        userType = USER_TYPE.SfClient;
    }

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            plugin_name: "storeflex",
            scope: 'email',
        });
    });

    const [values, setValues] = useState({
        email: "",
    });

    const [errors, setErrors] = useState({
        email: "",
    });

    const validateEmailId = (event: any) => {
        const emailTemp = event.target.value;
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        if (!emailTemp) {
            errors.email = "*Email is required."
        }
        else if (!validateEmail(emailTemp)) {
            errors.email = "Enter a valid mail"
        } else {
            errors.email = ""
        }
    }

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };


    const SubmitSendLink = () => {
        const emailId = values.email;
        setLoader(true);
        api.ForgotPass({ emailId }).then((response) => {
            swal('We sent an email to ' + values.email + ' with a link to get back into your account.', {
                title: "Email Sent",
                icon: "success",
                buttons: {
                    buttonOne: {
                        text: "OK",
                        visible: true,
                        className: "sf-btn",
                    }
                }
            }).then(willUpdate => {
                if (willUpdate) {
                    window.location.href = '/home';
                }
            });
            setLoader(false);
        }).catch((error) => {
            setLoader(false);
            swal('No users found', {
                icon: "error",
                buttons: {
                    buttonOne: {
                        text: "OK",
                        visible: true,
                        className: "sf-btn",
                    }
                }
            });
        })
    }

    return (
        <>
            {loader && <LoaderFull />}
            <Navbar fixed="top" collapseOnSelect expand="md" className="sf-bg-color-primary w100" variant="dark">
                <div className='sf-flex sf-justify w100'>
                    <Container className='top-nav-container no-padding '>
                        <Navbar.Brand href="/home">
                            <span className='top-nav-logo'>
                                <img src="../../assets/images/white-logo.jpg" alt="Logo" />
                            </span>
                        </Navbar.Brand>
                    </Container>
                    {/* <div className=''>
                <a href="/home"><img src="assets/images/white-logo.jpg" alt="Logo" style={{ height: '8vh' }} /></a>
            </div> */}
                    <div className="link-white align-c">
                        <span><a className="sign-link p-top-5" href={PAGES.SignIn.userPath}>Sign In</a></span>
                        <span><a className="sign-link p-top-5" href={PAGES.SignUp.path}>Sign Up</a></span>
                    </div>
                </div></Navbar>
            <section className="signin-area signin-one">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="signin-form form-style-two rounded-buttons">
                                <div className="row">
                                    <div className="col-md-12 justify-content-center">
                                        <div className="form-input justify-content-center">
                                            <div className='pb-3' style={{ textAlign: 'center' }}>
                                                <LockOutlinedIcon className='my_svg_icons' />
                                            </div>
                                            <br /><br />
                                            <h4 className='pb-3' style={{ textAlign: 'center' }}>
                                                Trouble logging in?
                                            </h4>
                                            <div className='pb-3' style={{ textAlign: 'center' }}>
                                                Enter your email and we'll send you a link to get back into your account.
                                            </div>
                                            <div className="input-items default">
                                                <input type="text" placeholder="Email" name="email" id="email" onChange={validateEmailId} />
                                            </div>
                                            {errors.email && <p className="text-red">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-input rounded-buttons">
                                            <button onClick={SubmitSendLink}
                                                className="btn primary-btn rounded-full sf-btn vertical-center"
                                                disabled={!values.email}
                                                type="submit"
                                            >
                                                Send login link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <a href='/faq'>Can't reset your password?</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
};

export default ForgotPass;
