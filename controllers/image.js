const Clarifai = require('Clarifai');

const app = new Clarifai.App({

 apiKey: 'a5ec07b0c5b1413486cf981f7c4bc1c6'
});

const handleApiCall = (req,res)=>{
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data=>{
			res.json(data);
		}).catch(err=>res.status(400).json("Unable to work with API"))
}


const handleImage = (req,res,postgres)=>{
	const {id} = req.body;
	postgres('users').where({id:id})
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json("Unable to receive entries."))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}