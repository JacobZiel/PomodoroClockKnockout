

function ViewModel() { 

   // Notify property change
   this.canSubmit = ko.observable(true);
   this.timerMain  = ko.observable(5);
   this.timerBreak = ko.observable(5);
   this.work = ko.observable("Work Duration");
   this.breaks = ko.observable("Break Duration");
   this.title = ko.observable("Pomodoro Clock");
   this.resetButton = ko.observable("Reset");
   this.startButton = ko.observable("Start");
   this.plusButton = ko.observable("+");
   this.minusButton = ko.observable("-");
   this.credits = ko.observable("jz");
   this.messageBreak = ko.observable(true);
   this.messageWork = ko.observable(true);
   //
   let self = this;
   let breakTimer;
   let check = 0;
   let newInterwal;
   let myInterval2;
   let currentVal;
   let timeAdded = 0;
   let breakAdded = 0;
   let minusVal = 0;
   let timeTaken = 0;
   let breakTaken = 0;
   let minusBreakTimer = 0;
   let audioWork = new Audio('work.mp3');
   let audioBreak = new Audio('break.mp3');
   let audioLongBreak = new Audio('longBreak.mp3');
   
this.startTime = function () {
      audioWork.play();
      self.canSubmit(false);
      self.messageWork(true);
      let workTime = this.timerMain();
      newInterwal = myNewInterval = setInterval(function () { 
      self.timerMain(workTime -= 1);
   if (workTime <= 0){
      self.messageWork(false);
      self.timerMain(workTime = "Break time!");
      clearInterval(myNewInterval);
      self.timerBreak(5 + breakAdded - breakTaken);
      self.extendTimeFunc();
      self.breakTimerFunc();
   };
}, 1000)};

this.breakTimerFunc = () => {
   audioBreak.play();
   let breakTime = this.timerBreak();
   myInterval2 = setInterval(function () {
      self.messageBreak(true);
      self.timerBreak( breakTime -= 1);
      if (breakTime <= 0) {
         audioLongBreak.play();
         self.messageBreak(false);
         self.timerBreak(breakTime = "Time to work!");
         self.timerMain(5 + timeAdded - timeTaken);
         self.startTime();
         clearInterval(myInterval2);          
      }
   }, 1000);
}

   this.extendTimeFunc = function () {
   check++;
   if (check == 4){
      clearInterval(myInterval2);
      let addedTimeToBreak = this.timerBreak();
      self.timerBreak(5 + addedTimeToBreak);
      check = 0;
      }
   };

   this.resetFunc = function () {
      this.timerMain(5);
      this.timerBreak(5);
      clearInterval(newInterwal);
      clearInterval(myInterval2) ;
      self.canSubmit(true);
   };

   this.addTimeToWork = function () {
      currentVal = this.timerMain();        
      this.timerMain(currentVal += 1);
      timeAdded++; 
   };

   this.takeTimeToWork = function () {
      minusVal = this.timerMain();
      this.timerMain(minusVal -= 1);
      timeTaken++;
   };

   this.addBreakTime = function () {
      breakTimer = this.timerBreak();
      this.timerBreak(breakTimer += 1);
      breakAdded++;
   };

   this.takeBreakTime = function () {
      minusBreakTimer = this.timerBreak();
      this.timerBreak(minusBreakTimer -= 1);
      breakTaken++;
   };   

};

ko.applyBindings(new ViewModel());






