import React from 'react'
import './Appbar.scss'
import { Container as BootstrapContainer, Row, Col,InputGroup, FormControl} from 'react-bootstrap'


function Appbar() {
    return (
            <nav className="navbar-app">
                <BootstrapContainer className="trello-container">
                    <Row>
                        <Col sm={5} xs ={12} className="col-no-padding">
                            <div className="app-actions">
                                <div className="item-all"><i className="fa fa-th" /></div>
                                <div className="item-home"><i className="fa fa-home" /></div>
                                <div className="item-boards"><i className="fa fa-columms" />&nbsp;&nbsp;<strong>Boards</strong></div>
                                <div className="item-search">
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
                                <div className="item quick"><i className="fa fa-plus-square-o" /></div>
                                <div className="item news"><i className="fa fa-info-circle"/></div>
                                <div className="item notification"><i className="fa fa-bell-o" /></div>
                                <div className="item user-avatar">
                                    <img src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/335667532_719682573220013_8031197958873197253_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oUgHoiHFoX4AX-JeX7u&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCKSasguEv5vB7AajmpeaU3fv2oV5YwJekYPgtSSPw7eg&oe=641C279D" width="30px" height="30px"
                                     alt="avatar-tung" title="tung" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </BootstrapContainer>
            </nav>   
    )
}
export default Appbar