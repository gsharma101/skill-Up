'use strict';
// import {each} from 'foreach-object';
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');

let techField = document.querySelector('#techField');
let skillLevel = document.querySelector('#skillLevel');
let addSkill = document.querySelector('.addDataBtn');
let skill_dev = document.querySelector('.skills_selected');
let submit = document.querySelector('.submitBtn');
let msgDisplay = document.querySelector('.successMsg');
let tableBody = document.querySelector('.table_body');

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

let showdata = function () {
  tableBody.innerHTML = '';
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "retrieve.php", true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.status === 200) {
      // console.log(xhr.response);
      let x;
      if (xhr.response) {
        x = xhr.response;
      } else {
        x = '';
      }
      for (let i = 0; i < x.length; i++) {
        let skillObj = JSON.parse(x[i].skills);
        let entries = Object.entries(skillObj);
        tableBody.innerHTML +=
          `<tr><td class="userName">
        ${x[i].fname} ${x[i].lname}
        </td><td>
        ${x[i].email}
        </td><td>
        <span class="skillsFromDB">
        ${entries}
        </span>
        </td><td>
        <button class="deleteBtn" data-sid="${x[i].id}">Delete</button>
        </td></tr>`;
      }

    } else {
      console.log('Problem Occured');
    }
  };
  xhr.send();
}
showdata();

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
      msgDisplay.innerHTML = `<h3>${xhr.responseText}</h3>`;
      setTimeout(function () {
        msgDisplay.innerHTML = '';
      }, 5000);
      showdata();
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