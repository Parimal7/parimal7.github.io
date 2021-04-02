const slider = document.getElementById("slider");
const output = document.getElementById("slider-value");
const name = document.getElementById("name");
const email = document.getElementById("email");
const technology = document.getElementById("technology");
const selected_skills = document.getElementById("selected-skills");
const table = document.getElementById("table");
const error = document.getElementById("error-log");
var data = [];
var skills = [];
var rowNum = 1;

ajax_get('https://demo.stratbeans.com/atum-barium/index.php?r=site/fetchTechnologies', function(data) {
    for(var i = 0; i < 5; ++i) {
    	console.log(data[i]);
    	skills[i] = data[i]["name"];
    	var option = document.createElement("option");
		option.text = skills[i];
		technology.add(option);
    }
});

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function refresh() {
	data = [];
	name.value = "";
	email.value = "";
	selected_skills.value = "";
	document.getElementById("add-skill").disabled = false;
	for(var i=0; i < 5; ++i) {
		var option = document.createElement("option");
		option.text = skills[i];
		technology.add(option);
	}
}


function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
 

function addSkill() {
  selected_skills.value += "\n";
  selected_skills.value += technology.value;
  selected_skills.value += " - Level: "
  selected_skills.value += output.innerHTML;
  data.push([technology.value, output.innerHTML]);
  for (var i=0; i<technology.length; i++) {
  	if(technology.options[i].value == technology.value) {
  		technology.remove(i);
  	}
  }
  if(data.length == 5) {
  	data.push([name.value, email.value]);
  	document.getElementById("add-skill").disabled = true;
  }
}

function removeRow(element) {
    table.deleteRow(element.parentNode.parentNode.rowIndex);
    rowNum--;
}

const submitFormNow = (e) => {
  e.preventDefault();
  if(data.length != 6) {
  	//alert("Please enter all 5 skills with their skill levels!!");
  	error.innerHTML = "It is mandatory to select 5 skills with their skill levels!";
  	error.style.color = "black";
      setTimeout(function () {
        error.innerHTML = "";
      }, 5000);
  	return
  }
  console.log(data);
  var row = table.insertRow(rowNum);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = data[5][0];
  cell2.innerHTML = data[5][1];
  for(var i=0; i<5; ++i) {
  	cell3.innerHTML += "- " + data[i][0] + "  (Level" + "  " + data[i][1] + ")<br />";
  }	
  cell4.innerHTML = "<button id='remove-row' type='button' onclick='removeRow(this)'>Remove Entry</button>";
  rowNum++;
  refresh()
};


submit_form.addEventListener("submit", (ev) => submitFormNow(ev));