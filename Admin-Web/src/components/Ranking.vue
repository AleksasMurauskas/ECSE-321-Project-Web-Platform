<template>
  <div id="Ranking">
    <h2>Rankings</h2>
    <table>
      <thead>
          <th>Top Performing Drivers</th>
          <th>Most Loyal Customers</th>
          <th>Most Common Routes {{bestRoutes.length}}</th>
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
        <input type="date" id="start" name="startDate"
        value="2018-07-22"
         min="2018-01-01" max="2018-12-31">
        <td> Select Ending Date: </td>
        <input type="date" id="end" name="EndDate"
        value="2018-07-23"
        min="2018-01-01" max="2018-12-31">
        <button type="button">Filter!</button>
      </tr>
    </table>
  </div>
</template>

<script>
  import temp from "./temp_data/ranking_fake_data.json";
  import trips from "./temp_data/fake_trips.json";
  var error = "Test";
  var bestPassengers;
  var bestDrivers;
  var bestRoutes;

  export default {
    data(){
      generateUserLists()
      generateTripList()
      return {
        bestPassengers,
        bestDrivers,
        bestRoutes,
        error
      }
    },
    methods: {
      userClicked: function(selectedItem){
        alert(selectedItem.name)
      }
    }
  };

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
