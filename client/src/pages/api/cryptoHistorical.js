import axios from "axios";
const fs = require("fs");

export default async (req, res) => {
  if (!req.body['id']) {
    return res.status(400).json({error: 'No coin id given'});
  }
  const id = req.body['id'].toLowerCase();
  const options = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${id}/market_chart?vs_currency=cad&days=max`,
    params: {vs_currency: 'cad', days: 'max'},
    headers: {
      'x-rapidapi-host': process.env.COIN_GECKO_HOST,
      'x-rapidapi-key': process.env.COIN_GECKO_SECRET
    }
  };

  fs.readFile('src/pages/api/cryptoHistorical.json', 'utf8', function readFileCallback(err, data){
    if (err){
      return res.status(200).send(err);
    } else {
    let cryptoHistory = JSON.parse(data); //now it an object
    let historicalData = Object.keys(cryptoHistory);
    console.log("KEYS IN HISTORICAL: ", historicalData)
    if (historicalData.includes(id)) {
      console.log(`FOUND DATA IN API FOR ${id}`)
      return res.status(200).json(cryptoHistory[id]);
    }
    // console.log(options)
    axios.request(options).then(function (response) {
      if (id === 'ethereum') console.log("ETH: ", id, response)
      cryptoHistory[id] = response.data.prices
      const json = JSON.stringify(cryptoHistory)
      fs.writeFile('src/pages/api/cryptoHistorical.json', json, 'utf8', function writeFileCallback(err, data) {
        if (err) {
          console.log("error writing back to json, cryptoHistorical", err)
          // console.log(json);
        }
      });
      return res.status(200).json(response.data);
    }).catch(function (error) {
      console.log("RESPONSE FROM COINGECKO:", error)

      return res.status(500).send(error);
    });
}});

}

