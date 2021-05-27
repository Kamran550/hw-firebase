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
var userGuess2 = {
    Name: "Whating...",
    W: 0,
    L: 0,
    T: 0,
    guess: null,
    chat: "Good Luck, Have Fun! :)"
}
var userGuess1 = {
    Name: "Whating...",
    W: 0,
    L: 0,
    T: 0,
    guess: null,
    chat: "Good Luck, Have Fun! :)"
}
var thisroom = "test"


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



$(".join").on('click', function () {
    joinName = $("#joinNameVal").val().trim()
    joinRoom = $("#joinRoomVal").val().trim()

    var userGuess2 = {
        Name: joinName,
        W: 0,
        L: 0,
        T: 0,
        guess: null,
        chat: "Good Luck, Have Fun! :)"
    }
thisroom = joinRoom
    $(".jButtons").prop("disabled", false)
    $(".joinName").text(joinName)
    db.ref(`Rooms/`).once('value', function (snapshot) {
        $(".createName").text(snapshot.child(thisroom).val().player1.Name)


        if (snapshot.hasChild(joinRoom)) {
            db.ref(`Rooms/${joinRoom}/player2/`).set(
                userGuess2
            )
            $(".welcoming").hide()
            $(".second").show()

        } else {
            alert("Bele bir otaq yoxdur")
        }
    })

})

$(".create").on('click', function () {
    createName = $("#createNameVal").val().trim()
    createRoom = $("#createRoomVal").val().trim()

    userGuess1 = {
        Name: createName,
        W: 0,
        L: 0,
        T: 0,
        guess: null,
        chat: "Good Luck, Have Fun! :)"
    }

    $(".cButtons").prop('disabled', false)

    db.ref(`Rooms/${createRoom}/player1`).set(
        userGuess1
    )

    db.ref(`Rooms/${createRoom}/player2`).set(
        userGuess2
    )
    thisroom = createRoom
    $(".welcoming").hide()
    db.ref(`Rooms/${thisroom}`).on('value', function (snapshot) {
        $(".joinName").text(snapshot.val().player2.Name)
        $(".createName").text(snapshot.val().player1.Name)
    })
    $(".second").show()

})


$(".jButtons").on('click',function(){
    var player2Choice = $(this).attr("value")

 

    db.ref(`Rooms/${thisroom}/player2`).update({
        guess:player2Choice
    })
    gameBegin()

})

$(".cButtons").on('click',function(){
    var player1Choice = $(this).attr('value')
    console.log(player1Choice)

    db.ref(`Rooms/${thisroom}/player1`).update({
        guess:player1Choice
    })

    gameBegin()
})


db.ref(`Rooms/`).on('value',function(snapshot){
    call(createRoom)
})


function call(room){
    db.ref(`Rooms/${room}`).on('value',function(snapshot){
        $("#jw").text(snapshot.child(player2).val().W)
        $("#jl").text(snapshot.child(player2).val().L)
        $("#jt").text(snapshot.child(player2).val().T)

        $("#cw").text(snapshot.child(player2).val().W)
        $("#cl").text(snapshot.child(player2).val().L)
        $("#ct").text(snapshot.child(player2).val().T)

    })
}