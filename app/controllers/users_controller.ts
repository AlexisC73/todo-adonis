import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.create({ email, password })
      return response.created(user)
    } catch (e) {
      return response.badRequest('User already exists')
    }
  }
}
