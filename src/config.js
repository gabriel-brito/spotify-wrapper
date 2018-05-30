const TOKEN_API = 'BQASPlc8MgaS0j_6svm0uo6w-VfcdxYrvfPIdSIjwJrEdER6vLWCbgJ1x2cb0bkuDfS8KxSFXp1quCfLK4Voag7A9n9W4jP_pbKnX5duS_-QRxgcdn8iQIdz-8wtMjF_pIi9fNY4ocAt19gE4po5zuONfmQROTiLYiQ';

const API_URL = 'https://api.spotify.com/v1';

const HEADERS = {
  headers: {
    Authorization: `'Bearer ${TOKEN_API}'`,
  },
};

module.exports = {
  API_URL,
  HEADERS
}