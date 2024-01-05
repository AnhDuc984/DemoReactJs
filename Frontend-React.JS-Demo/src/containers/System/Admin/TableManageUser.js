import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageUser.scss'
import actionTypes from '../../../store/actions/actionTypes';


// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';

// import 'react-markdown-editor-lite/lib/index.css';


// const mdParser = new MarkdownIt


function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
};

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }
    componentDidMount() {
        this.props.fetchUsersRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDelete = (users) => {
        this.props.deleteUser(users.id)
    }
    handleEditUser = (users) => {
        this.props.handleEditUserFrom(users)
    }
    render() {
        let arrUsers = this.state.usersRedux
        return (
            <React.Fragment>
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
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td scope="row">{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            onClick={() => this.handleDelete(item)}
                                            className='btn-delete'>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </React.Fragment>

        );
    }
}
const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
