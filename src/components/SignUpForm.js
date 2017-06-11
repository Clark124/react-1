import React from 'react';
import { Button,FormControl,Form,FormGroup,Col,ControlLabel} from 'react-bootstrap'
export default function(props) {

        return (
            <Form horizontal onSubmit={props.onSubmit.bind(this)}>
                <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                    邮箱
                </Col>
                <Col sm={9}>
                    <FormControl type="email" placeholder="请输入邮箱" value={props.formData.email}
                        onChange={props.onChange.bind(null,'email')}
                        onBlur={props.onBlur}
                    />
                </Col>
                </FormGroup>

                <FormGroup  onSubmit={props.onSubmit.bind(this)}>
                <Col componentClass={ControlLabel} sm={3}>
                    用户名
                </Col>
                <Col sm={9}>
                    <FormControl type="text" placeholder="请输入用户名" value={props.formData.username}
                        onChange={props.onChange.bind(null,'username')}
                        onBlur={props.onBlur}
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
                        onBlur={props.onBlur}
                    />
                </Col>
                </FormGroup>

                <FormGroup>
                <Col sm={6}>
                    <Button type="submit" bsStyle="primary" >
                    注册
                    </Button>
                </Col>
                </FormGroup>
            </Form>     
        )

}