const  express = require('express');
const mongoose = require('mongoose');
const Customer  = require('./db');
let app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let port = process.env.port || 8080;

function update_a_field(customer_id, field_name, field_data, res){
    Customer.findOne({customerID: customer_id}, (err, customer)=>{
        if (!customer){
            res.status(404)
                .send('Not found');
        }
        else{
            customer[field_name] = field_data;
            customer.save((err) => {
                if (!err){
                    console.log(customer);
                    res.sendStatus(200);
                }
                else {
                    console.log("Error: can't save current customer");
                }
            })

        }
    });
}

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/api/customer/:id', function(req, res){
    const customer_id = req.params.id;
    Customer.findOne({customerID: customer_id}, (err, customer)=>{
        if (!customer){
            res.status(404)
                .send('Not found');
        }
        else{
            res.send(customer);
        }
    });
});

app.post('/api/customer', function(req, res){
    let customer_data = req.body;
    let doses_string = customer_data["doses"];
    customer_data["doses"] = doses_string.split(",");
    Customer.create(customer_data,()=>res.redirect('/'));
});

app.post('/api/customer/genomeKeys', function(req, res){
    const customer_id = req.body.customerID;
    const genome_key = req.body.genomeKeys;
    if (!genome_key){
        res.status(404)
            .send('Not found');
    }
    else{
        update_a_field(customer_id, "genomeKeys", genome_key, res);
    }
});

app.post('/api/customer/nutrition', function(req, res){
    const customer_id = req.body.customerID;
    const nutrition = req.body.nutritionCondition;
    if (!nutrition){
        res.status(404)
            .send('Not found');
    }
    else{
        update_a_field(customer_id, "nutritionCondition", nutrition, res);
    }
});

app.post('/api/customer/hydration', function(req, res){
    const customer_id = req.body.customerID;
    const hydration = req.body.hydrationCondition;
    if (!hydration){
        res.status(404)
            .send('Not found');
    }
    else{
        update_a_field(customer_id, "hydrationCondition", hydration, res);
    }
});

app.post('/api/customer/virtualLocation', function(req, res){
    const customer_id = req.body.customerID;
    const virtualLocation = req.body.currentVirtualLocation;
    if (!virtualLocation){
        res.status(404)
            .send('Not found');
    }
    else{
        update_a_field(customer_id, "currentVirtualLocation", virtualLocation, res);
    }
});

app.post('/api/customer/currentBalance', function(req, res){
    const customer_id = req.body.customerID;
    const currentBalance = req.body.currentBalance;
    if (!currentBalance){
        res.status(404)
            .send('Not found');
    }
    else{
        update_a_field(customer_id, "currentBalance", currentBalance, res);
    }
});

app.post('/api/customer/timeSlots', function(req, res){
    const customer_id = req.body.customerID;
    const timeSlots = req.body.timeSlots;
    if (!timeSlots){
        res.status(404)
            .send('Not found');
    }
    else{
        update_a_field(customer_id, "timeSlots", timeSlots, res);
    }
});



app.listen(port, function() {
	console.log('FuturaWangguan is running on http://localhost:' + port);
});
