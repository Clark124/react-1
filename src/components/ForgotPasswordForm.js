import React, { Component } from 'react';
import { Button,FormControl,Form,FormGroup,Col,ControlLabel} from 'react-bootstrap'
export default class ForgotPasswordForm extends Component {
    render() {
        return (
            <div className="forgotPassword">
                <h4>重置密码</h4>
                <Form horizontal onSubmit={this.props.onSubmit}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>
                            邮箱
                        </Col>
                        <Col sm={9}>
                            <FormControl type="email" placeholder="请输入邮箱" value={this.props.formData.email}
                            onChange={this.props.onChange.bind(null, 'email')} />
                        </Col>   
                    </FormGroup>

                    <FormGroup>
                        <Col sm={6}>
                            <Button type="submit" bsStyle="primary" >发送重置邮件</Button>
                        </Col>
                        <Col sm={6}>
                             <a className="returnSignUp" href="#" onClick={this.props.onSignIn}>返回登录</a>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}