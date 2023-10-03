# Create your tasks here
from Poll_app.models import Question
from celery import shared_task


@shared_task(naem="make_question_inactive")
def make_poll_inactive(question_id):
    question = Question.objects.get(id=question_id)
    print(question)
    question.active = False
    question.save()
    return (f"Question with question id={question_id} is inactive now")
