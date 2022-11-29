import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import Product from '../models/userModel.js'


// @description Auth user & get token
// @route POST /api/users/login
// @access Public route
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('неправильное имя пользователя или пароль')
    }
    
    // res.send({
    //     email, 
    //     password,
    // })
})


// @description Get users profile
// @route GET /api/users/profile
// @access Private route
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('Пользователь не найден')
    }
})


// @description Register new user
// @route POST /api/users/login
// @access Public route
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Пользователь уже существует')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Неправильные данные')
    }
})