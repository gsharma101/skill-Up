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
let msgDisplay = document.querySelector('.msg_box');
let tableBody = document.querySelector('.table_body');

let allSkillObj = {};
const techStack = "https://demo.stratbeans.com/atum-barium/index.php?r=site/fetchTechnologies";

const addSkillToDom = function (e) {
  e.preventDefault();
  let techValue = techField.value;
  let skillValue = skillLevel.value;

  if (techValue == '' || skillValue == '') {
    let skillsError = document.querySelector('.skillsError');
    skillsError.innerHTML = '<p class="skillsErrorMsg">both fields are required</p>';
    setTimeout(function () {
      skillsError.innerHTML = '';
    }, 3000);
  } else {
    allSkillObj[techValue] = skillValue;
    skill_dev.innerHTML += `<div class="skill_label">
        <h3>${techValue}</h3>
        <span class="devider">&nbsp; Level &nbsp;</span>
        <h3>${skillValue}</h3>
    </div>`;
    techField.value = techValue = '';
    skillLevel.value = skillValue = '';
  }
}

{/* <img class="closeBtn" src="files/icon/close.svg" alt="close"> */ }

let loadLanguages = function () {
  let langs = [];

  let xhr = new XMLHttpRequest();
  xhr.open("GET", techStack, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // console.log(xhr.response);
      let data = JSON.parse(xhr.responseText);
      langs = data.map((langObj) => {
        return langObj.name;
      })
      langs.forEach(name => {
        let opt = document.createElement('option');
        opt.value = name;
        opt.innerHTML = name;
        techField.appendChild(opt);
      });
    } else {
      console.log('Api Failed');
    }
  };
  xhr.send();
}
loadLanguages();

//? Sending Data
submit.addEventListener('click', function (e) {
  e.preventDefault();
  let fnameValue = fname.value;
  let lnameValue = lname.value;
  let emailValue = email.value;

  if (fnameValue == '' || lnameValue == '' || emailValue == '') {
    msgDisplay.innerHTML = '<p class="skillsErrorMsg">All fields are required</p>';
    setTimeout(function () {
      msgDisplay.innerHTML = '';
    }, 3000);
  } else if (Object.keys(allSkillObj).length === 0) {
    msgDisplay.innerHTML = '<p class="skillsErrorMsg">No skills are selected</p>';
    setTimeout(function () {
      msgDisplay.innerHTML = '';
    }, 3000);
  } else {
    const sendTo = 'http://127.0.0.1/skillup/form.php';
    const xhr = new XMLHttpRequest();
    xhr.open("POST", sendTo, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    //Handle Response 
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        msgDisplay.innerHTML = `<h3 class="successMsg">${xhr.responseText}</h3>`;
        setTimeout(function () {
          msgDisplay.innerHTML = '';
        }, 3000);
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
  }

});

// ? Retriving Datat
let showdata = function () {
  let x;
  tableBody.innerHTML = '';
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "retrieve.php", true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.status === 200) {
      // console.log(xhr.response);
      if (xhr.response) {
        x = xhr.response;
      } else {
        x = '';
      }

      for (let i = 0; i < x.length; i++) {
        let skillObj = JSON.parse(x[i].skills);
        let entries = Object.entries(skillObj);
        let skillList = "";
        entries.forEach((entry) => {
          skillList += `<li>- ${entry[0]} Level: ${entry[1]}</li>`
        })
        // console.log(entries);
        // console.log(typeof (entries));
        tableBody.innerHTML +=
          `<tr><td class="userName">
        ${x[i].fname} ${x[i].lname}
        </td><td>
        ${x[i].email}
        </td><td>
        <ul class="skillsFromDB">
        ${skillList}
        </ul>
        </td><td>
        <button class="deleteBtn del-btn" data-sid="${x[i].id}">Delete</button>
        </td></tr>`;
      }

    } else {
      console.log('Problem Occured');
    }
    deleteData();
  };
  xhr.send();
}
showdata();

// ? Delete Data From database
function deleteData() {
  let x = document.getElementsByClassName('del-btn');
  for (let i = 0; i < x.length; i++) {
    x[i].addEventListener("click", function () {
      let id = x[i].getAttribute("data-sid");
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "delete.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status === 200) {
          msgDisplay.innerHTML = `<h3 class="deleteMsg">${xhr.responseText}</h3>`;
          setTimeout(function () {
            msgDisplay.innerHTML = '';
          }, 3000);
          showdata();
        } else {
          console.log("Problem Occured")
        }
      }
      let dataToSend = { sid: id };
      const JSONdata = JSON.stringify(dataToSend);
      xhr.send(JSONdata);
    });
  }
}

addSkill.addEventListener('click', addSkillToDom);