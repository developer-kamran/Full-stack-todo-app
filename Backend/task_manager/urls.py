from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView  
from tasks.views import  *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls') ),
    path('api/register/',registerView,name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/', include('tasks.urls')),
    path('',TemplateView.as_view(template_name='index.html')),
    path('login',TemplateView.as_view(template_name='index.html')),
    path('register',TemplateView.as_view(template_name='index.html')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
