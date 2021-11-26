"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  absensi.init(
    {
      nip: DataTypes.STRING,
      divisi: DataTypes.STRING,
      status: DataTypes.INTEGER,
      alasan: DataTypes.INTEGER,
      transportasi: DataTypes.INTEGER,
      kondisi: DataTypes.INTEGER,
      jenis: DataTypes.INTEGER,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      doc: DataTypes.INTEGER,
      docName: DataTypes.STRING,
      docType: DataTypes.STRING,
      docSize: DataTypes.INTEGER,
      docMime: DataTypes.STRING,
      username: DataTypes.STRING,
      userdate: DataTypes.STRING,
      suhu: DataTypes.STRING,
      address: DataTypes.STRING,
      other: DataTypes.STRING,
      divisiid: DataTypes.INTEGER,
      zona: DataTypes.STRING,
      absen: DataTypes.STRING,
      kegiatan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "absensi",
    }
  );
  return absensi;
};
