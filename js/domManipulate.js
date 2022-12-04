'use strict';

let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');

let techField = document.querySelector('#techField');
let skillLevel = document.querySelector('#skillLevel');
let addSkill = document.querySelector('.addDataBtn');
let removeSkill = document.querySelector('#closeBtn');
let skill_dev = document.querySelector('.skills_selected');
let submit = document.querySelector('.submitBtn');
let allSkillObj = {};

const addSkillToDom = function (e) {
  e.preventDefault();
  let techValue = techField.value;
  let skillValue = skillLevel.value;
  allSkillObj[techValue] = skillValue;

  skill_dev.innerHTML += `<div class="skill_label maring_bottom--small">
        <h3>${techValue}</h3>
        <span class="devider">&nbsp;--&nbsp;</span>
        <h3>${skillValue}</h3>
    </div>`;
  techField.value = techValue = '';
  skillLevel.value = skillValue = '';
}

//? Sending Data
submit.addEventListener('click', function (e) {
  e.preventDefault();
  let fnameValue = fname.value;
  let lnameValue = lname.value;
  let emailValue = email.value;
  const sendTo = 'http://127.0.0.1/skillup/form.php';
  const xhr = new XMLHttpRequest();
  xhr.open("POST", sendTo, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  //Handle Response 
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log("Problem Occured");
    }
  };

  let dataToSend = { f_name: fnameValue, l_name: lnameValue, emailAdd: emailValue, skills: allSkillObj };
  const JSONdata = JSON.stringify(dataToSend);
  xhr.send(JSONdata);

  // ?reset
  fname.value = fnameValue = '';
  lname.value = lnameValue = '';
  email.value = emailValue = '';
  skill_dev.innerHTML = ' ';
});

addSkill.addEventListener('click', addSkillToDom);