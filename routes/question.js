const router=require('express').Router();
const questionController=require('../controller/question');

router.post('/addQuestion/:lessonId',questionController.addQuestion);

router.post('/updateQuestion/:questionId',questionController.updateQuestion);

router.get('/:lessonId',questionController.getQuestion);

router.delete('/deleteQuestion/:questionId',questionController.deleteQuestion);

router.post('/answers',questionController.chooseAnswer)

module.exports=router;