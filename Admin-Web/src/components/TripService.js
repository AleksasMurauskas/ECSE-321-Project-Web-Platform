var JSOG = require('../../node_modules/jsog/lib/JSOG.js')

import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host
var backendUrl = 'http://' + config.dev.backendHost
//+ ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

function UserDto (name, username, password, drivingrate,passrate) {
  this.id=0
  this.name =name
  this.username= username
  this.password = password
  this.drivingrate = drivingrate
  this.passrate= passrate
}

export default {
  name: 'tripservice',
  data () {
    return {
      search: '',
      searchDriver:'',
      trips: [],
      users:[],
      newParticipant: '',
      errorTrip: '',
      selectedTrip : Object,
      selectedDriver: new UserDto("name", "username", "password", "drivingrate","passrate"),
      selectedPassenger: new UserDto("name", "username", "password", "drivingrate","passrate"),
      searchPassenger:'',
      response: [],
      drivers:[],
      passengers:[],
      reg:'',
      registrations:[],
      selectedTripDriver: Object,
      selectedTripVehicle: Object,
      selectedTripPassengers: []

    }
  },

  /**
   * ON WEBPAGE LOAD
   */
  created: function () {
    /**
     * --------------------
     * Get all trips
     * --------------------
     */
    AXIOS.get(`/trips`)
    .then(response => {
      console.log('JSOG.decode(data): %O\t\t', JSOG.decode(response.data));

      this.trips = JSOG.decode(response.data)
      console.log(this.trips)
    })
   .catch(e => {
     this.errorTrip = e;
   });


    /**
     * --------------------
     * Get all users
     * --------------------
     */
    AXIOS.get(`/users`)
    .then(response => {
        // JSON responses are automatically parsed.
        this.users = JSOG.decode(response.data)
        console.log(this.users)
        console.log(this.users[0] );

    /**
    * --------------------
    * Get all drivers
    * --------------------
    */
    this.drivers = this.users.filter((user) => this.isRole(user,"DRIVER"))

    /**
     * --------------------
     * Get all passengers
     * --------------------
     */
    this.passengers= this.users.filter((user) => this.isRole(user,"PASSENGER"))

    console.log('JSOG.decode(datadriver): %O\t\t', this.drivers);


    })
    .catch(e => {
        this.errorTrip = e;
    });

  },

  methods: {

    /**
     *
     * @param user
     * @param role
     */
    isRole: function(user, role) {
        return  user.registrations.map(
            (registration) => {
                return registration.role.match(role);
               }
        ).reduce((acc,val) => acc || val, false);
    },

    /**
     * Get a set of registrations by role
     * @param trip
     * @param role
     */
    getRegistrationByRole: function(trip, role) {
        var registrations = trip.registrations.filter(
            (registration) => {
                return registration.role.match(role)
                }
        )
        return registrations
    },

    /**
     * Get users with role for a given trip
     * @param trip
     * @param role
     */
    getUsersWithRole: function(trip, role) {
        var users = []
        var registrations = this.getRegistrationByRole(trip, role)
        return registrations.map((registration) => registration.user)
    },

    /**
     * On selection of a given trip
     * @param trip
     */
    selectTrip: function (trip) {

      console.log('Selected Trip: %O\t\t', trip);
      console.log(trip.id);
      console.log(typeof trip);
      console.log('Selected Registration: %O\t\t', trip.registrations)

      this.selectedTrip = trip
      this.selectedTripVehicle = trip.vehicle
      this.selectedTripDriver = this.getUsersWithRole(this.selectedTrip, "DRIVER")[0]
      this.selectedTripPassengers = this.getUsersWithRole(this.selectedTrip, "PASSENGER");

      console.log('Filtered: %O\t\t', this.getUsersWithRole(this.selectedTrip, "DRIVER")[0])
      console.log('Vehicle: %O\t\t', trip.vehicle);

    },
    selectDriver: function (user) {
      // Create a new participant and add it to the list of participants
      //var p = new ParticipantDto(participantName)
      //this.p.push(p)
      // Reset the name field for new participants
      //this.newParticipant = ''
      this.selectedDriver = user
    },
    selectPassenger: function (user) {
      // Create a new participant and add it to the list of participants
      //var p = new ParticipantDto(participantName)
      //this.p.push(p)
      // Reset the name field for new participants
      //this.newParticipant = ''
      this.selectedPassenger = user
    },
    getUserName: function (registration) {
      // Create a new participant and add it to the list of participants
      //var p = new ParticipantDto(participantName)
      //this.p.push(p)
      // Reset the name field for new participants
      //this.newParticipant = ''
      //this.reg= JSOG.decode(registration)
      return registration.user.name;
    }

  },

  computed: {
    filteredTrips: function() {
      return this.trips.filter((trip) => {
        return trip.endpoint.match(this.search);
      })
    },
    filteredDrivers: function() {
      return this.drivers.filter((user) => { // is going to have to search through each persons
        // registrations to see if they have ever been a driver
        return user.name.match(this.searchDriver);
      })
    },
    filteredPassengers: function() {
      return this.passengers.filter((user) => { // is going to have to search through each persons
        // registrations to see if they have ever been a driver
        return user.name.match(this.searchPassenger);
      })
    }


  }

}
