const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async(account) => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async(id, account) => {
  const accId = await db('accounts')
  .where('id', id)
  .update(account)
  return getById(accId)
}

const deleteById = async id => {
  const toBeDel = await db('accounts')
  .where('id', id).del()
  return toBeDel
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
