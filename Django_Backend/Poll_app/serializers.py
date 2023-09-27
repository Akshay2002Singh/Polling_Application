from rest_framework import serializers
from Poll_app.models import Question, Option

class Question_serializer(serializers.ModelSerializer):
    # change id field name of question to q_id 
    q_id = serializers.IntegerField(source='id')
    class Meta:
        model = Question
        fields = ['q_id','question']


class Option_serializer(serializers.ModelSerializer):
    # change id field name of option to o_id
    o_id = serializers.IntegerField(source='id')
    class Meta:
        model = Option
        fields = ['o_id','option']