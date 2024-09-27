const express = require ("express")

const app = express();
const router = express.Router()
const bycyrt = require("bcryptjs")


router.post("", async (req, res, next)=>{
    const {username, password}= req.body
    const dummypass = "yesoneguy";
      if(!username || !password){
        res.json({"data":"username is important"})
        return 
    }

   await  bycyrt.compare(dummypass, password, (errors, result)=>{
        if(errors){
            res.json({"data":errors.message})
        }
       if(result ===false){
        res.json({"data":"your password is not correct"})
        return
       }
        res.json({"data":"succesfully login"})
    })
})



module.exports = router;
