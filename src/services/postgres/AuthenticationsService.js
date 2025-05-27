const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  // Adding Refresh Token To Authentication Table
  async addRefreshToken(token) {
    const query = {
      text: "INSERT INTO authentications VALUES ($1)",
      values: [token],
    };

    await this._pool.query(query);
  }

  // Getting And Verify Refresh Token On Authentication Table
  async verifyRefreshToken(token) {
    const query = {
      text: "SELECT token FROM authentications WHERE token = $1",
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Refresh Token tidak valid");
    }
  }

  // Delete Refresh Token If User Log Out
  async deleteRefreshToken(token) {
    const query = {
      text: "DELETE FROM authentications WHERE token = $1",
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationsService;
