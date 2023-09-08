const { Router } = require('express');
const dbController = require('../controllers/dbController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.post('/change-pic', checkUser, dbController.change_pic);
router.get('/', checkUser, requireAuth, dbController.renderHomePage);
router.get('/userprofile/username/:username', dbController.viewUserProfile);


module.exports = router