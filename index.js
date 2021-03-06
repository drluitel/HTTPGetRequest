 const Joi = require('joi');
var express=require('express');
const app = express();
app.use(express.json());
const courses = [
            {id:1, name: 'course1'},
            {id:2, name: 'course2'},
            {id:3, name: 'course3'}
];

app.get('/',function(req, res){  //     route is given
   res.send('Hello World!!!!');

});

app.get('/api/courses', function(req,res){
  res.send(courses);

});


app.post('/api/courses', (req,res)=>{

         const {error}= validationCourse(req.body);
         if(error){
            res.status(400).send(error.details[0].message);
            return;  
         }
    const course = {
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
  
  });


app.put('/api/courses/:id', (req,res) =>{
    // Look of the course
    // if not exist , return 404
    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The given id courses is not avilable.');

     const {error} = validationCourse(req.body);
    // if invalid, return 400-Bad request
    if(error){  
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update the course 
     course.name= req.body.name;
    // return the update course to client
     res.send(course);
    
});

function validationCourse(course){
    // if exist than validation 
    const schema = {
        name:Joi.string().min(3).required()
    };
   return Joi.validate(course,schema);// input validation

}

app.get('/api/courses/:id', (req, res) =>{

    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The given id courses is not avilable.');
    res.send(course);
  }); 


// PORT
//var port = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log(`listening on the port ${3000}......`);

});

