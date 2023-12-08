const config = require('../../src/lighthouse-ci/configs/config');
const dotenv = require('dotenv');

dotenv.config();

const BASE_URL = process.env.LHCI_BASE_URL;

config.ci.collect.url = [BASE_URL + '/', BASE_URL + '/about'];

module.exports = config;
