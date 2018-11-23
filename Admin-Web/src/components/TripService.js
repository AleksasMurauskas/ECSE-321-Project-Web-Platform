var JSOG = require('../../node_modules/jsog/lib/JSOG.js')

import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host+ ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost
//+ ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})



function CustomerDto (name) {
  this.name = name
  this.events = []
}

function TripNodeDto (name) {
  this.name = name
}

function TripDto (iD, driver, start, end, startPoint, endPoint,date,vehicle) {
  this.id = iD
  this.startpoint = startPoint
  this.endpoint= endPoint
  this.driver = driver
  this.start_time = start
  this.end_time = end
  this.date= date
  this.vehicle=vehicle
  this.registrations=[]
  this.tripNodes=[]
}

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
      newParticipant: '',
      errorTrip: '',
      selectedTrip : new TripDto("000", "000", "0000", "0000","000000","000000","0000","bmw"),
      selectedDriver: new UserDto("name", "username", "password", "drivingrate","passrate"),
      response: [],
      users:[],
      drivers:[],
      passengers:[],

    }
  },
  created: function () {
    // Test participants
    //const p1 = new TripDto("1", "bob", "17:30", "18:00","montreal","quebec","930293","car")
    //const p2 = new TripDto("2", "bob", "17:30", "18:00","toronto","montreal","13093","bmw")

    // Test event for p2 participant
  //  p2.customers=[{"name":"ricky"}]
  //  p2.tripNodes = [{"name":"kingston"}]

    // Sample initial content
    //this.trips = [p1, p2,p1,p1,p1,p1,p1,p1,p1,p1,p1,p1,p1,p1,p1]


    AXIOS.get(`/trips`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.trips = JSOG.decode(response.data)

      console.log(this.trips)
    })
   .catch(e => {
     this.errorTrip = e;
   });



   AXIOS.get(`/users`)
   .then(response => {
     // JSON responses are automatically parsed.
     this.users = response.data
     console.log(this.users)

     this.drivers= this.users.filter((user)=>
      {return user.registersations.map(
       (registration)=> {return registration.role})
       .match("DRIVER")}
       )

       this.passengers= this.users.filter((user)=>
        {return user.registersations.map(
         (registration)=> {return registration.role})
         .match("PASSENGER")}
         )
   })
  .catch(e => {
    this.errorTrip = e;
  });




  },


  methods: {
    /*
    createParticipant: function (participantName) {
      // Create a new participant and add it to the list of participants
      var p = new ParticipantDto(participantName)
      this.participants.push(p)
      // Reset the name field for new participants
      this.newParticipant = ''
    },
    */

    selectTrip: function (trip) {
      // Create a new participant and add it to the list of participants
      //var p = new ParticipantDto(participantName)
      //this.p.push(p)
      // Reset the name field for new participants
      //this.newParticipant = ''
      this.selectedTrip = trip
    },
    selectDriver: function (user) {
      // Create a new participant and add it to the list of participants
      //var p = new ParticipantDto(participantName)
      //this.p.push(p)
      // Reset the name field for new participants
      //this.newParticipant = ''
      this.selectedDriver = user
    },
    getDriver: function(trip){
      r= trip.registrations
      r.map(registration => {if (registration.role=="DRIVER") {return registration.user;} else {}})
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
    }


  }



}
