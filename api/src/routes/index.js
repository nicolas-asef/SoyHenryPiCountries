const { Router } = require('express');
const countriesRoutes = require ('./countries')
const activitiesRoutes = require ('./activity')


const router = Router();

router.use('/countries', countriesRoutes)
router.use('/activities', activitiesRoutes)


module.exports = router;

