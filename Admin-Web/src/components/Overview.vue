<template>
  <div id="overview">
    <h2>OverView</h2>

    <!-- ACTIVE TRIPS -->
    <div class="row">

      <!-- List of Trips -->
      <div class="column">
        <h2 align="left">Active Trips</h2>
        <table align="left" >
          <tr>
            <td>
              <input type="text" v-model="search" placeholder="search trips">
            </td>

          </tr>
          <tr>
            <th class ="anim:id">ID</th>
            <th class ="anim:startpoint">StartPoint</th>
            <th class ="anim:endpoint">EndPoint</th>
          </tr>

          <!--Active Trips List-->
          <tr v-for="trip in filteredTrips">

            <td>{{trip.id}}</td>
            <td>{{ trip.startpoint }}</td>
            <td>{{ trip.endpoint }}</td>
            <td>
                <button @click="selectTrip(trip)"> select</button>
            </td>
          </tr>

        </table>
      </div>

      <!-- Specific trip -->
      <div class="column">
        <h2 align="left"> Trip Info </h2>
        <table align="left">

            <tr>
              <th class ="anim:id">TripID</th>
              <th class ="anim:driver">Driver</th>
              <th class ="anim:starttime">StartTime</th>
              <th class ="anim:endtime">EndTime</th>
              <th class ="anim:endtime">Date</th>
              <th class ="anim:startpoint">StartPoint</th>
              <th class ="anim:endpoint">EndPoint</th>
              <th class ="anim:distance">Distance</th>
              <th class ="anim:tripnodes">TripNodes</th>
              <th class ="anim:passengers">Passengers</th>
              <th class ="anim:vehicle">Vehicle</th>
              <th class ="anim:costpercustomer">Cost Per Customer</th>
            </tr>
          <tbody>
            <tr>

                <td>{{ selectedTrip.id  }}</td>
                <td>{{ selectedTripDriver.name }}</td>
                <td>{{ selectedTrip.start_time }}</td>
                <td>{{ selectedTrip.end_time }}</td>
                <td>{{ selectedTrip.date }}</td>
                <td>{{ selectedTrip.startpoint }}</td>
                <td>{{ selectedTrip.endpoint }}</td>
                <td>{{ selectedTrip.distance }}</td>
                <td>
                  <table border="1">
                    <tr v-for="node in selectedTrip.tripNodes">
                      <td> {{node.name}} </td>
                    </tr>
                  </table>
                </td>
                <td>
                  <table border="1">
                    <tr v-for="passenger in selectedTripPassengers">
                      <td> {{passenger.name}} </td>
                    </tr>
                  </table>
                </td>
                <td>
                  <table border="1">
                    <td>{{ selectedTripVehicle.color }}</td>
                    <td>{{ selectedTripVehicle.make }}</td>
                    <td>{{ selectedTripVehicle.model }}</td>
                  </table>
                </td>
                <td>{{ selectedTrip.cost_per_customer }}</td>


            </tr>



          </tbody>
        </table>

      </div>
    </div>

    <!-- ACTIVE DRIVERS -->
    <div class="row">

      <!-- List of Drivers -->
      <div class="column">
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
      </div>

      <!-- Specific driver -->
      <div class="column">
        <h2 align="left"> Driver Info </h2>
        <table align="left">

            <tr>
              <th class ="anim:id">UserId</th>
              <th class ="anim:id">Name</th>
              <th class ="anim:starttime">Username</th>
              <th class ="anim:endtime">Driving Rate</th>
              <th class ="anim:endtime">Passenger Rating</th>
              <th class ="anim:endtime">Password</th>
              <th class ="anim:endtime">Vehicles</th>

            </tr>
          <tbody>
            <tr>
                <td>{{ selectedDriver.id  }}</td>
                <td>{{ selectedDriver.name }}</td>
                <td> {{ selectedDriver.username  }}  </td>
                <td>  {{ selectedDriver.drivingRate }} </td>
                  <td>  {{ selectedDriver.passRate  }} </td>
                  <td>  {{ selectedDriver.password  }} </td>



                  <td> <tr v-for="vehicle in selectedDriver.vehicles ">
                  <td>
                  <table border="1">
                  <tr>{{ vehicle.color  }} </tr>
                  <tr>{{ vehicle.make  }} </tr>
                  <tr>{{ vehicle.model  }} </tr>
                  </table>
                  </td>

                  </tr>
                  </td>







            </tr>


          </tbody>
        </table>
      </div>

    </div>


    <!-- ACTIVE PASSENGERS -->
    <div class="row">

      <!-- List of passengers -->
      <div class="column">
        <h2 align="left"> Active Passengers</h2>
        <table align="left" >
          <tr>
            <td>
              <input type="text" v-model="searchPassenger" placeholder="search Passengers">
            </td>

          </tr>
          <tr>
            <th class ="anim:id">UserID</th>
            <th class ="anim:startpoint">Name</th>
            <th class ="anim:endpoint">Button</th>

          </tr>

          <tr>
            <tr v-for="user in filteredPassengers">

                  <td>{{user.id}}</td>
                  <td>{{ user.name }}</td>

                  <td>
                    <button @click="selectPassenger(user)" > select</button>
                  </td>

            </tr>
            </tr>

        </table>
      </div>

      <!-- Specific passenger -->
      <div class="column">
        <h2 align="left"> Passenger Info </h2>
        <table align="left">

            <tr>
              <th class ="anim:id">UserId</th>
              <th class ="anim:id">Name</th>
              <th class ="anim:starttime">Username</th>

              <th class ="anim:endtime">Password</th>


            </tr>
          <tbody>
            <tr>
                <td>{{ selectedPassenger.id  }}</td>
                <td>{{ selectedPassenger.name }}</td>
                <td> {{ selectedPassenger.username  }}  </td>

                  <td>  {{ selectedPassenger.password  }} </td>



            </tr>


          </tbody>
        </table>
      </div>
    </div>



   <p>
      <span style="color:red">Error: Message text comes here</span>
    </p>
  </div>
</template>

<script src="./TripService.js">
</script>


</template>
<style>
  .column {
    float: left;
    padding-left: 50px;
    width: 30%;
  }

  /* Clear floats after the columns */
  .row:after {
      content: "";
      display: table;
      clear: both;
      overflow: visible;
  }



</style>
<span v-if="errorParticipant" style="color:red">Error: {{errorParticipant}} </span>
