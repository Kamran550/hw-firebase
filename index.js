var firebaseConfig = {
    apiKey: "AIzaSyAer7a-FvXhdPlrewwht4klNfwiUm1ZP98",
    authDomain: "fkbootcamp.firebaseapp.com",
    projectId: "fkbootcamp",
    storageBucket: "fkbootcamp.appspot.com",
    messagingSenderId: "407529317160",
    appId: "1:407529317160:web:d2096a7f94481386fb661d"
  };
  
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database()
  
// chat hissesi   

  var name = prompt("adiniz?")
  
  $("#btn").on('click',function(event){
    event.preventDefault()
    var text = $("#metn").val().trim()
     var p =$("<div>")
     p.text(text)
     p = Object.values(p)
     $("#metn").val("")
     var insan = {
        name:name,
        text:text
     }
  var Kam = db.ref('budaq').push(insan)
  })

  db.ref('budaq').on('value',function(snapshot){
      var human = snapshot.val()
      var human = Object.values(human)
      console.log(human)
    for(var employee of human){
    }
    console.log(employee)


    console.log(employee.name + employee.text)
    $("#write").append("<div>" + employee.name  +":"+employee.text+ "</div> <hr>")
    $("#write").scrollTop($("#write")[0].scrollHeight);

  })
  
  // Game hisse

  var joinName;
var joinRoom;
var createName;
var createRoom;
var userGuess = {
  W: 0,
  L: 0,
  T: 0,
  guess: null,
  chat: "Good Luck, Have Fun! :)"
}

function checkJoinValues(){
  if( $("#joinRoomVal").val().trim()){
    $(".join").prop('disabled',false)
  }else{
    $(".join").prop('disabled',true)
  }
}

function checkCreateValues(){
  if($("#createRoomVal").val().trim()){
    $(".create").prop('disabled',false)
  }else{
    $(".create").prop('disabled',true)

  }
}

$(".join").on('click',function(){
  // joinName = $("#joinNameVal").val().trim()
  joinRoom = $("#joinRoomVal").val().trim()
  db.ref('Rooms').on('value',function(snapshot){
    if(snapshot.hasChild(joinRoom)){
      db.ref(`Rooms/${joinRoom}`).set({
        userGuess
      })
      $(".card-header").text(name)

      $(".second").show()
      $(".welcoming").hide()

    }else{
      alert("Bele bir otaq yoxdur")
    }
  })
})


$(".create").on('click',function(){
  // createName = $("#createNameVal").val().trim()
  createRoom = $("#createRoomVal").val().trim()

  $(".card-header").text(name)

 db.ref(`Rooms/${createRoom}`).set({
   userGuess 
 })

 $(".welcoming").hide()
 $(".second").show()
})