from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# make email unique in user model
User._meta.get_field('email')._unique = True

# Create your models here.
# model to store Questions, there creator and active status
class Question(models.Model):
    question_creator = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    question = models.TextField(unique=True)
    upload_date_time = models.DateTimeField(default= timezone.now())
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.question_creator} | {self.question}'

# model to store options corresponding to Questions 
class Option(models.Model):
    question = models.ForeignKey(Question, null=False, on_delete=models.CASCADE)
    option = models.CharField(max_length=200)
    
    def __str__(self):
        return f'{self.question.question[:15]} | {self.option}'

# model to store responses given by user 
class User_Response(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, null=False, on_delete=models.CASCADE)
    options = models.ForeignKey(Option, null= False, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} | {self.question.question[:15]} | {self.options.option}'

