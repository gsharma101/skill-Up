'use strict';

let techField = document.querySelector('#techField');
let skillLevel = document.querySelector('#skillLevel');
let addSkill = document.querySelector('.addDataBtn');
let removeSkill = document.querySelector('#closeBtn');
let skill_dev = document.querySelector('.skills_selected');
const allSkillObj = {};
console.log(allSkillObj);

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
addSkill.addEventListener('click', addSkillToDom);