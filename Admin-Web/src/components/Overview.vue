<template>
  <div id="overview">
    <h2>OverView</h2>
    <h2 align="left">Active Trips</h2>
    <table align="left" >
      <tr>
        <td>
          <input type="text" v-model="search" placeholder="search trips">
        </td>

      </tr>
      <tr>
        <th class ="anim:id">TripID</th>
        <th class ="anim:startpoint">StartPoint</th>
        <th class ="anim:endpoint">EndPoint</th>
      </tr>
      <tr>
    <!--  <ul class="list" >  -->
        <tr v-for="trip in filteredTrips">
          <!--<tr>-->
      	       <td>{{trip.id}}</td>
              <td>{{ trip.startpoint }}</td>
              <td>{{ trip.endpoint }}</td>
              <td>
          	     <button @click="selectTrip(trip)"> select</button>
      	       </td>
  	       <!--</tr>-->
        </tr>
      <!--</ul>-->
      </tr>
    </table>





    <h2 align="left"> Trip Info </h2>
    <table align="left">

        <tr>
          <th class ="anim:id">TripID</th>
          <th class ="anim:id">Driver</th>
          <th class ="anim:starttime">StartTime</th>
          <th class ="anim:endtime">EndTime</th>
          <th class ="anim:endtime">Date</th>
          <th class ="anim:startpoint">StartPoint</th>
          <th class ="anim:endpoint">EndPoint</th>
          <th class ="anim:tripnodes">TripNodes</th>
          <th class ="anim:tripnodes">Passengers</th>
          <th class ="anim:tripnodes">Vehicle</th>
        </tr>
      <tbody>
        <tr>
            <td>{{ selectedTrip.id  }}</td>
            <td>{{ selectedTrip.id }}</td>
            <td> {{ selectedTrip.start_time  }}  </td>
            <td>  {{ selectedTrip.end_time  }} </td>
              <td>  {{ selectedTrip.date  }} </td>
            <td> {{ selectedTrip.startpoint  }} </td>
            <td> {{ selectedTrip.endpoint  }} </td>
            <td> <tr v-for="tripnode in selectedTrip.tripnodes ">

              <td> {{tripnode.name}} </td>
            </tr>
            </td>

            <td> <tr v-for="registration in selectedTrip.registrations ">

              <td> {{registration}} </td>
            </tr>
            </td>

              <td> {{ selectedTrip.vehicle  }} </td>

        </tr>


      </tbody>
    </table>




    <h2 align="left"> Active Drivers</h2>
    <table align="left" >
      <tr>
        <td>
          <input type="text" v-model="searchDriver" placeholder="search Drivers">
        </td>

      </tr>
      <tr>
        <th class ="anim:id">UserID</th>
        <th class ="anim:startpoint">Name</th>
        <th class ="anim:endpoint">Button</th>

      </tr>

      <tr>
        <tr v-for="user in filteredDrivers">

               <td>{{user.id}}</td>
              <td>{{ user.name }}</td>

              <td>
                 <button @click="selectDriver(user)" > select</button>
               </td>

        </tr>
        </tr>

    </table>





    <h2 align="left"> Driver Info </h2>
    <table align="left">

        <tr>
          <th class ="anim:id">UserId</th>
          <th class ="anim:id">Name</th>
          <th class ="anim:starttime">Username</th>
          <th class ="anim:endtime">Driving Rate</th>
          <th class ="anim:endtime">Passenger Rating</th>
          <th class ="anim:endtime">Password</th>

        </tr>
      <tbody>
        <tr>
            <td>{{ selectedDriver.id  }}</td>
            <td>{{ selectedDriver.name }}</td>
            <td> {{ selectedDriver.username  }}  </td>
            <td>  {{ selectedDriver.drivingrate }} </td>
              <td>  {{ selectedDriver.passrate  }} </td>
              <td>  {{ selectedDriver.password  }} </td>







        </tr>


      </tbody>
    </table>




   <p>
      <span style="color:red">Error: Message text comes here</span>
    </p>
  </div>
</template>




<script src="./TripService.js">
</script>







</template>
<style>
  #overview {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background: #f2ece8;
  }
  .list{
  list-style-type:none;
  padding:0;
  margin:0;
  height: 300px;
  overflow:auto;
  }
</style>
<span v-if="errorParticipant" style="color:red">Error: {{errorParticipant}} </span>
