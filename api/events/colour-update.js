const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1264871",
  key: "9e9ba095c4dd756509de",
  secret: "f4bb5892d81a7362f965",
  cluster: "ap1",
  useTLS: true
});

export default async function handler(req, res){
  console.log({...req.body})
  let pusherResponse = await pusher.trigger("main-channel", "colour-update", {colour: req.query.colour});
  console.log(await pusherResponse.json())
  res.send('Success.')
}
