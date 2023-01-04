const { Router } = require('express');
const {createActivity} = require('./controllers.js');
const {Country,Activities} = require('../../db.js');
const { getAllActivities,deleteActivity,putUpdate } = require('./controllers.js');

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, dificulty, duration, season, countries} = req.body;
    const newActivity = await createActivity(name, dificulty, duration, season, countries);
    res.status(200).send('succesfully add');
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/', async (req,res) =>{
  try {
    const activities = await getAllActivities();
    res.status(200).send(activities);
  } catch (error) {
    res.status(400).send(error);
  }
})

router.delete('/:id',async (req,res) =>{
  try {
    const {id} = req.params;
    const response = await deleteActivity(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
})

router.put('/:id',async (req,res)=>{
  try {
    const {id} =req.params;
    const {name,dificulty,duration,season,countries} = req.body;
    const response = await putUpdate(req.body,id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
    
  }
})

module.exports = router;