import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async signin({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.ok(user)
  }

  async signout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.ok(null)
  }

  async me({ response, auth }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) {
      return response.unauthorized()
    }
    return response.ok(user)
  }
}
