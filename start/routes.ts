/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TodosController = () => import('#controllers/todos_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/todos', [TodosController, 'create'])
    router.get('/todos/:id', [TodosController, 'getWithId'])

    router
      .group(() => {
        router.post('/signup', [UsersController, 'register'])
      })
      .prefix('users')

    router
      .group(() => {
        router.post('/signin', [AuthController, 'signin'])
        router.get('/me', [AuthController, 'me'])
        router.get('/signout', [AuthController, 'signout'])
      })
      .prefix('auth')
  })
  .prefix('api/')
