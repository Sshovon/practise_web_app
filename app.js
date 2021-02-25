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
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);
    //console.log(result);
    result
        .then(data => {
            response.json({ data: data });
         })
        .catch(err => console.log(err));
})

app.get('/getAll',(request,response)=>{
    console.log('in get all')
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then(data => {
            //console.log(typeof(response.json({ data: data })));
            response.json({ data: data })
        })
    .catch(err => console.log(err));
        
});

app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowByID(id);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));

})

app.patch('/update', (request, response) => {
    const { id, name } = request.body;  
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameByID(id , name);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});


app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByName(name);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
    

})

app.listen(process.env.PORT , ()=>{
    console.log('app is running');
    
});

