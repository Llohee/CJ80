import React, { useState } from 'react'
import './Appbar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl, Nav } from 'react-bootstrap'
import Navbar from '../Navbar/navbar'


function Appbar() {
    const [showNav, setShowNav] = useState(false)
    return (
        <nav className="navbar-app">
            <BootstrapContainer className="trello-container">
                <Row>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="app-actions">
                            {/* <div className="open-navbar"> */}
                            <button className="item all" onClick={() => setShowNav(true)}><i className="fa fa-th" /></button>
                            <Navbar showNav={showNav} setShowNav={setShowNav} />

                            {/* </div> */}
                            <button className="item home"><i className="fa fa-home" /></button>
                            {/* <button className="item-boards"><i className="fa fa-columms" />&nbsp;&nbsp;<strong>Boards</strong></button> */}
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
                            <button className="item user-avatar">
                                <img src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/335667532_719682573220013_8031197958873197253_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oUgHoiHFoX4AX-JeX7u&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCKSasguEv5vB7AajmpeaU3fv2oV5YwJekYPgtSSPw7eg&oe=641C279D" width="30px" height="30px" 
                                    alt="avatar-tung" title="tung" />
                            </button>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}
export default Appbar