const express = require('express')
var sslcommerz = require("sslcommerz")
const cors = require('cors')
const bodyParser = require('body-parser')
var objectid = require('objectid')
var id = objectid()
const SSLCommerzPayment = require('sslcommerz')
require('dotenv').config()
const Contractor = require('contractor')
const port = 3030
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
const { MongoClient, ObjectID } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zlrt0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const UserInfoCollection = client.db("user-data-info").collection("user-data-store");
    const UserReviewCollection = client.db("user-review").collection("user-review-info");
    const UserOrderCollection = client.db("user-order").collection("user-order-info");
    const AdminCollection = client.db("addAdmin").collection("adminInfo");
    app.get("/allService", (req, res) => {
        UserInfoCollection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })

    app.post("/addService", (req, res) => {
      const addService = req.body;
      UserInfoCollection.insertOne(addService)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
    })
    app.post("/singleUserItem", (req, res) => {
        const email = req.body.email
        UserOrderCollection.find({email:email})
      .toArray((err, userItem) => {
          res.send(userItem)
      })
    })

    app.post("/userReview", (req, res) => {
        const review = req.body;
        UserReviewCollection.insertOne(review)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    app.post("/userOrderCollection", (req, res) => {
        const service = req.body;
        UserOrderCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    app.post("/addAdmin", (req, res) => {
        const addAdmin = req.body;
        AdminCollection.insertOne(addAdmin)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    app.get("/userOrder", (req, res) => {
        UserOrderCollection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })

    app.get("/allReview", (req, res) => {
        UserReviewCollection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })

        app.get("/totalOrder", (req, res) => {
            UserOrderCollection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
        })

        app.delete("/delete/:id" ,  (req, res) => {
       
            UserInfoCollection.deleteOne({_id: ObjectID(req.params.id)})
            .then((result) => {
                res.sed(deletedCount > 0)
            })
            
        })
    

      app.post("/allAdmin", (req, res) => {
          const email = req.body.email
        AdminCollection.find({email:email})
        .toArray((err, admin) => {
            res.send(admin.length > 0)
        })
      })

});

// module.exports=SSLCommerzPayment;
// app.use("/ssl-request", async (req, res, next) => {
//   const data = {
//     total_amount: 100,
//     currency: 'EUR',
//     tran_id: 'REF123',
//     success_url: `${process.env.ROOT}/ssl-payment-success`,
//     fail_url: `${process.env.ROOT}/ssl-payment-failure`,
//     cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
//     ipn_url:`${process.env.ROOT}/ssl-payment-ipn`,
//     shipping_method: 'Courier',
//     product_name: 'Computer.',
//     product_category: 'Electronic',
//     product_profile: 'general',
//     cus_name: 'Customer Name',
//     cus_email: 'cust@yahoo.com',
//     cus_add1: 'Dhaka',
//     cus_add2: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_state: 'Dhaka',
//     cus_postcode: '1000',
//     cus_country: 'Bangladesh',
//     cus_phone: '01711111111',
//     cus_fax: '01711111111',
//     ship_name: 'Customer Name',
//     ship_add1: 'Dhaka',
//     ship_add2: 'Dhaka',
//     ship_city: 'Dhaka',
//     ship_state: 'Dhaka',
//     ship_postcode: 1000,
//     ship_country: 'Bangladesh',
//     multi_card_name: 'mastercard',
//     value_a: 'ref001_A',
//     value_b: 'ref002_B',
//     value_c: 'ref003_C',
//     value_d: 'ref004_D'
// };
// const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD,true) //true for live default false for sandbox
// sslcommer.init(data).then(data => {
//   console.log(data);
//     //process the response that got from sslcommerz 
//     //https://developer.sslcommerz.com/doc/v4/#returned-parameters
//     if (data?.GatewayPageURL) {
//       return res.status(200).redirect(data?.GatewayPageURL)
//     }
//     else{
//       return res.status(400).json({
//         message: "ssl session was not successful"
//       })
//     }

// });

// })

// app.post("/ssl-payment-success", async (req, res) => {
//   return res.status(200).json({
//     data:req.body
//   })
// })
// app.post("/ssl-payment-failure", async (req, res) => {
//   return res.status(400).json({
//     data:req.body
//   })
// })
// app.post("/ssl-payment-cancel", async (req, res) => {
//   return res.status(200).json({
//     data:req.body
//   })
// })
// app.post("/ssl-payment-ipn", async (req, res) => {
//   return res.status(200).json({
//     data:req.body
//   })
// })




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)