from django.contrib import admin
from Poll_app.models import Question, Option, User_Response

# Register your models here.
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(User_Response)
