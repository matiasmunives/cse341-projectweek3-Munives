/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

const router = require ('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello World');

});

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));


module.exports = router;
