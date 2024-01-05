import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers , createNewUserService ,deleteUserService ,editUserService } from '../../services/userServices';
import './UserManage.scss'
import ModalUser from './modalUser'
import {emitter} from '../../utils/emitter'
import ModalEditUser from './modalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser : false,
            userEdit : {},
        }

    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers("All")
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    createNewUser = async (data) => {
        try{
            let response =  await createNewUserService(data)
            if(response && response.errCode !== 0){
                alert(response.errMessage)
            }else{
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }catch(e){
            console.log(e)
        }
    }

     

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditUserModal = () => {
      this.setState({
        isOpenModalEditUser : !this.state.isOpenModalEditUser
      })
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id)
            if(res && res.errCode === 0){
                await this.getAllUsersFromReact()
            }else{
                alert(res.errMessage )
            }
        }catch(e){
            console.log(e)
        }
    }

    handleEditUser = async  (user) => {
        this.setState({
            isOpenModalEditUser : true,
            userEdit : user
        })
    }
    doEditUser = async (user) => {
        try{
            let res = await editUserService(user)
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser : false
                })
                this.getAllUsersFromReact()
            }
            else{
                alert(res.errCode)
            }
        }catch(e){
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <div className='title text-center'>With Demo Booking care</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus me-1"></i>
                        Add new user
                    </button>
                </div>
                <div className='user-table mt-5'>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr >
                                <th scope="col">Email</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item) => {
                                return (
                                    <tr key ={item.id}>
                                        <td scope="row">{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'>
                                                <i className="fas fa-pencil-alt" onClick={() => {
                                                this.handleEditUser(item)
                                            }}></i>
                                            </button>
                                            <button className='btn-delete' onClick={() => {
                                                this.handleDeleteUser(item)
                                            }}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleFrom = {this.toggleUserModal} 
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&   
                <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFrom = {this.toggleEditUserModal} 
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser} 
                />}
               
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
