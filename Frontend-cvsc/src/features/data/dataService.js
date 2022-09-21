import axios from "axios";

const API_URL = "/api/vote";

const sendVote = async (voteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, voteData, config);

  return response.data;
};

const dataService = { sendVote };

export default dataService;
