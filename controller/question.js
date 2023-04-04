const Question=require('../models/question');
const Answer=require('../models/answer');
const user_answer=require('../models/user_answer')

exports.addQuestion=(req,res,next)=>{
    const text=req.body.text;
    const rightAnswer=req.boyd.rightAnswer;
    const answers=req.body.answers;
    let ourQuestion;

    Question.create({
        text:text
    })
    .then(question=>{
        ourQuestion=question;
        answers.forEach(element => {
            Answer.create({
                content:element,
                questionId:question.id
            })
        });
        return Answer.create({
            content:rightAnswer,
            questionId:question.id
        })
    })
    .then(answer=>{
        ourQuestion.rightAnswer=answer.id;
        return ourQuestion.save();
    })
    .then(()=>{
        return res.status(200).json({message:'Question has been created'});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}

exports.updateQuestion=(req,res,next)=>{
    const questionId=req.params.questionId;
    const text=req.body.text;
    const rightAnswer=req.boyd.rightAnswer;
    const answers=req.boyd.answers;
    let ourQuestion;

    Question.findOne({where:{id:questionId}})
    .then(question=>{
        if(!question){
            const error=new Error('this question does not exists');
            error.statusCode=422;
            throw error;
        }
        ourQuestion=question;
        question.text=text;
        return Answer.findAll({where:{questionId:questionId}})
    })
    .then(answer=>{
        answer.forEach(ele=>{
            ele.destroy()
        })
        answers.forEach(ele=>{
            Answer.create({
                content:ele,
                questionId:questionId
            })
        })
        return answer.create({
            content:rightAnswer,
            questionId:questionId
        })
    })
    .then(answer=>{
        ourQuestion.rightAnswer=answer.id;
        return ourQuestion.save();
    })
    .then(()=>{
        return res.status(200).json({message:'question has been updated'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}

exports.deleteQuestion=(req,res,next)=>{
    const questionId=req.params.questionId;
    Question.findOne({where:{id:questionId}})
    .then(question=>{
        if(!question){
            const error=new Error('this question is not found')
            error.statusCode=422;
            throw error;
        }
        return question.destroy();
    })
    .then(()=>{
        return res.status(200).json({message:'question has been deleted'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.getQuestion=(req,res,next)=>{
    const lessonId=req.params.lessonId;

    Question.findAll({where:{lessonId:lessonId},include:[Answer]})
    .then(questions=>{
        if(!questions){
            questions='you do not have any question for this lesson';
        }
        return res.status(200).json({questions:questions})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
exports.chooseAnswer=(req,res,next)=>{
    const answerId=req.body.answerId;
    
    user_answer.create({
        answerId:answerId,
        userId:req.userId
    })
    .then(()=>{
        return res.status(200).json({message:'done'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

