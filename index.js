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

var room = db.ref(`Rooms`)
// Inputdan aldigin roomu firebasede qeyd et
// Roomun icerisinde 2 player budagi yarat

var joinName;
var joinRoom;
var createName;
var createRoom;

function checkJoinValues() {
    if ($("#joinRoomVal").val().trim() && $("#joinNameVal").val().trim()) {
        $(".join").prop("disabled", false)
    } else {
        $(".join").prop("disabled", true)

    }
}

function checkCreateValues() {
    if ($("#createRoomVal").val().trim() && $("#createNameVal").val().trim()) {
        $(".create").prop("disabled", false)
    } else {
        $(".create").prop("disabled", true)

    }
}


$(".create").on('click', function () {
    var createRoom = $("#createRoomVal").val().trim();
    var createName = $("#createNameVal").val().trim()
    console.log(createRoom,createName)
var userCreateName = {
    name:createName,
    room:createRoom,
    Win: 0,
    L:0,
    T:0,
    chat:"Mesajinizi bura yazin"

}
$(".second").show()
$(".welcoming").hide()

    db.ref(`Rooms/${createRoom}`).set({
      userCreateName
    })
})


$(".join").on('click',function(){
    var joinName = $("#joinRoomVal").val().trim()
    var joinRoom = $("#joinNameVal").val().trim()
console.log(joinName,joinRoom)

db.ref(`Rooms/`).on('value',function(snapshot){
    if(snapshot.hasChild(joinRoom)){
        var SecondName = {
            name:joinName,
            room:joinRoom,
            Win: 0,
            L:0,
            T:0,
            chat:"Mesajinizi bura yazin"
        }
        $(".second").show()
        $(".welcoming").hide()
        
        db.ref(`${joinRoom}`).set({
        SecondName
        })
    }else{
        alert("error")
    }
})

})