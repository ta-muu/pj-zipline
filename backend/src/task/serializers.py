from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'due_date',
            'estimated_effort',
            'dependencies',
            'parent_task',
            'created_at',
            'updated_at',
        ]
