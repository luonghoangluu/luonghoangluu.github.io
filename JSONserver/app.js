
var courseAIP = 'http://localhost:3000/courses';

function start(){
    getCourses(renderCourse);

    handleCreate();
 
}

start();

// funtion
function getCourses(callback){
    fetch(courseAIP)

        .then(function(response){
            return response.json();
        })

        .then(callback);
}

// create
function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),

    }
    fetch(courseAIP,options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

// update
function updateCourse(data,id,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)

    }
    fetch(courseAIP+'/'+id,options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

// delete
function deleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },

    }
    fetch(courseAIP + '/' + id,options)
        .then(function(response){
            response.json();
        })
        .then(function(){
          var item  =  document.querySelector('.item-' + id);
          if(item){
              item.remove();
          }
        });
}

function renderCourse(courses){
    var listCoursesBlock = document.querySelector('#list-courses');

    var htmls = courses.map(function(course){
        return `
            <li class="item-${course.id}">
                <h4 class="name-course-${course.id}">${course.name}</h4>
                <p class="des-course-${course.id}">${course.description}</p>
                <button onclick="deleteCourse(${course.id})">Delete</button>
                <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreate(){
    var createbtn = document.querySelector('#create');

    createbtn.onclick = function (){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        }
        createCourse(formData);
    }
}


function handleUpdateCourse(id) {
    var createBtn = document.querySelector('#create');
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');
    createBtn.innerHTML = 'Update';
    var courseName = document.querySelector('.name-course-' + id).textContent;
    var courseDesc = document.querySelector('.des-course-' + id).textContent;
    name.value = courseName;
    description.value = courseDesc;
    createBtn.onclick = function() {
        var data = {
            name: name.value,
            description: description.value
        }
        updateCourse(data,id);
    }
}
