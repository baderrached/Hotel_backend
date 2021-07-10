const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();
const date = require('date-and-time');
const axios = require("axios");
const { json } = require('body-parser');
var now = new Date();

today=date.format(now, 'DD-MM-YYYY'); 


app.use('/api', router);



 const head = {
	"Content-Type": "application/json",
};



router.get('/extra',async(req,res)=>{
  const list=await axios.get('http://localhost/api.php/records/extra_list')
  res.send(list.data.records)
})
router.post('/CreateOrder',async(req,res)=>{
  console.log(req.body);
  res.send(req.body)
})
// login 
router.post('/login', (req, res, next) => {
  
    console.log(req.body);
  axios.get(`http://localhost/api.php/records/clients?filter=username,eq,${req.body.username}&filter=password,eq,${req.body.password}`).then(
  
        (resp) => {
          
         if(resp.data.records.length>0){
          const token = jwt.sign({
            username: resp.data.records[0].username,
            userId: resp.data.records[0].id
          },
          'SECRETKEY', {
            expiresIn: '7d'
          }
        );
                   return res.status(200).send({
                     "error":0,
          msg: 'Logged in!',
          token,
          user: resp.data.records[0]
          
        });
         }else{
          return res.status(200).send({
            "error":1,
                    msg: 'Username is incorrect!'
                  });
         }
                    
    }) 

  
  });









 // one room

 router.get('/room/:id', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/rooms?filter=id,eq,${req.params.id}`).then(
  
        (resp) => {
          
         if(resp.data.records.length>0){
         
                   return res.status(200).send({
      
          room: resp.data.records[0]
          
        });
         }else{
          return res.status(401).send({
                    msg: 'NO ROOM WITH THIS ID'
                  });
         }
                    
    }) 

  
  });




 // All room

 router.get('/rooms', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/rooms?join=hotels`).then(
  
        (resp) => {
          
  
         
                   return res.status(200).send(
      
          resp.data
        );
         
                    
    }) 

  
  });







 // All hotel

 router.get('/hotels', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/hotels`).then(
  
        (resp) => {
    
                   return res.status(200).send(
      
           resp.data
          
        );
         
                    
    }) 

  
  });


 // one user

 router.get('/user/:id', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/user?filter=id,eq,${req.params.id}`).then(
  
        (resp) => {
          
         if(resp.data.records.length>0){
         
                   return res.status(200).send({
      
          room: resp.data.records[0]
          
        });
         }else{
          return res.status(401).send({
                    msg: 'no user found'
                  });
         }
                    
    }) 

  
  });

  
  // paiement 
  router.post('/paiement', (req, res, next) => {
  

    axios.get(`http://localhost/api.php/records/payment?filter=card_number,eq,${req.body.card_number}`).then(
      (resp)=>{

            var object={
            "id_user":req.body.id_user,
            "card_number":req.body.card_number,
            "ex_date":req.body.ex_date,
            "cvv":req.body.cvv, 
            "room_id" :req.body.room_id,  
            "amount" :req.body.amount, 
            "from":req.body.from, 
            "to":req.body.to, 
            "nb":req.body.nb, 
            "nb_dispo" : req.body.nb_dispo

            

            
          }
            
    axios.post(`http://localhost/api.php/records/payment`,object,head).then(

      (resp)=>{
        
        axios.put(`http://localhost/api.php/records/rooms/${req.body.room_id}`,{
          "nb_disponible" : req.body.nb_dispo - req.body.nb ,
        }, head).then(
          (resp) => { 
            axios.get(`http://localhost/api.php/records/rooms?filter=id,eq,${req.body.room_id}`).then(
              (user)=>{
                console.log(user);
                res.send(user.data.records[0]);
                
              }
            )
  
  
      });
      
          
              }
            )


    
  }
    );
  })













// update user
    router.post("/update/users/:id",(req,res)=>{
      var id=req.params.id;
      var body=req.body
      axios.put(`http://localhost/api.php/records/clients/${id}`,body, head).then(
        (resp) => { 
          axios.get(`http://localhost/api.php/records/user?filter=id,eq,${id}`).then(
            (user)=>{
              console.log(user);
              res.send(user.data.records[0]);
            }
          )


    });
    })







  // register 
  router.post('/signup', (req, res, next) => {
  

    axios.get(`http://localhost/api.php/records/users?filter=username,eq,${req.body.username}`).then(
      (resp)=>{
        if(resp.data.records.length>0){
        return res.status(400).send({
          msg: 'user name already used '
        });
        }else{
            var object={
            "first_name":req.body.first_name,
            "last_name":req.body.last_name,
            "username":req.body.username,
            "password":req.body.password,
            "gender":req.body.gender,
            "cin":req.body.cin,
            "country":req.body.country,
            "passeport":req.body.passeport,
            "nb_reservation":req.body.nb_reservation

            
          }
          
                    
            axios.post(`http://localhost/api.php/records/users`,object,head).then(

              (resp)=>{
                return res.status(401).send({
                msg: 'Signup done'
                }); 
       
              })

            }
            
          }
            
            
            )});

const decrement_rooms=async(id,nb)=>{
const room=await axios.get(`http://localhost/api.php/records/rooms/${id}`)
const room_nb={
  nb_disponible:room.data.records.nb_disponible-nb
}
await axios.put(`http://localhost/api.php/records/rooms/${id}`)
return;
}
const increment_rooms=async(id,nb)=>{

  const room=await axios.get(`http://localhost/api.php/records/rooms/${id}`)
  const room_nb={
    nb_disponible:room.data.nb_disponible-nb
  }
  
 
   await axios.put(`http://localhost/api.php/records/rooms/${id}`,room_nb)
  return;
  }
const check_availabe=async ()=>{
const rooms=await axios.get('http://localhost/api.php/records/reservations')
rooms.data.records.map(async(room)=>{

if(room.to<today){
 
 await axios.delete(`http://localhost/api.php/records/reservations/${room.id}`)
 increment_rooms(room.room_id,1)
}
 
})

     }
     const fake_reserve=async()=>{
var rooms=await axios.get('http://localhost/api.php/records/rooms')
rooms=rooms.data.records
rooms.map(async(room)=>{
  var data={
    "user_id":1,
    "room_id":room.id,
    "from":today,
    "to": date.format(date.addDays(now, -1), 'DD-MM-YYYY'),
    "amount":30,
    "nb_nuit":2
  }
await axios.post('http://localhost/api.php/records/reservations',data)


})

     }
//check_availabe();
 //fake_reserve();
module.exports = router;