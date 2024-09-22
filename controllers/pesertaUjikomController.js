const { User, pesertaUjikom } = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class pesertaUjikomController {
  // home
  static async home(req, res) {
    console.log('controller')
    try {
      res.status(200).json({
        home: 'ini halama home'
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // get MUK
  static async pesertaGetMUK(req, res) {
    try {
      const { mukId } = req.params;
      const fields = await Apl2Dynamic.findAll({ where: { mukId } });
      res.json(fields);

    } catch (error){

    }
  }

  static async pesertaPostApl01(req, res) {
    try {
      const { applicantName, dynamicFields } = req.body;

      const base = await Apl02Base.create({ applicantName });

      const dynamicEntries = dynamicFields.map(field => ({
        mukId: field.mukId,
        fieldName: field.fieldName,
        fieldValue: field.fieldValue,
        baseId: base.id
      }));
      }catch(error) {

      }
    }
  // news lsp
  // about LSP UPN VJ
  // reviewer LSP UPNVJ
  // pemetaan anak didik LSP UPNVJ
}