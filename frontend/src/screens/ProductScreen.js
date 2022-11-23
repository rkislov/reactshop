import React, {useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import  { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
    const params = useParams();

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
          const {data } = await axios.get(`/api/products/${params.id}`)
    
          setProduct(data)
        }
    
        fetchProduct()
      }, [params])
    
    
    
  return (
    <>
        <Link className='btn btn-dark my-3' to='/'>Назад</Link>
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
                        <ListGroup.Item>
                            <Button 
                                className='btn-block' 
                                type='button'
                                disabled={product.countInStock === 0 }
                                >
                                В корзину
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen
