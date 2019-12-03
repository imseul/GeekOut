import express from 'express';
import questions from '../questions.json';

const app = express();
const port = 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let gameStarted = false;
let gameState = "betweenGames";
let curQuestion = questions.comics[0];
let questionValid = false;
interface player {name: string, points: number};
let players = new Map<string, player>();
let curPlayer = "";
let curBidder = "";
let curAnswerer = "";
let highBid = {name: "", bid: 0};
let notPassed = new Map<string, player>();
let answers: string[] = [];

/*
Set up a server * done
Connect to phone clients who are playing the game
Get start game signal
Select Player 1
Get category and select question
Start bidding process
Announce bid winner
Accept answers from bid winner and display them on all phones
Award the user points, and continue to the next user.
*/

/*
addplayer - done
getusers - done
startgame - done
selectquestion - done
getbid - done
playerbid - done
playerpass - done
getanswers
sendanswer
rejectanswer
giveuserpoints
takeuserpoints
nextplayer
endgame
myturn? - done
mybid - done
*/

app.get('/', (req, res) => {
    res.send(`Main page. Does nothing. Sorry`);
})

app.post('/addplayer', (req, res) => {
    const nameObj: {name: string} = req.body;
    players.set(nameObj.name, {name: nameObj.name, points: 0});
    console.log(`${nameObj.name} added to the player list.`);
    res.send("success");
})

app.get('/getusers', (req, res) => {
    const playerlist = [...players.values()];
    res.send({playerlist});
})

app.post('/startgame', (req, res) => {
    const nameObj: {name: string} = req.body;
    curPlayer = nameObj.name;
    res.send(gameStarted);
})

app.get('/gamestarted', (req, res) => {
    res.send(gameStarted);
})

app.post('/myturn', (req, res) => {
    const nameObj: {name: string} = req.body;
    res.send(nameObj.name == curPlayer);
})

app.post('/selectquestion', (req, res) => {
    const categoryObj: {category: keyof typeof questions} = req.body;
    const questionsByCate = questions[categoryObj.category];
    curQuestion = questionsByCate[Math.floor(Math.random()*questionsByCate.length)];
    questionValid = true;
    notPassed = new Map(players);
    res.send(curQuestion);
})

app.get('/question', (req, res) => {
    if(questionValid){
        res.send(curQuestion);    
    } else{
        res.send("");
    }
})

app.get('/getbid', (req, res) => {
    res.send(`${highBid.name} has bid ${highBid.bid}`);
})

app.post('/mybid', (req, res) => {
    const nameObj: {name: string} = req.body;
    res.send(nameObj.name == curBidder);
})

app.post('/playerbid', (req, res) => {
    const bidObj: {name: string, bid: number} = req.body;
    if(bidObj.bid > highBid.bid){
        highBid = bidObj;
        res.send("Bid successful");
    }
})

app.post('/playerpass', (req, res) => {
    const nameObj: {name: string} = req.body;
    notPassed.delete(nameObj.name);
    if(notPassed.size <= 1){

    }
})

app.get('/getanswers', (req, res) =>{

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

