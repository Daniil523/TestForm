const tower = document.querySelector("#tower");
const floor = document.querySelector("#floor");
const room = document.querySelector("#room");
const date = document.querySelector("#date");
const form = document.querySelector("#form");
const timeStart = document.querySelector('#timeStart')
const timeEnd = document.querySelector('#timeEnd')
const btnClearForm = document.querySelector("#btnClearForm");
const errorMassage = document.querySelector("#errorMassage");

function validation(data) {
    resetFormError()
    let errorCheck = false
    let dateNow = new Date()
    let timeStartValue = Number(data.get('timeStart').split(':').join(''))
    let timeEndValue = Number(data.get('timeEnd').split(':').join(''))
    let dateStartValue

    if (data.get("tower") === null) {
        errorCheck = true
        tower.classList.add('error')
        errorMassage.classList.add('active')
    }
    if (data.get("floor") === null) {
        errorCheck = true
        floor.classList.add('error')
        errorMassage.classList.add('active')
    }
    if (data.get("room") === null) {
        errorCheck = true
        room.classList.add('error')
        errorMassage.classList.add('active')
    }
    if (data.get("date") === '') {
        errorCheck = true
        date.classList.add('error')
        errorMassage.classList.add('active')
    }else {
        dateStartValue = new Date(data.get('date'))
        dateStartValue.setHours(0, 0, 0, 0)
        dateNow.setHours(0, 0, 0, 0)
        if (dateStartValue.valueOf() < dateNow.valueOf()){
            errorCheck = true
            date.classList.add('error')
            errorMassage.classList.add('active')
        } else {
            dateStartValue.setHours(data.get('timeStart').split(':')[0], data.get('timeStart').split(':')[1])
            dateNow = new Date()
            if (dateStartValue.valueOf() < dateNow.valueOf()) {
                errorCheck = true
                timeStart.classList.add('error')
                errorMassage.classList.add('active')
            }
        }
    }
    if (data.get("timeStart") === '') {
        errorCheck = true
        timeStart.classList.add('error')
        errorMassage.classList.add('active')
    }
    if (data.get("timeEnd") === '') {
        errorCheck = true
        timeEnd.classList.add('error')
        errorMassage.classList.add('active')
    } else {
        if (timeStartValue >= timeEndValue) {
            errorCheck = true
            timeEnd.classList.add('error')
            errorMassage.classList.add('active')
        }
    }
    if (!errorCheck) {
        return true
    }
}

function formSubmit(e) {
    e.preventDefault();
    let formData = new FormData(form);
    if (validation(formData) === true) {
        let data = {}
        formData.forEach(function(value, key){
            data[key] = value;
        });
        console.log(data);
        resetForm()
    }
}

function resetFormError() {
    tower.classList.remove('error')
    floor.classList.remove('error')
    room.classList.remove('error')
    date.classList.remove('error')
    timeStart.classList.remove('error')
    timeEnd.classList.remove('error')
    errorMassage.classList.remove('active')
}

function resetForm() {
    resetFormError()
    form.reset()
}

btnClearForm.addEventListener('click', resetForm)
form.addEventListener("submit", formSubmit);