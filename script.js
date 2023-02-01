let firstImage = document.getElementsByClassName("first-img");
let secondImage = document.getElementsByClassName("second-img");
let thirdImage = document.getElementsByClassName("third-img");
let fourImage = document.getElementsByClassName("four-img");
if (firstImage) {
  firstImage[0].addEventListener("click", function () {
    document.getElementsByClassName("form-container")[0].classList.add("hide");
  });
}

//-----------------------------Form validation check here
let btn = document.getElementById("Register_btn");
btn.addEventListener("click", validateForm);
let arr = [];

function validateForm(e) {
  console.log("clicked");
  e.preventDefault();
  let name = document.getElementById("name").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let error = document.getElementById("error");

  if (!nameValid(name, error)) {
    error.innerHTML = "Name should be contain at least 3";
  } else if (!usernameValid(username, error)) {
    error.innerHTML = "username should be contain at least 3";
  } else if (!ValidateEmail(email, error)) {
    error.innerHTML = "Please Enter Valid Email";
  } else {
    let x = swal("Registration", "Successful", "success");
    document.getElementsByClassName("form-container")[0].style.cssText =
      "display:none";
    console.log("swal is " + x);
    error.innerHTML = " ";
    let obj = { name, username, email };
    arr.push(obj);
    localStorage.setItem("data", JSON.stringify(arr));
    secondImage[0].style.cssText = "opacity:1;pointer-events: auto;";
    firstImage[0].style.cssText = "opacity:0.1; pointer-events: none;";
  }
}
//------------------------------Name valided start here validation
function nameValid(name, error) {
  if (name.length > 2) {
    error.innerHTML = "";
    return true;
  }
  return false;
}

function usernameValid(username, error) {
  if (username.length > 2) {
    error.innerHTML = "";
    return true;
  }
  return false;
}
//------------------------------Name valided  End here
//------------------------------Password valided  start here
function checkPasword(password) {
  let cl = 0,
    sl = 0,
    n = 0,
    sc = 0;
  for (let t of password) {
    if (t >= "A" && t <= "Z") {
      cl++;
    } else if (t >= "a" && t <= "z") {
      sl++;
    } else if (t >= "0" && t <= "9") {
      n++;
    }
  }
  if (cl >= 1 && sl >= 1 && n >= 1) {
    return true;
  }
  return false;
}
//------------------------------Password valided  end here
//-------------------------------Validate email
function ValidateEmail(input, error) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    // alert("Valid email address!");

    // document.form1.text1.focus();
    error.innerHTML = "";

    return true;
  } else {
    return false;
  }
}
//----------------------it is for show details
secondImage[0].addEventListener("click", function (e) {
  data = JSON.parse(localStorage.getItem("data"));

  swal("Name is " + data[0].name + " User Name is " + data[0].username);
  thirdImage[0].style.cssText = "opacity:1;pointer-events: auto;";
  secondImage[0].style.cssText = "opacity:0.1;pointer-events: none;";
});
//-----------------------------Dice funtionality--------------------------------
thirdImage[0].addEventListener("click", function (e) {
  document.getElementsByClassName("dice-container")[0].classList.add("hide");
});

let dice_roll_btn = document.getElementById("dice_roll_btn");

let dice_Audio = new Audio("./audio/diceAudio.mp3");

let sum = 0;
let left = 3;
let attemp = 2;
dice_roll_btn.addEventListener("click", function (e) {
  if (left > 0) {
    dice_Audio.play();
    document
      .getElementsByClassName("img-box")[0]
      .classList.add("animation_img");
    // console.log("hi")
    let id = setTimeout(function () {
      let x = Math.floor(Math.random() * 6 + 1);
      swal("You Got " + x);
      sum += x;
      document.getElementById("Total_score").innerText = sum;
      document
        .getElementsByClassName("img-box")[0]
        .classList.remove("animation_img");
      if ((attemp == 1 || attemp == 2) && sum >= 10) {
        swal("Claim Your reward, You score is " + sum);
        document.getElementsByClassName("dice-container")[0].style.cssText =
          "display:none;";
        fourImage[0].style.cssText = "opacity:1;pointer-events: auto;";
        thirdImage[0].style.cssText = "opacity:0.1; pointer-events: none;";
      }
      if (sum < 10 && left == 0) {
        swal({
          // title: "1XseTUncv",
          // text: "It is Your Token",
          // icon: "success",
          // buttons: true,
          // dangerMode: true,
          title: "Bad Luck",
          text: "We have 1 more chance , Try again !...Your Scroe less than 10",
          icon: "error",
          button: "OK",
        });
        sum = 0;
        left = 3;
        attemp--;
        document.getElementById("Total_score").innerText = sum;
        document.getElementById("roll_left").innerText = left;
      }

      if (attemp == 0) {
        swal("Sorry Your Bad Luck ......Refresh The page and Try Again");
        document.getElementsByClassName("dice-container")[0].style.cssText =
          "display:none;";
        thirdImage[0].style.cssText = "opacity:0.1; pointer-events: none;";
      }
    }, 2000);
    left--;
    document.getElementById("roll_left").innerText = left;
  }
});
//-------------------------------------------congratulation

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
fourImage[0].addEventListener("click", function () {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  swal({
    title: "Your Token is ",
    text: result,
    icon: "success",
    button: "OK",
  }).then((willDelete) => {
    if (willDelete) {
      let congSound = new Audio("./audio/contragtulation_sound.mp3");
      document.getElementsByClassName("congration-outer")[0].style.cssText =
        "display:grid";
      startit();
      stopit();
      congSound.play();
    }
  });
});
const startit = () => {
  setTimeout(function () {
    confetti.start();
  }, 1000);
};
// Stops
const stopit = () => {
  setTimeout(function () {
    confetti.stop();
  }, 5000);
};
