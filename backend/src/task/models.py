from django.db import models

class Task(models.Model):
    """
    Represents a task in the ToDo application.
    """
    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
        ('hold', 'On Hold'),
        ('waiting', 'Waiting'),
    ]

    title = models.CharField(max_length=255, help_text="The title of the task.")
    description = models.TextField(blank=True, null=True, help_text="A detailed description of the task.")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='todo',
    )
    parent_task = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='sub_tasks',
        verbose_name='親タスク'
    )
    due_date = models.DateField(blank=True, null=True, help_text="The due date for the task.")
    estimated_effort = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Estimated effort in hours."
    )
    # For task dependencies
    dependencies = models.ManyToManyField(
        'self',
        symmetrical=False,
        blank=True,
        help_text="Tasks that this task depends on."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    