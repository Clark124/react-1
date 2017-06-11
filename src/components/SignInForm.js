import React from 'react';
import { Button,FormControl,Form,FormGroup,Col,ControlLabel} from 'react-bootstrap'
export default function (props) {
    return (
        <Form horizontal onSubmit={props.onSubmit}>
                <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                    用户名
                </Col>
                <Col sm={9}>
                    <FormControl type="text" placeholder="请输入用户名" value={props.formData.username}
                        onChange={props.onChange.bind(null,'username')}
                    />
                </Col>
                </FormGroup>

                <FormGroup >
                <Col componentClass={ControlLabel} sm={3}>
                    密码
                </Col>
                <Col sm={9}>
                    <FormControl type="password" placeholder="请输入密码" value={props.formData.password}
                        onChange={props.onChange.bind(null,'password')}
                    />
                </Col>
                </FormGroup>

                <FormGroup>
                <Col sm={6}>
                    <Button type="submit" bsStyle="primary" >
                    登录
                    </Button>
                    
                </Col>
                <Col sm={6}>
                    <a  className="forgotPsd" href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
                </Col>
                </FormGroup>
            </Form>     
    )
}