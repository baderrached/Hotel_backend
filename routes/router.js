const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
 const userMiddleware = require('../middleware/users.js');
 const fs=require('fs');
 const app = express();

 const axios = require("axios");
const { response } = require('express');
const { json } = require('body-parser');
app.use('/api', router);



 const head = {
	"Content-Type": "application/json",
};




// login 
router.post('/login', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/users?filter=username,eq,${req.body.username}&filter=password,eq,${req.body.password}`).then(
  
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
          msg: 'Logged in!',
          token,
          user: resp.data.records[0]
          
        });
         }else{
          return res.status(401).send({
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
  
    
  axios.get(`http://localhost/api.php/records/rooms`).then(
  
        (resp) => {
          
         if(resp.data.records.length>0){
         
                   return res.status(200).send({
      
          room: resp.data.records
          
        });
         }else{
          return res.status(401).send({
                    msg: 'NO ROOM WITH THIS ID'
                  });
         }
                    
    }) 

  
  });



// room with filtre 

 router.get('/rooms', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/rooms?filter=type,eq,${req.body.type}&filter=nb_disponible,le,${req.body.nbre}`).then(
  
        (resp) => {
          
         if(resp.data.records.length>0){
         
                   return res.status(200).send({
      
          room: resp.data.records
          
        });
         }else{
          return res.status(401).send({
                    msg: 'NO ROOM Disponible'
                  });
         }
                    
    }) 

  
  });



 // All hotel

 router.get('/hotels', (req, res, next) => {
  
    
  axios.get(`http://localhost/api.php/records/hotels`).then(
  
        (resp) => {
          
         if(resp.data.records.length>0){
         
                   return res.status(200).send({
      
          room: resp.data.records
          
        });
         }else{
          return res.status(401).send({
                    msg: 'No hotel found'
                  });
         }
                    
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
      axios.put(`http://localhost/api.php/records/users/${id}`,body, head).then(
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

 
     
  
module.exports = router;