const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if(req.body.name === undefined || req.body.budget === undefined) {
   return res.status(400).json({ message: 'name and budget are required' })
  } 
  if(req.body.name.trim().length > 100 || req.body.name.trim().length < 3) {
   return res.status(400).json({ message: 'name of account must be between 3 and 100' })
  } 
  if(typeof req.body.budget !== 'number' || isNaN(req.body.budget)) {
   return res.status(400).json({ message: 'budget of account must be a number' })
  } 
  if(req.body.budget < 0 || req.body.budget > 1000000) {
   return res.status(400).json({ message: 'too large or too small' })  
  }
  next()

}

exports.checkAccountNameUnique = async(req, res, next) => {
  const existingName = await db('accounts').where('name', req.body.name.trim()).first()
  if(existingName){
    res.status(400).json({message: "that name is taken"})
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const checkId = await db('accounts').where('id', req.params.id).first()
    if (checkId) {
      req.account = checkId
      next()
    } else {
      res.status(404).json({ message: "account not found" })
    }
  } catch (err) {
    next(err)
  }
}
