from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.models import User
from Poll_app.models import Question, Option, User_Response
from Poll_app.serializers import Question_serializer, Option_serializer
from Poll_app.tasks import make_poll_inactive


# Create your views here.
# view for home page 
@api_view(['GET',])
def home(request):
    return Response({'status ' : 'Server is Working'})

@api_view(['GET',])
def get_token(request):
    return Response({
        'status ' : 'Server is Working',
        'cookies' : request.COOKIES
    })

# view to login user
@api_view(['POST'])
def signin(request):
    # dummy_data = {
    # "username" : "elite",
    # "password" : "7905363750"
    # }
    data = request.data
    user = authenticate(username = data['username'], password = data['password'])
    if user is not None:
        login(request,user)
        return Response({"status" : "Login successfull"})
    else:
        return Response({"status" : "Login unsuccessfull", "error" : "Invalid Username or password"})


# view to create user 
@api_view(['POST'])
def signup(request):
    # dummy_data = {
    # "name" : "Akshay Singh",
    # "email" : "temp@gmail.com",
    # "username" : "elite",
    # "password" : "7905363750"
    # }
    data = request.data
    try:
        user = User.objects.create_user(data["username"],data["email"],data["password"])
        user.first_name = data["name"]
        user.save()
        return Response({"status" : "Signup successfull"})
    except Exception as e:
        print(e)
        return Response({"status" : "Signup unsuccessfull" , "error" : str(e) })


# view to logout user 
@api_view(['GET'])
def signout(request):
    logout(request)
    print(request.COOKIES)
    return Response({"status" : "Logout successfull"})


# functions for polling
@api_view(['POST'])
def create_question(request):
    # dummy_data = {
    # "question" : "This is my poll question",
    # "options" : ["option A","option B", "option C"]
    # }
    data = request.data
    if request.user.is_authenticated:
        # save Question
        try:
            question = Question.objects.get(question_creator=request.user ,question = data['question'])
            return Response({"status" : "Question not created successfully", "error" : "Question already created"})
        except Question.DoesNotExist:
            # no employee found
            question = Question(question_creator=request.user, question=data['question'])
            question.save()
            result = make_poll_inactive.apply_async(args=(question.id,),countdown=(60*60*24))
            print(result.ready())
            # save options
            for i in data["options"]:
                option = Option(question = question, option = i)
                option.save()
            return Response({"status" : "Question created successfully"})
    else:
        return Response({"status" : "Question not created successfully", "error" : "User not authenticated"})
    

@api_view(['GET'])
def get_questions(request):
    if request.user.is_authenticated:
        # get all active question that are not created by current user 
        all_question_queryset = Question.objects.exclude(question_creator = request.user)
        answered_question_list = []
        unanswered_question_list = []
        for ques in all_question_queryset:
            if ques.active:
                q_serializer = Question_serializer(ques)
                current_question = q_serializer.data
                # get options corresponding to current question 
                options_queryset = Option.objects.filter(question = current_question['q_id'])
                options_list = []
                for opt in options_queryset:
                    o_serializer = Option_serializer(opt)
                    options_list.append(o_serializer.data)
                current_question["options"] = options_list
                try:
                    user_ans = User_Response.objects.get(user=request.user, question=current_question['q_id'])
                    current_question['user_answer'] = user_ans.options.id
                    answered_question_list.append(current_question)
                except Exception as e:
                    # print(e)
                    unanswered_question_list.append(current_question)

        return Response({"status" : "Question got successfully", "answered_question" : answered_question_list, "unanswered_question" : unanswered_question_list})
    else:
        return Response({"status" : "Question not got successfully", "error" : "User not authenticated"})


@api_view(['POST'])
def submit_response(request):
    # dummy_data = {
    # "q_id" : "12",
    # "o_id" : "2"
    # }
    data = request.data
    if request.user.is_authenticated:
        try:
            response = User_Response.objects.get(user=request.user, question=Question.objects.get(id=data["q_id"]))
            return Response({"status" : "Response not submitted successfully", "error" : "Response already exist"})
        except:
            response = User_Response(user=request.user, question=Question.objects.get(id=data["q_id"]), options=Option.objects.get(id = data["o_id"]))
            response.save()
            return Response({"status" : "Question got successfully"})
    else:
        return Response({"status" : "Response not submitted successfully", "error" : "User not authenticated"})


@api_view(["GET"])
def my_questions(request):
    if request.user.is_authenticated:
        questions = Question.objects.filter(question_creator = request.user).order_by("upload_date_time")
        questions_list = []
        for ques in questions:
            q_serializer = Question_serializer(ques)
            current_question = q_serializer.data
            # get options corresponding to current question 
            options_queryset = Option.objects.filter(question = current_question["q_id"])
            options_list = []
            total_poll = 0
            max_option_poll = 0
            for opt in options_queryset:
                o_serializer = Option_serializer(opt)
                temp_opt = o_serializer.data
                poll_count = User_Response.objects.filter(question = current_question["q_id"], options = temp_opt["o_id"]).count()
                temp_opt["poll_count"] = poll_count
                max_option_poll = max(max_option_poll,poll_count)
                total_poll += poll_count
                options_list.append(temp_opt)
            current_question["options"] = options_list
            current_question["total_poll"] = total_poll
            current_question["max_option_poll"] = max_option_poll
            questions_list.append(current_question)
        return Response({"status" : "Questions found", "data" : questions_list})
    else:
        return Response({"status" : "Questions not found", "error" : "User not authenticated"})
    