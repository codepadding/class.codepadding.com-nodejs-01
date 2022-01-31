const db = require('../models')
var bcrypt = require('bcryptjs');

const Users = db.users

const getAllUser = async (req, res) => {

    const { status = 1 } = req.query;

    const users = await Users.findAll({
        // attributes:['name','email']
        attributes: {
            exclude: ['password', 'updatedAt']
        },
        where: {
            status: status
        }
    });


    res.status(200).json({
        status: true,
        message: "success",
        data: {
            users: users
        }
    })
}


const userSignUp = async (req, res) => {
    try {

        console.log(req.body);

        const { name, email, password, age } = req.body
        // const query = req.body


        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                error: "invalid request"
            })
        }


        if (!email) {
            return res.status(400).json({
                status: false,
                error: "email require"
            })
        }

        // if (!age) {
        //     return res.status(400).json({
        //         status: false,
        //         error: "age require"
        //     })
        // }

        const user = await Users.findOne({
            where: {
                email: email
            }
        })


        if (user) {
            return res.status(200).json({
                status: false,
                error: "email alreay register . try another!"
            })
        }




        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        
        const result = await Users.create({
            name: name,
            email: email,
            password: hash,
            age: age
        });

        console.log("result", result);

        res.json(result)
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}


const userLogin = async (req, res) => {

    const body = req.body

    if (!body.email || !body.password) {
        return res.json({
            status: false,
            error: "invalid request"
        })
    }



    const have = body.email.includes("@")


    if (!have) {
        return res.json({
            status: false,
            error: "enter a valid email address"
        })
    }


    const user = await Users.findOne({
        where: {
            email: body.email
        }
    })


    if (!user) {
        return res.json({
            status: false,
            error: "user not found . please creatre a new account"
        })
    }


    if (user.password != body.password) {
        return res.json({
            status: false,
            error: "wrong password"
        })
    }



    const data = {
        status: true,
        message: "login success",
        user: user
    }

    res.json(data)
}

const updateUser = async (req, res) => {
    const { id: userId, updateData } = req.body

    if (!userId) {
        return res.json({
            status: false,
            error: "enter a user id"
        })
    }


    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        return res.json({
            status: false,
            error: "user not found"
        })
    }



    const result = await Users.update({
        name: updateData.name,
        status: updateData.status
    }, {
        where: {
            id: userId
        }
    })



    console.log(result);

    res.json({
        status: true,
        message: "succesfully updated"
    })


}


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.json({
                status: false,
                error: "enter a user id"
            })
        }


        const user = await Users.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.json({
                status: false,
                error: "user not found"
            })
        }



        const result = await Users.destroy({
            where: {
                id: userId
            }
        })

        console.log('====================================');
        console.log(result);
        console.log('====================================');

        res.json({
            status: false,
            message: "successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}


const restore = async (req,res) => {

    try {
        const { userId } = req.body

        if (!userId) {
            return res.json({
                status: false,
                error: "enter a user id"
            })
        }


        const user = await Users.findOne({
            where: {
                id: userId,
            },
            paranoid:false
        })

        if (!user) {
            return res.json({
                status: false,
                error: "user not found"
            })
        }



        const result = await Users.restore({
            where: {
                id: userId
            }
        })

        res.json({
            status: false,
            message: "successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}


const hardDelete = async (req,res) => {

    try {
        const { userId } = req.body

        if (!userId) {
            return res.json({
                status: false,
                error: "enter a user id"
            })
        }


        const user = await Users.findOne({
            where: {
                id: userId
            },
            paranoid:false
        })

        if (!user) {
            return res.json({
                status: false,
                error: "user not found"
            })
        }



        const result = await Users.destroy({
            where: {
                id: userId
            },
            force: true
        })

        console.log('====================================');
        console.log(result);
        console.log('====================================');

        res.json({
            status: false,
            message: "successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}


module.exports = {
    getAllUser,
    userSignUp,
    userLogin,
    deleteUser,
    updateUser,
    hardDelete,
    restore
}