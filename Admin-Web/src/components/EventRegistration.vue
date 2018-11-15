<template>
  <div id="eventregistration">
    <h2>Participants</h2>
    <table>
      <tr v-for="participant in participants" >
      	<td>{{ participant.name }}</td>
      	<td>
        	<ul>
          		<li v-for="event in participant.events">
           		 {{event.name}}
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


