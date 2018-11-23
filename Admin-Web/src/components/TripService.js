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

function T (id) {
  this.id = id
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
      selectedTrip : JSOG.decode([
    {
        "@id": "1",
        "id": 5,
        "startpoint": "Montreal",
        "endpoint": "Toronto",
        "distance": 1000,
        "active": true,
        "start_time": "01:40:02",
        "end_time": "15:00:00",
        "est_Trip_time": 100,
        "seats_available": 2,
        "date": "2018-01-22",
        "compleated": false,
        "vehicle": {
            "@id": "2",
            "id": 4,
            "model": "Cooper",
            "make": "Mini",
            "color": "Blue",
            "trips": [
                {
                    "@ref": "1"
                },
                {
                    "@id": "3",
                    "id": 11,
                    "startpoint": "Montreal",
                    "endpoint": "Toronto",
                    "distance": 1000,
                    "active": true,
                    "start_time": "01:40:02",
                    "end_time": "15:00:00",
                    "est_Trip_time": 100,
                    "seats_available": 2,
                    "date": "2018-01-22",
                    "compleated": false,
                    "vehicle": {
                        "@ref": "2"
                    },
                    "cost_per_customer": 100,
                    "registrations": [
                        {
                            "@id": "4",
                            "id": 12,
                            "role": "DRIVER",
                            "user": {
                                "@id": "5",
                                "id": 1,
                                "name": "Bob",
                                "username": "admin",
                                "password": "$2a$10$/NyGBTxBVAUI9MQm.K6VVe7lHa16meyUeFW8DcZi8MkylvzndHtoW",
                                "drivingRate": 5,
                                "passRate": 5,
                                "registrations": [
                                    {
                                        "@id": "6",
                                        "id": 6,
                                        "role": "DRIVER",
                                        "user": {
                                            "@ref": "5"
                                        },
                                        "trip": {
                                            "@ref": "1"
                                        }
                                    },
                                    {
                                        "@ref": "4"
                                    }
                                ],
                                "vehicles": [
                                    {
                                        "@ref": "2"
                                    }
                                ],
                                "roles": [
                                    {
                                        "id": 3,
                                        "name": "ADMIN"
                                    },
                                    {
                                        "id": 2,
                                        "name": "USER"
                                    }
                                ],
                                "dweight": 5,
                                "pweight": 5
                            },
                            "trip": {
                                "@ref": "3"
                            }
                        }
                    ],
                    "tripNodes": [
                        {
                            "@id": "7",
                            "id": 13,
                            "position": {
                                "@id": "8",
                                "id": 14,
                                "tripNodes": [
                                    {
                                        "@ref": "7"
                                    }
                                ],
                                "position": "ontario"
                            },
                            "pointType": "START",
                            "name": "Montreal",
                            "time": "01:40:02"
                        },
                        {
                            "@id": "9",
                            "id": 15,
                            "position": {
                                "@id": "10",
                                "id": 16,
                                "tripNodes": [
                                    {
                                        "@ref": "9"
                                    }
                                ],
                                "position": "ontario"
                            },
                            "pointType": "END",
                            "name": "Toronto",
                            "time": "15:00:00"
                        }
                    ]
                }
            ],
            "user": {
                "@ref": "5"
            }
        },
        "cost_per_customer": 100,
        "registrations": [
            {
                "@ref": "6"
            }
        ],
        "tripNodes": [
            {
                "@id": "11",
                "id": 9,
                "position": {
                    "@id": "12",
                    "id": 10,
                    "tripNodes": [
                        {
                            "@ref": "11"
                        }
                    ],
                    "position": "ontario"
                },
                "pointType": "START",
                "name": "Montreal",
                "time": "01:40:02"
            },
            {
                "@id": "13",
                "id": 7,
                "position": {
                    "@id": "14",
                    "id": 8,
                    "tripNodes": [
                        {
                            "@ref": "13"
                        }
                    ],
                    "position": "ontario"
                },
                "pointType": "END",
                "name": "Toronto",
                "time": "15:00:00"
            }
        ]
    },
    {
        "@ref": "3"
    }

]
)[0],
      selectedDriver: new UserDto("name", "username", "password", "drivingrate","passrate"),
      selectedPassenger: new UserDto("name", "username", "password", "drivingrate","passrate"),
      searchPassenger:'',
      response: [],
      users:[],
      drivers:[],
      passengers:[],
      reg:'',
      r:[],
      selectedTripDriver: ''

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

      //console.log("JSOG Output: " + JSOG.decode(response.data))
      console.log('JSOG.decode(data): %O\t\t', JSOG.decode(response.data));

      this.trips= JSOG.decode(response.data)
      console.log(this.trips)
    })
   .catch(e => {
     this.errorTrip = e;
   });



   AXIOS.get(`/users`)
   .then(response => {
     // JSON responses are automatically parsed.
     this.users = JSOG.decode(response.data)
     console.log(this.users)
    console.log(this.users[0] );
    function isRole(user,role) {
      return  user.registrations.map(
        (registration) => {
          return registration.role.match(role);
        }
      ).reduce((acc,val) => acc || val, false);
    }
    this.drivers = this.users.filter((user)=> isRole(user,"DRIVER"))

    // Returns users that are drivers
    // this.drivers = this.users.filter(
    //
    //   // Returns array of booleans s.t
    //   (user) => user.registrations.map(
    //     (registration) => {
    //       return registration.role.match("DRIVER");
    //     }
    //   ).reduce((acc,val) => acc || val, false)
    // )

    console.log('JSOG.decode(datadriver): %O\t\t', this.drivers);


//console.log('JSOG.decode(datadriver): %O\t\t', this.drivers);
     // this.drivers= this.users.filter((user)=>
     //  { user.registersations.map(
     //   (registration)=> {return registration.role.match("DRIVER");})
     //   .reduce((accumulator,currentValue)=> {return accumulator||currentValue;});
     //
     // }
     // )
     //
     //   console.log('JSOG.decode(datadriver): %O\t\t', this.drivers);
     // this.passengers= this.users.filter((user)=>user.registrations.map((registration)=>{return registration.role.match("PASSENGER");}).reduce((acc,val)=>acc||val,false)
     //   )
     this.passengers= this.users.filter((user)=>isRole(user,"PASSENGER"))


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
    getDriver: function(trip){
      this.r= trip.registrations
      this.selectedTripDriver=this.r.filter((registration)=> registration.role.match("DRIVER"))[0];

      return this.r.filter((registration)=> { return registration.role.match("DRIVER");})[0];

    },

    selectTrip: function (trip) {
      // Create a new participant and add it to the list of participants
      //var p = new ParticipantDto(participantName)
      //this.p.push(p)
      // Reset the name field for new participants
      //this.newParticipant = ''

      console.log('Selected Trip: %O\t\t', trip);
      console.log(trip.id);
      console.log(typeof trip);
      this.selectedTrip= trip
      let   getDriver = function(trip){
          var r= trip.registrations
        //  this.selectedTripDriver= r.filter((registration)=> registration.role.match("DRIVER"))[0];
      //  return r.filter((registration)=>{return registration.role.match("DRIVER");})[0]
        //  return r.filter((registration)=> registration.role.match("DRIVER"))[0];
       return (r.filter((registration)=>{return registration.role.match("DRIVER");}))[0].user
      //return r.filter((registration)=>{return true;})[0].user
        //return r[0].user
        }
      this.selectedTripDriver=getDriver(this.selectedTrip)
      //new T(trip.id)
      console.log('Selected Tripv2: %O\t\t', this.selectedTrip);
      //(iD, driver, start, end, startPoint, endPoint,date,vehicle)
      //this.selectedTrip=trip
      //this.selectedTrip = JSOG.decode(trip)
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
    },
    source: function() {
      return this.selectedTrip || '';
    }


  }

}
