// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  const currentDay = document.getElementById('currentDay')

  function todaysDateFunction() {
    var today = new Date();
    var dd = today.getDate()
    var mm = today.getMonth()+1
    var year = today.getFullYear()
    if(dd < 10) {
      dd = '0' + dd;
    }
    if(mm < 10) {
      mm = '0' + mm
    }
    today = mm + '-' + dd + '-' + `${year}`
    currentDay.innerHTML = `Today's date is ${today}`
  }
  todaysDateFunction()
  //const currentDayElement = todaysDateFunction()

  //currentDay.innerHTML = `Todays date is: ${currentDayElement}`

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  
  //HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // 
  // * WHEN capturing (eventListener) the click event --> look into event bubbling and event delegation
  
  //array to hold activities user enters
  let addedActivities = []
  const existingActivityHistory = localStorage.getItem('addedActivities')
  if (existingActivityHistory){
    addedActivities = JSON.parse(existingActivityHistory)
    console.log(addedActivities)
    addedActivities.forEach(addedActivities => {
      saveToStorage(addedActivities)
    })
  }
  
//grabs all of the save buttons
  const saveButtonContainer = document.querySelectorAll(".saveBtn")
  saveButtonContainer.forEach(element => element.addEventListener('click',()=> saveToStorage(element.id)))
  

  function saveToStorage(id) {
    console.log(id)
    let addedActivities = document.getElementById('input-' + id.split('-')[1]).value
    //creating new li item which will have saved activity as text
    console.log(addedActivities)
    // const saveHistoryElement = document.createElement("li")
    //setting text content of new element
    // saveHistoryElement.textContent = addedActivities
    //adding new item to save history element
    // saveButtonContainer.appendChild(saveHistoryElement)
    localStorage.setItem('hour-' + id.split('-')[1], addedActivities)
  }


 function deleteActivities() {
  addedActivities = [];
 }

 var deleteActivitiesElement = document.querySelector('#delete-button')
 deleteActivitiesElement.addEventListener('click', deleteActivities)
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  let currentTime = dayjs()
  console.log("Date is: ", currentTime.format("YYYY-MM-DD"));
  console.log("Current Hour: ", dayjs().format("H"));
  let currentHour = dayjs().format("H");
  let row_9 = $('#hour-9');
  console.log(row_9.attr('id')); 
  console.log(currentHour) // --> we still have a STRING with a Value of "hour-9"
  
  let hours = [9,10,11,12,13,14,15,16,17]
  hours.forEach(hour=> {
    if (currentHour == hour){
      $("#hour-" + hour).addClass('present')
    } else if(currentHour < hour){
      $("#hour-" + hour).addClass('past')
    } else {
      $("#hour-" + hour).addClass('future')
    }
    if (localStorage.getItem('hour-' + hour)){
      document.getElementById('input-' + hour).value = localStorage.getItem('hour-' + hour)
    }
  })
  //    if TRUE then we add the class "present"  ;
  //}
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

