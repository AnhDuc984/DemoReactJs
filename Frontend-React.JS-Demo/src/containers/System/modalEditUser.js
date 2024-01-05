import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id :'',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id : user.id,
                email: user.email,
                password: 'with love trang',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }

    }

    toggle = () => {
        this.props.toggleFrom()
    }


    handleOnChangeInput = (event, id) => {

        //good code
        let copyState = { ... this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Mising parameter ' + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            // call API 

            this.props.editUser(this.state)

        }
    }

    render() {

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
            >
                <ModalHeader
                    toggle={() => { this.toggle() }}>
                    Edit a neu user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-container'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'email');
                                        }}
                                        value={this.state.email}
                                        className="form-control"
                                        id="firstName"
                                        placeholder=""
                                        name="Email"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input
                                        type="password"
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'password');
                                        }}
                                        value={this.state.password}
                                        className="form-control"
                                        id="lastName"
                                        placeholder=""
                                        name="Password"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label htmlFor="inputEmail4">First Name</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'firstName');
                                        }}
                                        value={this.state.firstName}
                                        className="form-control"
                                        id="firstName"
                                        placeholder=""
                                        name="first name"
                                    />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label htmlFor="inputPassword4">Last Name</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'lastName');
                                        }}
                                        value={this.state.lastName}
                                        className="form-control"
                                        id="lastName"
                                        placeholder=""
                                        name="last name"
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="inputAddress">Address</label>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'address');
                                    }}
                                    value={this.state.address}
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder="1234 Main St"
                                    name="address"
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>



                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                        Save User
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





