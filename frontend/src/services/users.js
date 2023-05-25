import axios from 'axios'
const baseUrl = '/api/users'

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const userService = { create }

export default userService