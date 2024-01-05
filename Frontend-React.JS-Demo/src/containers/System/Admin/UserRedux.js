import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import { selectFilter } from 'react-bootstrap-table2-filter';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            positions: '',
            roles: '',
            avatar: '',


            usersEditId: "",
            action: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].KeyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                roles: arrRoles && arrRoles.length > 0 ? arrRoles[0].KeyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                positions: arrPositions && arrPositions.length > 0 ? arrPositions[0].KeyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].KeyMap : '',
                positions: arrPositions && arrPositions.length > 0 ? arrPositions[0].KeyMap : '',
                roles: arrRoles && arrRoles.length > 0 ? arrRoles[0].KeyMap : '',
                avatar: '',
                action: CRUD_ACTION.CREATE,
                previewImgUrl : ''
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValueInput()
        if (isValid === false) return
        let { action } = this.state

        if (action === CRUD_ACTION.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roles,
                positionId: this.state.positions,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTION.EDIT) {
            this.props.editUserRedux({
                id: this.state.usersEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roles,
                positionId: this.state.positions,
                avatar: this.state.avatar
            })
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValueInput = () => {
        let isValue = true
        let arrCheck = ["email", 'password', 'firstName', 'lastName',
            'phoneNumber', 'address',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValue = false;
                alert('this input is required : ' + arrCheck[i]);
                break;
            }
        }
        return isValue
    }

    handleEditUserFrom = (users) => {
        let imageBase64 = ''
        if (users.image) {
            imageBase64 = new Buffer(users.image , 'base64').toString('binary')
        }
        this.setState({
            email: users.email,
            password: '123456',
            firstName: users.firstName,
            lastName: users.lastName,
            phoneNumber: users.phoneNumber,
            address: users.address,
            gender: users.gender,
            positions: users.positionId,
            roles: users.roleId,
            avatar: '',
            previewImgUrl : imageBase64,
            action: CRUD_ACTION.EDIT,
            usersEditId: users.id
        })
    }

    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        let isLoading = this.props.isLoadingGender
        let role = this.state.roleArr
        let position = this.state.positionArr


        let { email, password, firstName, lastName, phoneNumber, address, gender, positions, roles, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    user- redux Nguyen Anh Duc
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className='col-12'>{isLoading === true ? 'loading gender' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='number'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return <option key={index} value={item.KeyMap} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    })}

                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'positions') }}
                                    value={positions}
                                >
                                    {position && position.length > 0 && position.map((item, index) => {
                                        return <option key={index} value={item.KeyMap} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id="manage-user.role-id" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'roles') }}
                                    value={roles}
                                >
                                    {role && role.length > 0 && role.map((item, index) => {
                                        return <option key={index} value={item.KeyMap} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}

                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    >

                                    </div>
                                </div>

                            </div>
                            <div className='col-12 '>
                                <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary mt-3"}
                                    onClick={() => { this.handleSaveUser() }}
                                >
                                    {this.state.action === CRUD_ACTION.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />}
                                </button>
                            </div>
                            <div className='col-12 mt-3'>
                                <TableManageUser
                                    handleEditUserFrom={this.handleEditUserFrom}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGenders,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),

        editUserRedux: (data) => dispatch(actions.editUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
