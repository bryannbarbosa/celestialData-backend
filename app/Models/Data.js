'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Data
 */
class Data extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'DataHook.method')
    // Indexes:
    // this.index({}, {background: true})
    this.index({title: 1}, {unique: true})
  }
  /**
   * Data's schema
   */
  static get schema () {
    return {
      title: {
        type: String
      },
      keywords: []
    }
  }
}

module.exports = Data.buildModel('Info')
