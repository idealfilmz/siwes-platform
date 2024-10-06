 
const express = require ("express")
const db  = require("../datbase_handler")
const router = express.Router()
const bcrypt= require("bcryptjs")



// this will fetch each students details

router.get("/fetch-lecture", async (req, res) => {
    const { student_id} = req.query;
    db.query(
       "SELECT * FROM  supervisors WHERE id =?",[student_id],(error, result)=>{
        if(error){
            return error
        }
       res.json({result})
       }
      );

    });  
  


module.exports = router;
