const handleRegister = (req,res, postgres, bcrypt)=>{
	const {email, name, pass} = req.body;
	if(!email || !name || !pass){
		return res.status(400).json("Incorrect.")
	}
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(pass,salt);

		postgres.transaction(trx=> {
			trx.insert({
				hash:hash,
				email:email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name, 
						joined:new Date()
				})
				.then(user=>{
					res.json(user[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err=>res.status(400).json("Unable to Register."))
	}

	module.exports={
		handleRegister: handleRegister
	}