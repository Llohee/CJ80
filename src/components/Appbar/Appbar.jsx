import React, { useState } from 'react'
import './Appbar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from '../Navbar/navbar'
import { BsFillMenuButtonWideFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


function Appbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar-app">
            <BootstrapContainer className="trello-container">
                <Row>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="app-actions">

                            <NavDropdown
                                id="basic-nav-dropdown"
                                title={<div><BsFillMenuButtonWideFill /></div>}
                            >
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <button className="item home"><i className="fa fa-home" /></button>
                            <div className="item search">
                                <InputGroup className="group-search">
                                    <FormControl
                                        className="input-search"
                                        placeholder="Jump to..."
                                    />
                                    <InputGroup.Text className="input-icon-search"><i className="fa fa-search" /></InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="app-brandind text center">

                        </div>
                    </Col>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="user-actions">
                            <button className="item quick"><i className="fa fa-plus-square-o" /></button>
                            <button className="item news"><i className="fa fa-info-circle" /></button>
                            <button className="item notification"><i className="fa fa-bell-o" /></button>
                            <NavDropdown
                                id="basic-nav-dropdown"
                                title={<div className="item-user-avatar"> <img src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/335667532_719682573220013_8031197958873197253_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oUgHoiHFoX4AX-JeX7u&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCKSasguEv5vB7AajmpeaU3fv2oV5YwJekYPgtSSPw7eg&oe=641C279D" width="30px" height="30px" /></div>}
                            >
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => navigate('/login')}>
                                    Log Out
                                    <BiLogOut />
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}
export default Appbar