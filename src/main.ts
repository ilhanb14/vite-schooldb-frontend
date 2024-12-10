import './style.css'
import { getCourses, getCourse, addCourse, deleteCourse, editCourse } from './fetch.ts';

const output = document.getElementById('output')!;
const course_id = document.getElementById('course_id')! as HTMLInputElement;
const name = document.getElementById('name')! as HTMLInputElement;
const price = document.getElementById('price')! as HTMLInputElement;
const duration = document.getElementById('duration')! as HTMLInputElement;
const start = document.getElementById('start')! as HTMLInputElement;
const type_id = document.getElementById('type_id')! as HTMLSelectElement;

document.getElementById('getButton')!.addEventListener('click', showOne);
document.getElementById('allButton')!.addEventListener('click', showAll);
document.getElementById('postButton')!.addEventListener('click', add);
document.getElementById('deleteButton')!.addEventListener('click', remove);
document.getElementById('putButton')!.addEventListener('click', edit)

showAll();

async function showAll() {
  output.innerHTML = "";

  for (let course of await getCourses()) {
    output.innerHTML += formatCourse(course);
  }
}

async function showOne() {
  try {
    let id = parseInt(course_id.value);
    if(isNaN(id))
      alert("ID value must be entered")
    else {
      let course = await getCourse(id);
      
      output.innerHTML = formatCourse(course);
    }
  } catch(e) {
    alert(e);
  }
}

async function add() {
  await addCourse(parseInt(course_id.value), name.value, parseInt(price.value), parseInt(duration.value), new Date(start.value), parseInt(type_id.value));
  showAll();
}

function remove() {
  deleteCourse(parseInt(course_id.value))
  .then(showAll);
}

function edit() {
  editCourse(parseInt(course_id.value), name.value, parseInt(price.value), parseInt(duration.value), new Date(start.value), parseInt(type_id.value))
  .then(showAll);
}

function formatCourse(course : any) {
  return `
      <div id=course-${course.id} class='course' onclick="console.log(${course.id})">
      ${course.name} <br>
      Price: $${course.price} <br>
      Duration: ${course.duration} weeks <br>
      Starts: ${course.start.slice(0,10)} <br>
      Type: ${course.type || "N/A"}
      </div>
    `
}
