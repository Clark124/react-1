import React,{Component} from 'react';
import './UserDialog.css'
import {signUp,signIn,sendPasswordResetEmail} from './leancloud'
import {getErrorMessage} from './getErrorMessage'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab:'signInOrSignUp',
            formData:{
                email:'',
                username:"",
                password:"",
            }
        }
    }
    
    signUp(e){
        e.preventDefault()
        let {email,username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp(user)
        }
        let error = (error)=>{
           alert(getErrorMessage(error))
        }
        signUp(email,username,password,success,error)
    }
    signIn(e){
        e.preventDefault()
        let {username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error = (error)=>{
            alert(getErrorMessage(error))
        }
        signIn(username,password,success,error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab= 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email,function(ret){

        })
    }
    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }

    render(){  
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? 
                    <SignInOrSignUp
                    formData={this.state.formData}
                    onSignIn={this.signIn.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onForgotPassword={this.showForgotPassword.bind(this)}
                    />: 
                    <ForgotPasswordForm 
                    formData={this.state.formData}
                    onSubmit={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onSignIn={this.returnToSignIn.bind(this)}
                    />}
                </div>
            </div>
        )
    }

}