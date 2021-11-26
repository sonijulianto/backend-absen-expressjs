"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("absensis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nip: { type: Sequelize.STRING },
      divisi: { type: Sequelize.STRING },
      status: { type: Sequelize.INTEGER },
      alasan: { type: Sequelize.INTEGER },
      transportasi: { type: Sequelize.INTEGER },
      kondisi: { type: Sequelize.INTEGER },
      jenis: { type: Sequelize.INTEGER },
      latitude: { type: Sequelize.FLOAT },
      longitude: { type: Sequelize.FLOAT },
      doc: { type: Sequelize.INTEGER },
      docName: { type: Sequelize.STRING },
      docType: { type: Sequelize.STRING },
      docSize: { type: Sequelize.INTEGER },
      docMime: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      userdate: { type: Sequelize.STRING },
      suhu: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      other: { type: Sequelize.STRING },
      divisiid: { type: Sequelize.INTEGER },
      zona: { type: Sequelize.STRING },
      absen: { type: Sequelize.STRING },
      kegiatan: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("absensis");
  },
};
