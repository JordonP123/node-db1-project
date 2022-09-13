const router = require('express').Router()
const Account = require('./accounts-model')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', async(req, res, next) => {
  try{
    const getAccounts = await Account.getAll()
    res.json(getAccounts)
  } catch {
    res.status(500).json({ message: 'Could not get accounts' })
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async(req, res, next) => {
  try{
    const addPost = await Account.create({name: req.body.name.trim(), budget: req.body.budget})
    res.status(201).json(addPost)
  } catch(err) {
    res.status(500).json({ message: "could not add account" })
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async(req, res, next) => {
  try{
    const updateAcc = await Account.updateById(req.params.id, { name: req.body.name.trim(), budget: req.body.budget })
    res.json(updateAcc)
  } catch(err){
    res.status(500).json({ message: "could not update account" })
  }
});

router.delete('/:id', checkAccountId, async(req, res, next) => {
try{
   const delAcc = await Account.deleteById(req.params.id)
   res.json(delAcc)
} catch {
  res.status(500).json({ message: "could not delete account" })
}
})

router.use((err, req, res, next) => { // eslint-disable-line
})

module.exports = router;
