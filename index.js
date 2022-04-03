let myLeads = [];
let oldLeads = []
const myButton = document.getElementById("input-btn")
const myInput = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const DeleteButton = document.getElementById("delete-all")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const saveTabBtn = document.getElementById("save-tab")

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

// const tabs = [
//   { url: "https://www.linkedin.com/in/per-herald-borgen/", }
// ]

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    myInput.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
  })

})

function render(leads) {
  let listItems = " ";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target='_' href='${leads[i]}'>${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}


DeleteButton.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  console.log(myLeads)
  render(myLeads)
})

myButton.addEventListener("click", function myEvent() {
  if (myInput.value != "") {
    myLeads.push(myInput.value);
    myInput.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
  }
});

