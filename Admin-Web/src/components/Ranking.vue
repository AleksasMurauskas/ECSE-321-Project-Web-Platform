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
            <li v-for="(route, index) in bestRoutes">
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

//var trips = new Array();
var users;

var error = "Test";



var JSOG = require('../../node_modules/jsog/lib/JSOG.js')
var config = require('../../config')
var frontendUrl = 'http://' + config.dev.host
var backendUrl = 'http://' + config.dev.backendHost

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

export default {
  data(){

    return {
      bestPassengers:[],
      bestDrivers:[],
      bestRoutes:[],
      error,
      startInput: "",
      endInput: ""
    }
  },
  created: function () {
    this.generateLists("NaN", "NaN");
  },
  methods: {
    userClicked: function(selectedItem){
      alert(selectedItem.name + " ID:" + selectedItem.id);

    },
    userClickedID: function(selectedItem){
      alert(selectedItem.id)
    },
    filterClicked: function(startInput, endInput){
      this.generateLists(startInput, endInput);
    },
    generateLists: function(startDate, endDate){
      AXIOS.get('/trips').then(response =>{
        console.log('JSOG.decode(data): %O\t\t', JSOG.decode(response.data));
        this.generateTripList(startDate,endDate, JSOG.decode(response.data));
      }).catch(e =>{
        alert(e);
        this.error = e
      });

      AXIOS.get('/users').then(response =>{
        console.log('JSOG.decode(data): %O\t\t', JSOG.decode(response.data));
        this.generateUserLists(startDate,endDate, JSOG.decode(response.data));
      }).catch(e=>{
        alert(e);
        this.error = e
      })
    },
    generateTripList: function(start, end, trips){
      var routeTypes = new Array();
      var startDate = new Date(start);
      var endDate = new Date(end);

      for(var i = 0; i < trips.length; i++){

        var trip = trips[i];
        var date = new Date(trip.date);
        if((date > startDate && date < endDate) || (startDate == "Invalid Date" && endDate == "Invalid Date" ) ){
          var route = trip.startpoint + " to " + trip.endpoint ;
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
      }

      for (var i = 0; i < routeTypes.length; i++) {
        var value = routeTypes[i]
        for (var j = i - 1; j > -1 && routeTypes[j].count < value.count; j--) {
          routeTypes[j + 1] = routeTypes[j]
        }
        routeTypes[j + 1] = value;
      }

      this.bestRoutes = routeTypes;
    },
    generateUserLists: function(start, end, users){
      var startDate = new Date(start);
      var endDate = new Date(end);
      for(var i = 0; i < users.length; i++){
        var user = users[i];
        var regs = user.registrations;
        var driverCount = 0;
        var passengerCount = 0;
        for(var j = 0; j < regs.length; j++){
          var reg = regs[j];
          var date = new Date(reg.trip.date);
          if(reg.role == "driver"){
            if((date > startDate && date < endDate) || (startDate == "Invalid Date" && endDate == "Invalid Date")){
              driverCount++;
            }
          } else {
            if((date > startDate && date < endDate) || (startDate == "Invalid Date" && endDate == "Invalid Date" )){
              passengerCount++;
            }
          }
        }
        user.pCount = passengerCount;
        user.dCount = driverCount;
      }
      this.bestPassengers = sortToPCount(users);
      this.bestDrivers = sortToDCount(users);
    }
  }

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
