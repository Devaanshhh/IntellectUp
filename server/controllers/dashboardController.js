const dashboard = (req,res)=>{

    res.json({

        message:
        "Welcome to IntellectUp Dashboard",

        user:req.user

    })

}

module.exports = {
dashboard
}