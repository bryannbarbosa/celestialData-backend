'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    try {
      const users = await User.find({})
      response.json({
        response: users
      })
    } catch(e) {
      response.status(400).json({
        response: {
          message: e.errmsg
        }
      })
    }
  }

  /**
   * AUTH user and return JWT.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

   async auth ({ request, response, auth }) {
    const { email, password } = request.all()
    let token = await auth.attempt(email, password)
    let user = await User.find({email: email})
    response.json({response: token, user})
   }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const input = await request.all()
    let user = new User(input)
    try {
      await user.save();
      response.json({
        response: {
          message: 'user created',
          data: user
        },
      })
    } catch (e) {
      response.status(400).json({
        response: {
          message: e.errmsg
        }
      })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    let user = await User.find({_id: params.id});
    response.json({
      response: user
    })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let input = request.all()
    let user = await User.findOne({_id: params.id});
    let keys = Object.keys(input);
    console.log(keys);
    keys.map(key => user[key] = input[key]);
    try {
      await user.save()
      response.json({
        response: {
          message: 'user updated',
          data: user
        },
      })
    } catch(e) {
      response.status(400).json({
        response: {
          message: e.errmsg
        }
      })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      await User.deleteOne({_id: params.id});
      response.json({
        response: {
          message: 'user deleted'
        },
      })
    } catch(e) {
      response.status(400).json({
        response: {
          message: e.errmsg
        }
      })
    }
  }
}

module.exports = UserController
