from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    task_path = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'parent_task', 'due_date', 'estimated_effort', 'dependencies', 'created_at', 'updated_at', 'task_path')

    def get_task_path(self, obj):
        path_components = [obj.title]
        current_task = obj
        while current_task.parent_task:
            current_task = current_task.parent_task
            path_components.insert(0, current_task.title)
        return '/'.join(path_components)
