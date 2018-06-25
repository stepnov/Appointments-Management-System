function App (name, owner, date, time, notes) {
	this.name = name;
	this.owner = owner;
	this.date = date;
	this.time = time;
	this.notes = notes;
}


var div = document.getElementById("addedAppoinments");
var btn = document.getElementById("btn");
var inputs = document.getElementsByTagName("input");
var form = document.querySelector(".appointments-form");
var input = document.querySelector(".flt");
var select = document.querySelector("select");
var blankApt = document.getElementById("blankApt");


/* Array where objects will be stored */
var appData = [];


/* Creating of new appointments element */
function createDiv (name, owner, date, time, notes) {
	var newapp = document.createElement('div');
	newapp.innerHTML = "<h3>"+name+"</h3><p>Owner: "+owner+"</p><div>"+date+"</div><span>"+time+"</span><p> Important notes: "+notes+"</p>";
	newapp.id = 'apts'; 
	div.appendChild(newapp);
}


/* Getting information from inputs, creating new object, pushing it to array and adding element to webpage */
function getAppData (e) {
	e.preventDefault();
	var name = inputs[0].value;
	var owner = inputs[1].value;
	var date = inputs[2].value;
	var time = inputs[3].value;
	var notes = inputs[4].value;
	form.reset();
	var appObj = new App(name, owner, date, time, notes);
	appData.push(appObj);
	addDiv(appData);
	
}


/* Adding object data to element */
function addDiv(arr) {
	div.innerHTML = "";
	for(var i = 0; i < arr.length; i++) {
		createDiv(arr[i].name, arr[i].owner, arr[i].date, arr[i].time, arr[i].notes);
	}
}

function deleteBlankApt() {
	blankApt.style.display = 'none';
}

form.onsubmit = getAppData, deleteBlankApt;


/* Filtering appointments by keywords */
function filterApps() {
	var text = input.value;
	var result = appData.filter(function(item){
		return item.notes.toLowerCase().indexOf(text.toLowerCase()) > -1;
	});
	addDiv(result);
}

input.oninput = filterApps;


/* Sorting appointments by petname, ownername */

function sortApps (e) {
	var selIndex = e.target.selectedIndex;
	console.log("Now Selected ", selIndex);
	console.log(select.options[selIndex].textContent);

	if(e.target.value == "petname") {
		appData.sort(function(a,b) {
			if(a.name.toLowerCase() > b.name.toLowerCase()) {
				return 1
			}
			else {return -1}
		});
		addDiv(appData);
	}
	else {
		appData.sort(function(a,b) {
			if(a.owner.toLowerCase() > b.owner.toLowerCase()) {
				return -1
			}
			else {return 1}
		});
		addDiv(appData);
	}
}

select.onchange = sortApps;