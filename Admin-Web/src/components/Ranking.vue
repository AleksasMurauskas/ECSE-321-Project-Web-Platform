<template>
  <div id="Ranking">
    <h2>Rankings</h2>


    <table>
      <tr>
          <th>Top Performing Drivers</th>
          <th>Most Loyal Customers</th>
          <th>Most Common Routes</th>
      </tr>
      <tr>
        <table>
          <thead>
            <tr>
              <th class ="anim:position">Pos</th>
              <th class="anim:update">DriverName</th>
              <th class="anim:update">DriverID</th>
              <th class="anim:update">Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>Driver A</td>
                <td>Some ID</td>
                <td>Some Rating</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Driver B</td>
              <td>Some ID</td>
              <td>Some Rating</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th class ="anim:position">Pos</th>
              <th class="anim:updatee">DriverName</th>
              <th class="anim:update">PassID</th>
              <th class="anim:update">Trips</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>Passenger A</td>
                <td>Some ID</td>
                <td>Some TripNumber</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Passenger B</td>
              <td>Some ID</td>
              <td>Some TripNumber</td>
            </tr>
          </tbody>
        </table>
         <table>
          <thead>
            <tr>
              <th class ="anim:position">Pos</th>
              <th class="anim:update">City 1</th>
              <th class="anim:update">City 2</th>
              <th class="anim:update"># of Trips</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>City 1</td>
                <td>City 2</td>
                <td>Some Amount</td>
            </tr>
            <tr>
                <td>1</td>
                <td>City 1</td>
                <td>City 2</td>
                <td>Some Amount</td>
            </tr>
          </tbody>
        </table>
      </tr>
    </table>
    <p>
      <span style="color:red">Error: Message text comes here</span>
    </p>
  </div>
</template>

<script>
</script>



<style>
  #initialview {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background: #f2ece8;
  }
</style>