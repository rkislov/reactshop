import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import  { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const {id} = useParams();
    const history = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails 

    useEffect(() => {
        dispatch(listProductDetails(id))

      }, [dispatch, id])

    const addToCartHandler = () => {
        history(`/cart/${id}?qty=${qty}`)
    }
    
    
    
  return (
    <>
        <Link className='btn btn-dark my-3' to='/'>Назад</Link>
        {loading 
        ? <Loader/>
        : error 
        ? <Message variant='danger'>{error}</Message>
        : (
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} обзоров`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Цена: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Описание: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Цена:
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Статус:
                                </Col>
                                <Col>
                                    <strong>
                                        {product.countInStock > 0 ? 'В наличии' 
                                        : 'Нет в наличии'}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Количество
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => 
                                        setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Row>
                            <Button
                                onClick={addToCartHandler}
                                className='btn-block' 
                                type='button'
                                disabled={product.countInStock === 0 }
                                >
                                В корзину
                            </Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        )
         }
        
    </>
  )
}

export default ProductScreen
