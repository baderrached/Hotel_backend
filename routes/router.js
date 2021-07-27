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
  req.body.orders=JSON.stringify(req.body.orders)
  const order=await axios.post(`http://localhost/api.php/records/orders`,req.body)
  
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

// register 
router.post('/register', (req, res, next) => {

console.log(req.query);
  axios.get(`http://localhost/api.php/records/clients?filter=username,eq,${req.query.username}`).then(
    (resp)=>{
      if(resp.data.records.length>0){
      return res.status(400).send({
        msg: 'user name already used '
      });
      }else{
          var object={
          "username":req.query.username,
          "password":req.query.password,
          "passeport_cin":req.query.passeport,

          
        }
       
        
                  
          axios.post(`http://localhost/api.php/records/clients`,object,head).then(

            (resp)=>{
              return res.status(200).send({
              msg: 'Signup done'
              }); 
     
            })

          }
          
        }
          
          
          )});







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
          axios.get(`http://localhost/api.php/records/clients?filter=id,eq,${id}`).then(
            (user)=>{
            
              res.send(user.data.records[0]);
            }
          )


    });
    })







  

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


     router.post('/Reserve',async(req,res)=>{
       //date2=new Date('2021-07-31T19:34:17.552Z').toLocaleDateString()
       //date1=new Date("Sun Jul 18 2021 20:34:17 GMT+0100").toLocaleDateString()
      // toLocaleDateString
      //stime = stime.replace(/(..)\/(..)\/(.*)/, '$2/$1/$3');
let date1=new Date(req.body.from).toLocaleDateString()
let date2=new Date(req.body.to).toLocaleDateString()
date1 = date1.replace(/(..)\/(..)\/(.*)/, '$2/$1/$3');

date2 = date2.replace(/(..)\/(..)\/(.*)/, '$2/$1/$3');

date1=new Date(date1)
date2=new Date(date2)
var Difference_In_Time = date2.getTime() - date1.getTime();
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
console.log({Difference_In_Days});

console.log(req.body);
      let Card={
        "id_user":req.body.username,
        "card_number":req.body.number,
        "ex_date":req.body.exp,
        "cvv":req.body.cvv
      }
      const pay=await axios.post(`http://localhost/api.php/records/payment`,Card)
      
      let reserver={
        "user_id":req.body.username,
        "room_id":req.body.date_room.id,
        "from":new Date(req.body.from).toLocaleDateString(),
        "to":new Date(req.body.to).toLocaleDateString(),
        "amount":req.body.date_room.price*Difference_In_Days,
        "status":0,
        "nb_nuit":Difference_In_Days
      }
      console.log(reserver);
      const ord= axios.post(`http://localhost/api.php/records/reservations`,reserver).catch(err=>{
        console.log(err.message);
      })

       res.send('yes')
     })
     router.get('/findRoom/:id',async(req,res)=>{
       let room=await axios.get(`http://localhost/api.php/records/reservations?filter=user_id,eq,${req.params.id}&order=status,desc&join=rooms`)
       if(room.data.records.length==0){
         return res.send({
           "rooms":0,
           "allrooms":[],
           "last_room":[]
         })
       }
       return res.send({
        "rooms":room.data.records.length,
        "allrooms":room.data.records,

        "last_room":room.data.records[0]
      })
     })
router.get('/room_requests/:id', async(req, res, next) => {
  try {
const room=await axios.get(`http://localhost/api.php/records/extra_demande?filter=user_id,eq,${req.params.id}&order=id,desc&size=1`)
if(room.data.records.length==0){
  
  return res.send({
    "available":true
  })
}
else{
  return res.send({
    "available":room.data.records[0].status==0?false:true
  })
}
  } catch (error) {
    return res.send({
      "available":true
    })
  }

})
router.post('/room_requests/:id',async (req, res, next) => {
  // console.log(req.params)
  try {
let user_room=await axios.get(`http://localhost/api.php/records/reservations?filter=user_id,eq,${req.params.id}&filter=status,eq,1&order=id,desc&size=1`)
console.log(user_room.data.records)  
await axios.post(`http://localhost/api.php/records/extra_demande`,{
      "user_id":req.params.id,
      "room_id":user_room.data.records[0].room_id,
      "status":0
    })
    return res.send({
      "message":`Room service on it's way to your room : ${user_room.data.records[0].room_id}`
    })

  } catch (error) {
    console.log(error.message);
    return res.send({
      "message":"please check in or Reserve a room first"
    })
  }
})
router.get('/spa_restau',async(req,res)=>{
const result=await axios.get('http://localhost/api.php/records/spa_restau')
res.send(result.data.records)
})
router.post('/spa_restau',async(req,res)=>{

  const result=await axios.post('http://localhost/api.php/records/spa_restau_reservation',req.body)
  res.send(200)
  })

module.exports = router;