import React, { useState, useEffect } from 'react'
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { LoginUser, reset } from "../features/authSlice"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user || isSuccess) {
            Swal.fire({
                title: user.message,
                icon: 'success'
            }).then(() => {
                navigate("/")
            })
        }
        dispatch(reset())
    }, [user, isSuccess, navigate, message, dispatch])

    const Auth = (e) => {
        e.preventDefault()
        dispatch(LoginUser({ name, password }))
    }

    return (
        <Container className='min-vh-100'>
            <Row className='justify-content-md-center'>
                <Col xl="4">
                    <Card className='top-50'>
                        <Card.Body>
                            <Form onSubmit={Auth}>
                                <Form.Group className="mb-3" controlId="ControlInput1">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        size='sm'
                                        type="text"
                                        placeholder="Username"
                                        value={name}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="ControlInput2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        size='sm'
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant='primary' type='submit'>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login