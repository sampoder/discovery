const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1264871",
  key: "9e9ba095c4dd756509de",
  secret: "f4bb5892d81a7362f965",
  cluster: "ap1",
  useTLS: true,
});

export default async function handler(req, res) {
  await pusher.trigger("main-channel", "sine-update", req.body);
  res.send("Success.");
}
