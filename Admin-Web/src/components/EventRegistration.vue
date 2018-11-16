<template>
  <div id="eventregistration">
    <h2>OverView</h2>
    <table>
      <tr v-for="trip in trips" >
      	<td>{{ trip.iD }}</td>
        <td>{{ trip.startPoint }}</td>
        <td>{{ trip.endPoint }}</td>
        <td>
          	<button @click="selectTrip(trip)"> select</button>
      	</td>

      	<td>
        	<ul>
          		<li v-for="customer in trip.customers">
           		 {{customer.name}}
          		</li>
        	</ul>
      	</td>


  	  </tr>

    	<tr>
    	<td>
        	<input type="text" v-model="newParticipant" placeholder="Participant Name">
    	</td>
    	<td>
        	<button @click="createParticipant(newParticipant)">Create Participant</button>
    	</td>
  </tr>
    </table>





    <h2> Trip Info </h2>
    <table>
        <tr>
          <th>Trip Times</th>
          <th>Trip Locations</th>
          <th>Routes</th>
        </tr>
        <tr>
          <th class ="anim:id">TripID</th>
          <th class ="anim:id">Driver</th>
          <th class ="anim:starttime">StartTime</th>
          <th class ="anim:endtime">EndTime</th>
          <th class ="anim:startpoint">StartPoint</th>
          <th class ="anim:endpoint">EndPoint</th>
          <th class ="anim:tripnodes">TripNodes</th>
          <th class ="anim:tripnodes">Customers</th>
        </tr>
      <tbody>
        <tr>
            <td>{{ sELECTEDTRIP.iD  }}</td>
            <td>{{ sELECTEDTRIP.driver  }}</td>
            <td> {{ sELECTEDTRIP.startTime  }}  </td>
            <td>  {{ sELECTEDTRIP.endTime  }} </td>
            <td> {{ sELECTEDTRIP.startPoint  }} </td>
            <td> {{ sELECTEDTRIP.endPoint  }} </td>
            <td> <tr v-for="tripnode in sELECTEDTRIP.tripNodes ">

              <td> {{tripnode.name}} </td>
            </tr>
            </td>

            <td> <tr v-for="customer in sELECTEDTRIP.customers ">

              <td> {{customer.name}} </td>
            </tr>
            </td>

        </tr>


      </tbody>
    </table>








    <p>
      <span style="color:red">Error: Message text comes here</span>
    </p>
  </div>
</template>




<script src="./registration.js">
</script>



</template>
<style>
  #eventregistration {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background: #f2ece8;
  }
</style>
<span v-if="errorParticipant" style="color:red">Error: {{errorParticipant}} </span>
