const handleSignin = (req,res,postgres,bcrypt)=>{
	postgres.select('email','hash').from('login')
		.where({email:req.body.email})
		.then(data=>{
			const isValid = bcrypt.compareSync(req.body.pass, data[0].hash);
			if (isValid){
				return postgres.select('*').from('users')
					.where({email:req.body.email})
					.then(user=>{
						res.json(user[0])
					})
					.catch(err=> res.status(400).json("Unable to login"))
			}else{
				res.status(400).json("Wrong Credentials")
			}
		})

		.catch(err=> res.status(400).json("Error in login"))
	}

	module.exports ={
		handleSignin : handleSignin
	}