import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button,Row } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userAction'


const LoginScreen = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    useEffect(() => {
      if(userInfo) {
        history(redirect)
      }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email,password))
    }
    return ( 
    <FormContainer>
      <h1>Вход</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Адресс электронной почты</Form.Label>
            <Form.Control type='email'
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control type='password'
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>
        
        <Row className='py-3'>
          <Button type='submit' variant='primary'>
              Вход
          </Button>
        </Row>
    </Form>
    <Row className='py-3'>
        Новый пользователь? <Link
        to={redirect ? `register?reditrect=${redirect}` : '/registetr'}
        >Регистрация
        </Link>
    </Row>
    </FormContainer>
  )
}

export default LoginScreen
