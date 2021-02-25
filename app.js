const express= require('express');
const app = express();
const cors= require('cors');
const dotenv = require('dotenv');   
const dbService = require('./dbService');
const { response, request } = require('express');


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.post('/insert', (request,response)=>{
    console.log('in insert')
    console.log(request.body);
})

app.get('/getAll',(request,response)=>{
    console.log('in get all')
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
    .then(data =>response.json({data : data}))
    .catch(err => console.log(err));
        
});


app.listen(process.env.PORT , ()=>{
    console.log('app is running');
});
