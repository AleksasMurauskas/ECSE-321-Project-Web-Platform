function CustomerDto (name) {
  this.name = name
  this.events = []
}

function TripNodeDto (name) {
  this.name = name
  this.events = []
}

function TripDto (iD, driver, start, end, startPoint, endPoint) {
  this.iD = iD
  this.startPoint = startPoint
  this.endPoint= endPoint
  this.driver = driver
  this.startTime = start
  this.endTime = end
  this.customers=[]
  this.tripNodes=[]
}

export default {
  name: 'eventregistration',
  data () {
    return {
      trips: [],
      newParticipant: '',
      errorParticipant: '',
      sELECTEDTRIP : new TripDto("000", "000", "0000", "0000","000000","000000"),
      response: []
    }
  },
  created: function () {
  // Test participants
  const p1 = new TripDto("1", "bob", "17:30", "18:00","montreal","quebec")
  const p2 = new TripDto("1", "bob", "17:30", "18:00","toronto","montreal")
  // Test event for p2 participant
  p2.customers=[{"name":"ricky"}]
  p2.tripNodes = [{"name":"kingston"}]
  // Sample initial content
  this.trips = [p1, p2]
},


methods: {
  createParticipant: function (participantName) {
    // Create a new participant and add it to the list of participants
    var p = new ParticipantDto(participantName)
    this.participants.push(p)
    // Reset the name field for new participants
    this.newParticipant = ''
  },

  selectTrip: function (trip) {
    // Create a new participant and add it to the list of participants
    //var p = new ParticipantDto(participantName)
    //this.p.push(p)
    // Reset the name field for new participants
    //this.newParticipant = ''
    this.sELECTEDTRIP = trip
  }


}

}
