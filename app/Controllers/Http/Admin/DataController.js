'use strict'

const Data = use('App/Models/Data')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with data
 */

class DataController {
  /**
   * Show a list of all data.
   * GET data
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    try {
      const data = await Data.find({})
      response.json({response: data})
    } catch (e) {
      response.status(400).json({
        response: {
          message: e.errmsg
        }
      })
    }
  }

  /**
   * Create/save a new data.
   * POST data
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const input = await request.all()
    let article = new Data(input)
    try {
      await article.save();
      response.json({
        response: {
          message: 'article created',
          data: article
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
   * Display a single data.
   * GET data/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    let article = await Data.find({_id: params.id});
    response.json({
      response: article
    })
  }

  /**
   * Update data details.
   * PUT or PATCH data/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let input = request.all()
    let article = await Data.findOne({_id: params.id});
    let keys = Object.keys(input);
    keys.map(key => article[key] = input[key]);
    try {
      await article.save()
      response.json({
        response: {
          message: 'article updated',
          data: article
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
   * Delete a data with id.
   * DELETE data/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      await Data.deleteOne({_id: params.id});
      response.json({
        response: {
          message: 'article deleted'
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

module.exports = DataController
