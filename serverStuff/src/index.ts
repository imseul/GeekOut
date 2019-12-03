import express from 'express';
import questions from '../questions.json';

const app = express();
const port = 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let curQuestion = questions.comics[0];

enum phases {
    "between games",
    "select question",
    "bid phase",
    "answer phase",
}
let gamePhase: phases = 0;

interface player {name: string, points: number};
let players = new Map<string, player>();
let playerIterator = players.keys();
let curPlayer = playerIterator.next();

let highBid = {name: "", bid: 0};
let notPassed = new Map<string, player>();
let bidderIterator = notPassed.keys();
let curBidder = bidderIterator.next();

interface answer {ans: string, rejections: number}
let answers = new Map<string, answer>();
let curAnswerer = "";

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
playerpass - ndy
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

app.get('/startgame', (req, res) => {
    playerIterator = players.keys();
    curPlayer = playerIterator.next();
    gamePhase = 1;
    res.send("The game has started");
})

app.get('/gamestarted', (req, res) => {
    res.send(gamePhase >= 1);
})

app.post('/myturn', (req, res) => {
    const nameObj: {name: string} = req.body;
    res.send(nameObj.name == curPlayer.value);
})

app.post('/selectquestion', (req, res) => {
    const categoryObj: {category: keyof typeof questions} = req.body;
    const questionsByCate = questions[categoryObj.category];
    curQuestion = questionsByCate[Math.floor(Math.random()*questionsByCate.length)];
    gamePhase = 2;
    notPassed = new Map(players);
    bidderIterator = notPassed.keys();
    curBidder = bidderIterator.next();
    res.send(curQuestion);
})

app.get('/question', (req, res) => {
    if(gamePhase == 2){
        res.send(curQuestion);    
    } else{
        res.send("No Question yet");
    }
})

app.get('/getbid', (req, res) => {
    res.send(`${highBid.name} has bid ${highBid.bid}`);
})

app.post('/mybid', (req, res) => {
    if(gamePhase == 3){
        res.send("Bid phase over");
    }
    const nameObj: {name: string} = req.body;
    res.send(nameObj.name == curBidder.value);
})

app.post('/playerbid', (req, res) => {
    const bidObj: {name: string, bid: number} = req.body;
    if(bidObj.bid > highBid.bid){
        highBid = bidObj;
        res.send("Bid successful");
    } else {
        notPassed.delete(bidObj.name);
        res.send("Bid too low, count as pass");
    }
    curBidder = bidderIterator.next();
})

app.post('/playerpass', (req, res) => {
    const nameObj: {name: string} = req.body;
    notPassed.delete(nameObj.name);
    if(notPassed.size <= 1){
        curAnswerer = notPassed.keys().next().value;
        console.log("Bid phase over");
        gamePhase = 3;
    } else {
        console.log(`${nameObj.name} removed from bidders`)
    }
    curBidder = bidderIterator.next();
    res.send("You have passed");
})

/*
getanswers - done
sendanswer - done
rejectanswer - done
endanswerphase - done
 - giveuserpoints - done
 - takeuserpoints - done
 - nextplayer
 - endgame - done
*/

app.get('/getanswers', (req, res) =>{
    if(gamePhase != 3){
        res.send("Answer phase over");
    }
    res.send({answers});
})

app.post('/sendanswer', (req, res) => {
    const ansObj: {answer: string} = req.body;
    answers.set(ansObj.answer, {ans: ansObj.answer, rejections: 0});
    console.log(`${ansObj.answer} added to the answer list`)
    res.send("Answer submitted");
})

app.post('/rejectanswer', (req, res) => {
    const ansObj: {answer: string} = req.body;
    let numRejs = answers.get(ansObj.answer)?.rejections;
    if(numRejs){
        numRejs += 1;
    } else {
        numRejs = 0;
    }
    if(numRejs > players.size/2){
        answers.delete(ansObj.answer);
        console.log(`${ansObj.answer} deleted from answers`)
    } else {
        answers.set(ansObj.answer, {ans: ansObj.answer, rejections: numRejs});
        console.log(`${ansObj.answer} gained one rejection`)
    }
    res.send("Answer rejected");
})

app.get('/endanswerphase', (req, res) => {
    const playerGettingPoints = players.get(curAnswerer);
    if(playerGettingPoints){
        if(answers.size >= highBid.bid){
            players.set(playerGettingPoints.name, {name: playerGettingPoints.name, points: playerGettingPoints.points+highBid.bid});
            // End game check
            if(playerGettingPoints.points+highBid.bid > 10){
                gamePhase = 0;
                console.log(`${playerGettingPoints.name} won the game!`);
                res.send("Game Over");
            }
        } else {
            players.set(playerGettingPoints.name, {name: playerGettingPoints.name, points: playerGettingPoints.points-highBid.bid});
        }
    }
    //Next player
    if(curPlayer.done){
        playerIterator = players.keys();
        curPlayer = playerIterator.next();
    } else {
        curPlayer = playerIterator.next();
    }
    gamePhase = 1;
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

