import React, { Component } from 'react';
import '../css/UserDialog.css'
import { signUp, signIn, sendPasswordResetEmail } from '../js/leancloud'
import { getErrorMessage } from '../js/getErrorMessage'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
import { Alert} from 'react-bootstrap'
export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: "",
                password: "",
            },
            errMsgStyle:{
                display:'none'
            }

        }
    }
    isEmai(str) {
        return /^\w+@\w+\.\w+$/.test(str)
    }

    isValidUsername(str) {
        return /^\w{6,20}$/.test(str)
    }
    isValidPassword(str) {
        if (str.length < 6 || str.length > 20 || /\W/.test(str)) {
            return false;
        }
        var count = 0;
        if (/[a-z]/g.test(str)) count++;
        if (/[A-Z]/g.test(str)) count++;
        if (/[0-9]/g.test(str)) count++;
        if (/_/g.test(str)) count++;
        if (count >= 2) {
            return true;
        }else{
            return false;
        }
    }
    showErrMsg() {
        let { email, username, password } = this.state.formData
        if (email !== '' && this.isEmai(email) === false) {
            // alert('请输入正确的邮箱');
            this.refs.errMsg.innerHTML = '请输入正确的邮箱'
            
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.formData.email = "";
            stateCopy.errMsgStyle.display = 'block';
            this.setState(stateCopy)
            return
        }
        if (username !== '' && this.isValidUsername(username) === false) {
            this.refs.errMsg.innerHTML = '请输入正确用户名'
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.formData.username = "";
            this.setState(stateCopy)
            return
        }
        if (password !== '' && this.isValidPassword(username) === false) {
            this.refs.errMsg.innerHTML = '请输入正确密码'
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.formData.password = "";
            this.setState(stateCopy)
            return
        }
    }

    signUp(e) {
        e.preventDefault()
        let { email, username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignUp(user)
        }
        let error = (error) => {
            alert(getErrorMessage(error))
        }
        if (email === "") {
            alert('必须填写邮箱')
            return
        }
        if (username === "") {
            alert('必须填写用户名')
            return
        }
        if (password === "") {
            alert('必须填写密码')
            return
        }
        // if(this.isEmai(email)===false){
        //     alert('请输入正确的邮箱')
        //     return
        // }
        signUp(email, username, password, success, error)
    }

    signIn(e) {
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignIn.call(null, user)
        }
        let error = (error) => {
            alert(getErrorMessage(error))
        }
        signIn(username, password, success, error)
    }

    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }


    showForgotPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }

    resetPassword(e) {
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email, (success)=> {
            alert('重置成功，请到邮箱修改密码')
            this.returnToSignIn();
        },(error)=>{
            alert(error)
        })
    }

    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }


    render() {
        return (

            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ?
                        <SignInOrSignUp
                            formData={this.state.formData}
                            onSignIn={this.signIn.bind(this)}
                            onSignUp={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onBlur={this.showErrMsg.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                        /> :
                        <ForgotPasswordForm
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}
                        />}
                    <Alert bsStyle="danger" style={this.state.errMsgStyle} ref="alert">
                        <strong ref="errMsg"></strong>
                    </Alert>    
                   
                </div>
            </div>
        )
    }

}