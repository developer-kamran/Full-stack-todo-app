from django.db import models
from django.contrib.auth.models import  User

class Task(models.Model):
    owner= models.ForeignKey(User,on_delete=models.CASCADE ,null= True,related_name='tasks')
    title= models.CharField(max_length=200)
    completed=models.BooleanField(default=False,blank=True,null=True)

    def __str__(self):
        return self.title