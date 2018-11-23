<template>
  <div id="Ranking">
    <h2>Rankings</h2>
    <table>
      <thead>
        <th>Top Performing Drivers</th>
        <th>Most Loyal Customers</th>
        <th>Most Common Routes</th>
      </thead>
      <tbody>
        <td>
          <ul class = "list">
            <li v-for="(user,index) in bestDrivers" v-on:click="userClicked(user)">
              #{{index + 1}} {{user.name}} - Driver Count: {{user.dCount}}
            </li>
          </ul>
        </td>
        <td>
          <ul class = "list">
            <li v-for="(user, index) in bestPassengers" v-on:click="userClicked(user)">
              #{{index + 1}} {{user.name}} - PassengerCount: {{user.pCount}}
            </li>
          </ul>
        </td>
        <td>
          <ul class = "list">
            <li v-for="(route, index) in bestRoutes" v-on:click="userClicked(user)">
              #{{index+ 1}} {{route.value}} - Trip count: {{route.count}}
            </li>
          </ul>
        </td>
      </tbody>
    </table>
    <p>
      <span style="color:red">Error: {{error}}</span>
    </p>

    <table>
      <tr>
        <td> Select Starting Date: </td>
        <input type="date" id="start" name="StartDate" v-model="startInput"
        value="2018-07-22"
        min="2018-01-01" max="2018-12-31">
        <td> Select Ending Date: </td>
        <input type="date" id="end" name="EndDate" v-model="endInput"
        value="2018-07-23"
        min="2018-01-01" max="2018-12-31">
        <button type="button"  v-on:click="filterClicked(startInput, endInput)">Filter!</button>
      </tr>
    </table>
  </div>
</template>

<script>
import temp from "./temp_data/ranking_fake_data.json";
import axios from 'axios'

var trips;
var users;

var error = "Test";
var bestPassengers;
var bestDrivers;
var bestRoutes;



var JSOG = require('../../node_modules/jsog/lib/JSOG.js')
var config = require('../../config')
var frontendUrl = 'http://' + config.dev.host+ ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

export default {
  data(){
    return {
      bestPassengers,
      bestDrivers,
      bestRoutes,
      error,
      startInput: "",
      endInput: ""
    }
  },
  created: function () {
    AXIOS.get('/trips').then(response =>{
      this.trips = JSOG.decode(response.data)
    }).catch(e =>{
      this.error = e
    });

    //generateUserLists();
    //generateTripList();
  },
  methods: {
    userClicked: function(selectedItem){
      alert(selectedItem.name)
    },
    userClickedID: function(selectedItem){
      alert(selectedItem.id)
    },
    filterClicked: function(startInput, endInput){
      filterLists(startInput, endInput)
    }
  }
}

function filterLists(startInput, endInput){

  alert(startInput);
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var newTripList = [];
  for(var i =0; i < trips.length;i++){
    var trip = trips[i];
    if(trip.compleated){
      if(trip.date <= startInput && trip.date <= endInput){
        newTripList.push(trip);
      }
    }
  }

  for(var a =0; a< temp.length; a++){
    var activeUser = temp[a];
    for(var b=0; b< activeUser.registrations.length; b++){
      var reg1 = activeUser.registrations[b];
      for(var c = 0; c< newTripList.length; c++){
        var activeTrip = newTripList[c];
        for(var d =0; d< activeTrip.registrations.length; d++){
          var reg2= activeTrip.registrations[d];
          if(reg1.id == reg2.id){
            if(reg1.role == "driver"){
              activeUser.dCount++;
            }
            if(reg1.role == "passenger"){
              activeUser.pCount++;
            }
          }
        }
      }
    }
  }
  SortRouteList(newTripList);
  bestPassengers = sortToPCount(temp);
  bestDrivers = sortToDCount(temp);
}

function  generateUserLists(startDate, endDate){
  var users = temp;
  for(var i = 0; i < users.length; i++){
    var user = users[i];
    var regs = user.registrations;
    var driverCount = 0;
    var passengerCount = 0;
    for(var j = 0; j < regs.length; j++){
      var reg = regs[j];
      if(reg.role == "driver"){
        driverCount++;
      } else {
        passengerCount++;
      }
    }
    user.pCount = passengerCount;
    user.dCount = driverCount;
  }
  bestPassengers = sortToPCount(users);
  bestDrivers = sortToDCount(users);
}

function generateTripList(startDate, endDate){
  var routeTypes = new Array();
  for(var i = 0; i < trips.length; i++){
    var trip = trips[i];
    var date = new Date(trip.date)
    var route = trip.startPoint + " to " + trip.endPoint ;
    var changed = false;
    for(var j = 0; j <routeTypes.length; j++){
      if(route == routeTypes[j].value){
        routeTypes[j].count++;
        changed = true;
      }
    }
    if(changed == false){
      routeTypes.push(new routeType(route, 1))
    }
  }
  for (var i = 0; i < routeTypes.length; i++) {
    var value = routeTypes[i]
    for (var j = i - 1; j > -1 && routeTypes[j].count < value.count; j--) {
      routeTypes[j + 1] = routeTypes[j]
    }
    routeTypes[j + 1] = value;
  }
  bestRoutes = routeTypes;
}
function routeType(value, count) {
  this.value = value;
  this.count = count;
}
function sortToPCount(list){
  var items = list.slice();
  for (var i = 0; i < items.length; i++) {
    var value = items[i]
    for (var j = i - 1; j > -1 && items[j].pCount < value.pCount; j--) {
      items[j + 1] = items[j]
    }
    items[j + 1] = value
  }
  return items;
}
function sortToDCount(list){
  var items = list.slice();
  for (var i = 0; i < items.length; i++) {
    var value = items[i]
    for (var j = i - 1; j > -1 && items[j].dCount < value.dCount; j--) {
      items[j + 1] = items[j]
    }
    items[j + 1] = value
  }
  return items;
}

function SortRouteList(tripList){
  var routeTypes = new Array();
  for(var i = 0; i < tripList.length; i++){
    var trip = tripList[i];
    var date = new Date(trip.date)
    var route = trip.startPoint + " to " + trip.endPoint ;
    var changed = false;
    for(var j = 0; j <routeTypes.length; j++){
      if(route == routeTypes[j].value){
        routeTypes[j].count++;
        changed = true;
      }
    }
    if(changed == false){
      routeTypes.push(new routeType(route, 1))
    }
  }
  for (var i = 0; i < routeTypes.length; i++) {
    var value = routeTypes[i]
    for (var j = i - 1; j > -1 && routeTypes[j].count < value.count; j--) {
      routeTypes[j + 1] = routeTypes[j]
    }
    routeTypes[j + 1] = value;
  }
  bestRoutes = routeTypes;
}
</script>


<style>
#Ranking{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background: #f2ece8;
}
table {
  align:"center";
  margin: auto;
}
th, td{
  padding-left: 25px;
  padding-right: 25px;
}
td{
  padding-bottom: 50px;
}
.scroller {
  height: 300px;
  overflow-y: auto;
}
.list{
  list-style-type: none;
  padding: 0;
  margin:0;
  height: 300px;
  overflow: auto;
}
li{
  cursor: pointer;
}
</style>
