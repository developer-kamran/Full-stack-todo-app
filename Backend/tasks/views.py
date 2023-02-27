from rest_framework import viewsets
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
# import json

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TaskViewSet(viewsets.ModelViewSet):
    # queryset = Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]  

    def get_queryset(self):
        return self.request.user.tasks.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@api_view(['POST'])
def registerView(request):
    # data= json.loads(request.body)
    serializer= RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)  

    return Response("Registeration Failed")  


