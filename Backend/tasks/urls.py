from django.urls import path,include
from rest_framework.routers import DefaultRouter
from tasks import views
from .models import *

router=DefaultRouter()

router.register(r'tasks',views.TaskViewSet,basename= Task)

urlpatterns=[
    path('',include(router.urls))
]