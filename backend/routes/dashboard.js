const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/',authorization,async (req,res) => {
    try {
        const user = await pool.query("SELECT user_name FROM users WHERE user_id=$1",[req.user]);

        res.status(200).json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(401).json("Not Authorized");
    }
});

module.exports = router;