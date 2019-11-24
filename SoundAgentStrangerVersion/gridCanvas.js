//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas1;
let gridCanvas;


//Objects
let toMouse;
let toUser;
let toVendingMachine;
let toBookShelf;
let distUser;
let distBookShelf;
let distVendingMachine;

//---User's emos relevant---
let userEmosStore;
let userNeutralStore = [];
let userHappyStore = [];
let userSurprisedStore = [];
let userFearfulStore = [];
let userAngerStore = [];
let userDisgustedStore = [];
let userSadStore = [];

let userNeutralSum = 0;
let userHappySum = 0;
let userSurprisedSum = 0;
let userFearfulSum = 0;
let userAngerSum = 0;
let userDisgustedSum = 0;
let userSadSum = 0;

let userNeutralLevel;
let userHappyLevel;
let userSurprisedLevel;
let userFearfulLevel;
let userAngerLevel;
let userDisgustedLevel;
let userSadLevel;
let rayaState;

//---Raya relevant---
let isNearByUser = false;
let isAttractedByUser = true;
let changeBehaviorTime = 0;

let generateStateTime = 0;
let generateTimeStore = 0;

let delayEffect;

let walkSound = [];
let coughSound = [];
let flipPageSound = [];
let buyDrink = [];
let laughingSound = [];
let surpriseSound = [];
let breathSound;
let sitOnChairSound;
let putACupSound;
let putABookSound;

let pMicrophoneGetLevel;
let cMicrophoneGetLevel;


//For event programing
let timeLoop;
let timeWait;
let loopTime = 0;//60 seconds loop
let waitingTime = 0;
let okIgottaGo = 30;//The timing agent get into loop between bookshelf and vendingMachine

let walkFrame = 0;
let breathFrame = 0;
let sittingFrame = 0;
let buyDrinkFrame = 0;


//p5.serialport relevant
let serial;
let outData = 0; // for data output
let portName = '/dev/tty.usbmodem14401';  // fill in your serial port name here


//----- Grid canvas -----
canvas1 = p => {
  p.preload = () => {
    for(let i=0; i < 20; i++){
      // walkSound[i] = p.loadSound("/soundEffects/walkSoundSmall/walk"+i+".mp3");
      walkSound[i] = p.loadSound("/soundEffects/walkSound/walk"+i+".mp3");
    }
    for(let i=0; i < 4; i++){
      coughSound[i] = p.loadSound("/soundEffects/coughSound/cough"+i+".mp3");
    }
    for(let i=0; i < 5; i++){
      flipPageSound[i] = p.loadSound("/soundEffects/flipPage/flip"+i+".mp3");
    }
    for(let i=0; i < 5; i++){
      buyDrink[i] = p.loadSound("/soundEffects/vendingMachine/buyDrink"+i+".mp3");
    }
    for(let i=0; i < 4; i++){
      laughingSound[i] = p.loadSound("/soundEffects/laughingSound/laugh"+i+".mp3");
    }
    for(let i=0; i < 4; i++){
      surpriseSound[i] = p.loadSound("/soundEffects/surprise/surprise"+i+".wav");
    }

    breathSound = p.loadSound("/soundEffects/breath.mp3");
    sitOnChairSound = p.loadSound("/soundEffects/sitOnChair.mp3");
    putACupSound = p.loadSound("/soundEffects/putACupOfTea.mp3");
    putABookSound = p.loadSound("/soundEffects/putABook.mp3");
  }

  p.setup = () => {
    p.createDiv();
    gridCanvas = p.createCanvas(1280, 405);
    gridCanvas.id("gridCanvas");
    rayaRadius = 15;
    raya = new Agent(p.random(80, p.width-80), p.random(70, p.height-40), rayaRadius);
    rayaState = new InternalModel(0.85, 1.6, 1.0, 1.2, 0.9, 1.8);
    grid = new MatrixObject();
    bookShelf0 = new MatrixObject();
    bookShelf1 = new MatrixObject();
    bookShelf2= new MatrixObject();
    vendingMachine = new MatrixObject();

    leftWall = new MatrixObject();
    rightUpperWall = new MatrixObject();
    rightLowerWall = new MatrixObject();
    topWall = new MatrixObject();
    bottomWall = new MatrixObject();

    p.colorMode(p.HSB, 360, 100, 100, 100);//(Mode, Hue, Saturation, Brightness, Alpha)

    timeLoop = setInterval(() => {
      loopTime++;
      if(loopTime > 120){
        loopTime = 0;
      }
    }, 1000);

    timeWait = setInterval(() => {
      waitingTime++;
    }, 1000);

    userEmosStore = setInterval(() => {
      userNeutralStore.push(neutral);
      userHappyStore.push(happy);
      userSurprisedStore.push(surprised);
      userFearfulStore.push(fearful);
      userAngerStore.push(angry);
      userDisgustedStore.push(disgusted);
      userSadStore.push(sad);

      // if(userNeutralStore.length > 5){
      //   userNeutralStore.splice(0, 1);//Erase index 0
      // }
      if(userHappyStore.length > 5){
        userHappyStore.splice(0, 1);//Erase index 0
      }
      // if(userSurprisedStore.length > 5){
      //   userSurprisedStore.splice(0, 1);//Erase index 0
      // }
      // if(userFearfulStore.length > 5){
      //   userFearfulStore.splice(0, 1);//Erase index 0
      // }
      if(userAngerStore.length > 5){
        userAngerStore.splice(0, 1);//Erase index 0
      }
      // if(userDisgustedStore.length > 5){
      //   userDisgustedStore.splice(0, 1);//Erase index 0
      // }
      if(userSadStore.length > 5){
        userSadStore.splice(0, 1);//Erase index 0
      }

      for(let i=0; i<userHappyStore.length; i++){
        // if(userNeutralStore[i] != undefined){
        //   userNeutralSum += userNeutralStore[i];
        // }
        if(userHappyStore[i] != undefined){
          userHappySum += userHappyStore[i];
        }
        // if(userSurprisedStore[i] != undefined){
        //   userSurprisedSum += userSurprisedStore[i];
        // }
        // if(userFearfulStore[i] != undefined){
        //   userFearfulSum += userFearfulStore[i];
        // }
        if(userAngerStore[i] != undefined){
          userAngerSum += userAngerStore[i];
        }
        // if(userDisgustedStore[i] != undefined){
        //   userDisgustedSum += userDisgustedStore[i];
        // }
        if(userSadStore[i] != undefined){
          userSadSum += userSadStore[i];
        }

      }

      // userNeutralLevel = userNeutralSum/userNeutralStore.length;
      userHappyLevel = userHappySum/userHappyStore.length;
      // userSurprisedLevel = userSurprisedSum/userSurprisedStore.length;
      // userFearfulLevel = userFearfulSum/userFearfulStore.length;
      userAngerLevel = userAngerSum/userAngerStore.length;
      // userDisgustedLevel = userDisgustedSum/userDisgustedStore.length;
      userSadLevel = userSadSum/userSadStore.length;

      // userNeutralSum = 0;
      userHappySum = 0;
      // userSurprisedSum = 0;
      // userFearfulSum = 0;
      userAngerSum = 0;
      // userDisgustedSum = 0;
      userSadSum = 0;

      // console.log("userHappyLevel: " + userHappyLevel);
      // console.log("userNeutralLevel: " + userNeutralLevel);
      // console.log("userAngerLevel: " + userAngerLevel);

      generateStateTime++;
      if(generateStateTime > 10){
        generateStateTime = 0;
      }
      // console.log(generateStateTime);

    }, 200);

    //p5.serialport relevant
    serial = new p5.SerialPort();

    serial.on('list', p.printList);  // set a callback function for the serialport list event
    serial.on('connected', p.serverConnected); // callback for connecting to the server
    serial.on('open', p.portOpen);        // callback for the port opening
    serial.on('data', p.serialEvent);     // callback for when new data arrives
    serial.on('error', p.serialError);    // callback for errors
    serial.on('close', p.portClose);      // callback for the port closing

    serial.list();                      // list the serial ports
    serial.open(portName);              // open a serial port
  }

  // p.mousePressed = () => {
  //   let psychoKinesis = p.createVector(0, -50);
  //   raya.applyForce(psychoKinesis);
  // }


//----- This is the place all interactions happen -----//
//-----------------------------------------------------//
  p.draw = () => {
    p.clear();

    rayaState.generateState();
    rayaState.emotionalSequence("happy", 50);

    //Lastly, we give Raya's x value to Servo
    let val = p.map(raya.position.x, 75, p.width-75, 20, 160);
    // console.log(val);
    outData = val;  // setup the serial output
    serial.write(outData); // write to serial for Arduino to pickup
  }

    p.keyTyped = () => {
      if (p.key === "l") {
        console.log(rayaState.convolutedHappy.length);
        console.log(rayaState.emosLog.length);
        console.log("------------");
        console.log("            ")
      }
    }
  //-----------------------------------------------------//
  //----- This is the place all interactions happen -----//


  p.printList = (portList) => {
   // portList is an array of serial port names
   for (var i = 0; i < portList.length; i++) {
   // Display the list the console:
    console.log(i + " " + portList[i]);
   }
  }

  p.serverConnected = () => {
    console.log('connected to server.');
  }

  p.portOpen = () => {
    console.log('the serial port opened.')
  }

  p.serialEvent = () => {
    inData = Number(serial.read());
  }

  p.serialError = (err) => {
    console.log('Something went wrong with the serial port. ' + err);
  }

  p.portClose = () => {
    console.log('The serial port closed.');
  }


  class Agent{
    constructor(x, y, radius){
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.maxforce = 0.025;
      this.radius = radius;
    }

    appear(){
      p.fill(0,255,255);//Red in HSB mode
      p.ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
    }

    move(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxspeed);
    }

    //Core movements
    applyForce(force){
      this.acceleration.add(force);
    }

    turn(leftBorder, rightBorder, topBorder, bottomBorder){
      //Outer walls
      if(this.position.x > p.width-rightBorder){
        this.position.x = p.width-rightBorder;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }
      if(this.position.x < leftBorder){
        this.position.x = leftBorder;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }

      if(this.position.y > p.height-bottomBorder){
        this.position.y = p.height-bottomBorder;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
      if(this.position.y < topBorder){
        this.position.y = topBorder;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
    }

    attracted(target, arriveDist, maxspeed){
      let desired = p5.Vector.sub(target, this.position);
      let d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
      if (d < arriveDist+80) {
        let arrivingSpeed = p.map(d, arriveDist, arriveDist+80, 0, maxspeed);
        desired.setMag(arrivingSpeed);
      } else {
        desired.setMag(maxspeed);
      }

      // Steering = Desired minus Velocity
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
      this.applyForce(steer);
      this.walk(30, 'sustain');
    }

    stop(){
      //friction simuration.
      let friction = this.velocity.copy();
      friction.mult(-0.02);
      this.applyForce(friction);
    }

    leave(target, maxspeed){
      let desired = p5.Vector.sub(target, this.position);
      desired.mult(-1);
      desired.setMag(maxspeed);

      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce*1.5);  // Limit to maximum steering force
      this.applyForce(steer);
      this.walk(30, 'sustain');
    }

    //Sound expressions
    soundDirection(soundFile, index, audibleDist, ampMax){
      //This takes a lot of resouces I guess, may be I use int here.
      let panning = p.map(this.position.x, 0, p.width,-1.0, 1.0);
      let distUser = p5.Vector.sub(this.position, user.position);
      // let volume = p.map(distUser.mag(), audibleDist, 40, 0, ampMax);
      let volume = p.map(distUser.mag(), audibleDist, 40, 0.3, ampMax);
      if(index == 'null'){
        soundFile.pan(panning);
        soundFile.setVolume(volume);
      }else{
        soundFile[index].pan(panning);
        soundFile[index].setVolume(volume);
      }
    }

    walk(interval, mode){
      walkFrame++;
      if(walkFrame == interval){
        let index = p.int(p.random(0, walkSound.length));
        walkSound[index].playMode(mode);
        // this.soundDirection(walkSound, index, p.width/2, 0.05);
        this.soundDirection(walkSound, index, p.width/2, 2.0);
        walkSound[index].play();
        walkFrame = 0;
      }
    }

    cough(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, coughSound.length));
        coughSound[index].playMode(mode);
        // this.soundDirection(coughSound, index, p.width/2, 0.04);
        this.soundDirection(coughSound, index, p.width/2, 0.8);
        coughSound[index].play();
      }
    }


    breathe(interval, mode){
      breathFrame++;
      console.log("Raya breathing");
      if(breathFrame == interval){
        breathSound.playMode(mode);
        breathSound.setVolume(6.0);
        breathSound.play();
        breathFrame = 0;
      }
    }

    readBook(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, flipPageSound.length));
        flipPageSound[index].playMode(mode);
        if(distUser.mag() <= 70){
          // flipPageSound[index].setVolume(0.05);
          flipPageSound[index].setVolume(0.5);
        }else{
          // this.soundDirection(flipPageSound, index, p.width/2, 0.05);
          this.soundDirection(flipPageSound, index, p.width/2, 1.5);
        }
        flipPageSound[index].play();
      }
    }

    sitDown(mode){
      sitOnChairSound.playMode(mode);
      // sitOnChairSound.setVolume(0.01);
      sitOnChairSound.setVolume(0.5);
      sitOnChairSound.play();
    }

    putCupAndBookOnTable(countFrame, num1, num2, mode){
      if(countFrame == num1){
        putACupSound.playMode(mode);
        // putACupSound.setVolume(0.05);
        putACupSound.setVolume(1.0);
        putACupSound.play();
      }else if(countFrame == num2){
        putABookSound.playMode(mode);
        // putABookSound.setVolume(0.05);
        putABookSound.setVolume(1.0);
        putABookSound.play();
      }
    }

    buySomeDrink(countFrame, num1, num2, num3, num4, mode){
        if(countFrame == num1){
          buyDrink[1].playMode(mode);
          // this.soundDirection(buyDrink, 1, p.width/2, 0.05);
          this.soundDirection(buyDrink, 1, p.width/2, 2.0);
          buyDrink[1].play();
        }else if(countFrame == num2+180){
          buyDrink[2].playMode(mode);
          // this.soundDirection(buyDrink, 2, p.width/2, 0.08);
          this.soundDirection(buyDrink, 2, p.width/2, 2.0);
          buyDrink[2].play();
        }else if(countFrame == num3+180){
          buyDrink[3].playMode(mode);
          // this.soundDirection(buyDrink, 3, p.width/2, 0.05);
          this.soundDirection(buyDrink, 3, p.width/2, 2.0);
          buyDrink[3].play();
        }else if(countFrame == num4+180){
          buyDrink[4].playMode(mode);
          // this.soundDirection(buyDrink, 4, p.width/2, 0.08);
          this.soundDirection(buyDrink, 4, p.width/2, 2.0);
          buyDrink[4].play();
        }
    }

    laugh(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, laughingSound.length));
        laughingSound[index].playMode(mode);
        // this.soundDirection(laughingSound, index, p.width/2, 0.04);
        this.soundDirection(laughingSound, index, p.width/2, 0.5);
        laughingSound[index].play();
      }
    }

    surprise(mode){
      let index = p.int(p.random(0, surpriseSound.length));
      surpriseSound[index].playMode(mode);
      // this.soundDirection(coughSound, index, p.width/2, 0.04);
      this.soundDirection(surpriseSound, index, p.width/2, 0.8);
      surpriseSound[index].play();
    }

  }
  //----- Raya class end -----


  class InternalModel{

    constructor(happyD, surpriseD, fearD, angerD, disgustD, sadnessD){
      this.happy;
      this.happyDistortion = happyD;
      this.convolutedHappy = [];
      this.convolutedHappySum = 0;
      this.happyAvg = 1.0;

      this.newLog = [];
      this.currentEmos = 0;
      // this.currentEmos = [0, 0];
      this.emosLog = [];
      for(let i = 0; i < 900; i++){
        this.emosLog.push(this.currentEmos);
      }

      this.samplingTime = 0;

      this.happySequencePoint = [];

      this.graphTop = 60;
      this.graphBottom = this.graphTop + 200;
    }

    convolution(a, n, x){
      return a * Math.pow(n, x);
    }

    sigmoid(x){
      return 1 / (1 + Math.exp(-x));
    }


    generateState(){
      if(generateStateTime != generateTimeStore){

        this.happy = userHappyLevel * this.happyDistortion;

        if(isNaN(this.happy) == false){
          if(this.samplingTime < 1){
            this.emosLog.unshift(this.happy); //Create 2d array
          }else{
            this.emosLog.unshift(this.currentEmos);
          }

          this.samplingTime++;
        }else{}

        if(this.emosLog.length > 900){ //1000: which means 200 seconds
          this.emosLog.pop();
        }


        //Copy all of the emosLog
        for(let i = 0; i < this.emosLog.length; i++){
            // console.log(this.emosLog[i][j]);
          let value = this.convolution(this.emosLog[i], 0.996, i);
            this.convolutedHappy[i] = value;

          if(this.convolutedHappy.length > this.emosLog.length){
            this.convolutedHappy.pop();
          }
        }

        for(let i=0; i<this.convolutedHappy.length; i++){
          this.convolutedHappySum += this.convolutedHappy[i];
        }

        this.happyAvg = this.convolutedHappySum/this.convolutedHappy.length;

        this.currentEmos = this.happy + this.happyAvg;

        if(this.currentEmos > 1.0){
          this.currentEmos = 1.0;
        }else{}

        this.convolutedHappySum = 0;

      }

      generateTimeStore = generateStateTime;
    }


    emotionalSequence(emotion, hueVal){

      let convolutedEmotion;
      let emotionalSequencePoint;
      p.strokeWeight(2);

      if(emotion == "happy"){
        convolutedEmotion = this.convolutedHappy;
        emotionalSequencePoint = this.happySequencePoint;
      }
      console.log(convolutedEmotion);
      console.log(emotionalSequencePoint);

      // console.log(this.convolutedHappy);
        for(let i = 0; i < convolutedEmotion.length/10; i++){
          emotionalSequencePoint[i] = convolutedEmotion[i*10];
        }


        for(let i = 0; i < emotionalSequencePoint.length; i++){
          if(i < emotionalSequencePoint.length-1){
            let sYvalue = p.map(emotionalSequencePoint[i], 0, 1, 0, 170);
            let eYvalue = p.map(emotionalSequencePoint[i+1], 0, 1, 0, 170);
            let saturation = p.map(45+(i*6), 45, 550, 100, 0);
            p.stroke(hueVal, saturation, 100);
            p.line(45+(6*i), this.graphBottom-sYvalue, 45+(6*(i+1)), this.graphBottom-eYvalue);
          }
        }

        p.stroke(255);
        p.strokeWeight(2);
        p.line(45, this.graphTop, 45, this.graphBottom+15);
        p.line(30, this.graphBottom, 645, this.graphBottom);
    }

  }//class InternalModel end


  class MatrixObject{
    constructor(){
      this.vendingMachinePos;
      this.bookShelfPos;
    }

    grid(){
      for(let i = 0; i <= p.width; i += 30){
        for(let j = 0; j <= p.height; j+= 30){
          p.stroke(255);
          p.strokeWeight(0.05);
          p.line(i, 0, i, p.height);
          p.line(0, j, p.width, j);
        }
      }
    }

    vendingMachine(x, y, w, h){
      this.vendingMachinePos = p.createVector(x, y);
      p.fill(208, 52, 85);
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(this.vendingMachinePos.x, this.vendingMachinePos.y, w, h, 5);
    }

    bookShelf(x, y, w, h){
      this.bookShelfPos = p.createVector(x, y);
      p.fill(30, 53, 58);//cafe au lait
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(this.bookShelfPos.x, this.bookShelfPos.y, w, h);
    }

    wall(x, y, w, h){
      p.fill(32, 37, 98);//cafe au lait
      p.stroke(32, 46, 77);
      p.strokeWeight(1);
      p.rectMode(p.CORNER);
      p.rect(x, y, w, h, 4);
    }
  }

}

let myp52 = new p5(canvas1, 'gridCanvas');
