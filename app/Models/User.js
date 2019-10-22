'use strict'

const BaseModel = use('MongooseModel')
const mongooseHidden = require('mongoose-hidden', )({ defaultHidden: { password: true }})

class User extends BaseModel {
  static boot ({ schema }) {
    schema.plugin(mongooseHidden)
    this.index({email: 1}, {unique: true})
    
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  static get schema () {
    return {
      email: {
        type: String
      },
      password: {
        type: String
      },
      name: {
        type: String
      }
    }
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User.buildModel('User')
