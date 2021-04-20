const pool = require('../db');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../middleware/authorization');
const validInfo = require('../middleware/validInfo');

// register user
router.post('/register',validInfo, async (req,res) => {
    try {
       const { name,email,password } = req.body;
       
        //check if user exists from database
        const user_found = await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);
        
        // if user exists
        if(user_found.rowCount !== 0){
            console.log(user_found.rows[0]);
            return res.status(400).send("User already exists");
        }

        // bycrypt user password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password,salt);

        const new_user = await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",[name,email,bcryptPassword]);

        // send jwt token
        const token = jwtGenerator(new_user.rows[0].user_id);
        res.status(200).send({
            msg:"User registered successfully",
            token
        });

        console.log(new_user.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login user
router.post('/login',async (req,res) => {
    try {
        const { email,password } = req.body;

        // check if user exists
        const user_found = await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);

        // user not found
        if(user_found.rowCount === 0){
            return res.status(401).json(`No user found with email: ${email}`);
        }

        // if user found check for password
        const validPassword = await bcrypt.compare(password,user_found.rows[0].user_password);

        console.log(validPassword);
        if(!validPassword){
            return res.status(401).json("Incorrect password!");
        }

        // if user found and password is correct
        const token = jwtGenerator(user_found.rows[0].user_id);
        res.status(200).json({msg:"User logged in successfully",token});

    } catch (err) {
        console.error(err.message);
        res.status(403).json("Server Error");
    }
});

router.get('/is-verify',authorization,async (req,res) => {
    try {
        res.status(200).json(true);
    } catch (err) {
        console.error(err.message);
        res.status(403).json("Server Error");
    }
})

module.exports = router;