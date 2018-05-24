var baseDir     =    process.cwd()
  , express     =    require('express')
  , app         =    express()
  , validate    =    require('express-validation')
  , bodyParser  =    require('body-parser')
  , validator   =    require(baseDir+'/validators/schemas');

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Body validation
app.post('/validateRequestBody',validate(validator.bodyValidation),function(req,res){
    res.status(200).json({
        status:'success',
        data:req.body
    })
});

//Header validation
app.get('/validateRequestHeader',validate(validator.headerValidation),function(req,res){
    res.status(200).json({
        status:'success',
        data:req.headers['accesstoken']
    })
});

//Query params validation
app.get('/validateQueryParams',validate(validator.queryParamsValidation),function(req,res){
    res.status(200).json({
        status:'success',
        data:req.query
    })
})

// error handler
app.use(function (err, req, res, next) {
    // specific for express-validation errors
    if (err instanceof validate.ValidationError) {
        error = {
            code:9999,
            status:'failure',
            errors:err.errors
        }
        return res.status(err.status).json(error);
    }
    // other type of errors, it *might* also be a Runtime Error
    // example handling
    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).send(err.stack);
    } else {
      return res.status(500);
    }
});

app.listen(2000,function(){
    console.log('Validation service is in port 2000');
});