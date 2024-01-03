// Таймер по введенном числу
document.addEventListener("DOMContentLoaded", function () {
  let inputTime = document.querySelector(".time");
  let timerButton = document.querySelector(".button");
  let timer = document.querySelector(".timer");

  timerButton.addEventListener("click", function () {
    let interval = setInterval(Mytimer, 1000);
    let time = parseInt(inputTime.value);
    function Mytimer() {
        if(time > 0){
            timer.textContent = time;
            time -= 1;
        }
        else{
            timer.textContent = 0;
            clearInterval(interval);
        }
    }
    inputTime.addEventListener('input', function(){
        clearInterval(interval);
      })
  });

});
