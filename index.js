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
  
  
  var name = prompt("adiniz?")
  
  $("#btn").on('click',function(event){
    event.preventDefault()
    var text = $("#metn").val().trim()
     var p =$("<div>")
     p.text(text)
     p = Object.values(p)
    //  $("#write").append(name + ":" + text)
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
        console.log(employee)
    }

    console.log(employee.name + employee.text)
    $("#write").append("<div>" + employee.name  +":"+employee.text+ "</div>")

  })
  
//   db.ref().on('value',function(snapshot){
//     console.log(snapshot.val())
//     var human = snapshot.val()
//     // human = Object.values(human)
//     console.log(human)
//     $("#write").append("<div>" + human.name  +":"+human.text+ "</div>")
//   })