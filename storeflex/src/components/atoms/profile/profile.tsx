import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { ProfileBtn } from '../button/button';
import './profile.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PrifileMenuList from './profileList.json';
import { Button } from 'react-bootstrap';
import Api from '../../../api/Api';
import { getFirstName, getIntent, getLogInType, setLogInType } from "../../../../src/utils/CommonUtils";
import AppLogout from '../../../pages/applogout';
import { SearchProps } from '../../../api/ApiConfig';

interface ProfileMenuProps {
    isSigned?: boolean;
    profileImg?: string;
    userType?: string | null;
}

interface warehouse {
    city: any,
    clientId: any,
    houseNo: any,
    pincode: any,
    plotNo: any,
    state: any,
    status: any,
    streetAddrs: any,
    warehouseName: any,
    warehouseId: any
}

export const ProfileMenu = (props?: ProfileMenuProps) => {

    const navigate = useNavigate();
    const profileImgUrl = props?.profileImg;
    const isSigned = props?.isSigned;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const userType = props?.userType;

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const postData = {} as SearchProps;

    const onMenuItemClick = (value: string) => {
        if (value === '/search-new') {
            const api = new Api();
            const pin = ''
            api.searchwarehouse(pin).then((response) => {
                const data: warehouse = response.data.methodReturnValue.warehouseViewBean;
                if (response.data.status == 'SUCCESS') {
                    navigate('/search-new', { state: data });
                    window.location.reload();
                }
            })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate(value);
        }
        if (value === 'list_popup') {
            createSwalButton()
        }
        else if (value === 'logout_user') {
            sessionStorage.clear();
            var timer = 10,
                isTimerStarted = false;

            (function logOutSwal() {
                swal({
                    icon: "../../assets/images/white-logo.jpg",
                    title: "You have successfully Logged Out",
                    text: "Page will be auto redirect on main page in " + timer + " seconds...",
                    buttons: {
                        buttonOne: {
                            text: "Home Page",
                            value: "lp",
                            visible: true,
                            className: "sf-btn",
                        }
                    },
                    timer: !isTimerStarted ? timer * 1000 : undefined,
                }).then(function (value) {
                    if (value == "lp") {
                        logout('/home');
                    }
                    else { logout('/home') }
                    window.location.reload();
                });
                isTimerStarted = true;
                if (timer) {
                    timer--;
                    setTimeout(logOutSwal, 1000);
                }
                else {
                    window.location.reload();
                }
            })();
        }
        else {
            navigate(value);
        }
    }

    const logout = (pagePath: string) => {
        sessionStorage.setItem('isLoggedIn', 'false');
        navigate(pagePath);
    }

    useEffect(() => {
        window.addEventListener('popstate', (e) => {
            window.history.go(0);
        });
    }, []);

    const createSwalButton = async () => {
        let swalButton1 = await swal({
            title: "List Space",
            buttons: {
                buttonOne: {
                    text: "Existing Company",
                    value: "ec",
                    visible: true,
                    className: "sf-btn",
                },
                buttonTwo: {
                    text: "New Company",
                    value: "nc",
                    visible: true,
                    className: "sf-btn",
                }
            }
        }).then(function (value) {
            if (value === "ec") { window.location.href = "/warehouse/add"; }
            else if (value === "nc") { window.location.href = "/business/add"; }
            else { window.location.href = ""; }

        });
    }

    const showProfileMenuList = () => {
        let menulist;
        if (userType === 'SL') {
            menulist = PrifileMenuList.SL;
        } else if (userType === 'CL') {
            menulist = PrifileMenuList.CL;
        } else if (userType === 'CU') {
            menulist = PrifileMenuList.CU;
        } else {
            menulist = [];
        }
        return (
            menulist.map((item, index) => {
                const keyId = `p_item_${index}`;
                return (
                    <MenuItem key={keyId}>
                        <ListItemText>
                            <span onClick={() => { onMenuItemClick(item.url) }}>{item.label}</span>
                        </ListItemText>
                    </MenuItem>
                )
            })
        )
    }
    const profileMenuList = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {showProfileMenuList()}
            </Menu>
        );
    }

    const ll = useLocation();

    const changeToCL = () => {
        setLogInType('CL');
        if (ll.pathname === '/home') {
            window.location.href = '/home'
        }
        else if (ll.pathname === '/discovermore') {
            window.location.href = 'discovermore'
        }
        else if (ll.pathname === '/termsandconditions') {
            window.location.href = '/termsandconditions'
        }
        else if (ll.pathname === '/privacypolicy') {
            window.location.href = '/privacypolicy'
        }
        else if (ll.pathname === '/faq') {
            window.location.href = '/faq'
        }
        else {
            window.location.href = '/dashboard'
        }
    }
    const changeToCU = () => {
        setLogInType('CU');
        if (ll.pathname === '/home') {
            window.location.href = '/home'
        }
        else if (ll.pathname === '/discovermore') {
            window.location.href = 'discovermore'
        }
        else if (ll.pathname === '/termsandconditions') {
            window.location.href = '/termsandconditions'
        }
        else if (ll.pathname === '/privacypolicy') {
            window.location.href = '/privacypolicy'
        }
        else if (ll.pathname === '/faq') {
            window.location.href = '/faq'
        }
        else {
            window.location.href = '/dashboard'
        }
    }

    return (
        <>
            <AppLogout>
                <div className='sf-flex profile-menu-container'>
                    <span style={{ 'color': 'white' }}>Welcome {getFirstName()}</span>
                    {!getIntent() && userType === 'CU' ? <Button className='btn primary-btn sf-btn' onClick={() => window.location.href = '/business/add'}>StoreFlex Your Space</Button> : ''}
                    {getIntent() && getLogInType() === 'CU' ? <Button className='btn primary-btn sf-btn' onClick={changeToCL}>Owner Profile</Button> : ''}
                    {getIntent() && getLogInType() === 'CL' ? <Button className='btn primary-btn sf-btn' onClick={changeToCU}>Customer Profile</Button> : ''}
                    <IconButton size="large" edge="start" color="inherit" aria-label="profile" onClick={handleClick} >
                        <ProfileBtn showProfileImg={isSigned} profileImg={profileImgUrl} />
                    </IconButton>
                    {profileMenuList()}
                </div>
            </AppLogout>
        </>
    )
}