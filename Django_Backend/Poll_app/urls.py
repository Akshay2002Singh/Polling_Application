from django.contrib import admin
from django.urls import path
from Poll_app import views

urlpatterns = [
    path('',views.home),
    path('apis/signin', views.signin),
    path('apis/get_token', views.get_token),
    path('apis/signout', views.signout),
    path('apis/signup', views.signup),
    path('apis/create_question', views.create_question),
    path('apis/get_questions', views.get_questions),
    path('apis/submit_response', views.submit_response),
    path('apis/my_questions', views.my_questions),
]
