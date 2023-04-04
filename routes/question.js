const router=require('express').Router();
const questionController=require('../controller/question');

router.post('/:lessonId',questionController.addQuestion);

router.post('/updateQustion/:questionId',questionController.updateQuestion);

router.get('/:lessonId',questionController.getQuestion);

router.delete('/deleteQuestion/:questionId',questionController.deleteQuestion);

router.post('/answer/:questionId',questionController.chooseAnswer)

module.exports=router;