from django.contrib import admin
from django.urls import path, include
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('tracker.urls')),

    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),
]
