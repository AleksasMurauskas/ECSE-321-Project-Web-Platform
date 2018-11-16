<template>

 
  <div id= "Active Trips">
    <h2> Trip Info </h2>
    <div id="show-trips">
      <h1>Active Trips:</h1>
      <input type="text" v-model="search" placeholder="Search Trips" />
        <div v-for="trip in filteredTrips" class="single-trip">
          <h2>{{ trip.startpoint | to-uppercase}}</h2>
      </div>
    </div>

    <p>
    <span style="color:red">Error: Message text comes here</span>
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      trips: [],
      search: ''
    }
  },
  methods: {

  },

  created() {
    this.$http.get('https://webservice-backend-12.herokuapp.com/api/trips/').then(function(data) {
      this.trips = data.body.slice(0, 10);
    })
  },

  computed: {
    filteredTrips: function() {
      return this.trips.filter((trip) => {
        return trip.id.match(this.search);
      })
    }
  }
}

</script>

<style>

  h2 {
  font-weight: normal;
  }
  #initialview {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background: #f2ece8;
  }

</style>
