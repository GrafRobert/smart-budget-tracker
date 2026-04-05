from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView


from tracker.views import (
    RegisterView, 
    category_list, 
    transaction_list, 
    transaction_detail
)

urlpatterns = [
    path('admin/', admin.site.urls),
    

    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),


    path('api/categories/', category_list, name='category_list'),
    path('api/transactions/', transaction_list, name='transaction_list'),
    path('api/transactions/<int:pk>/', transaction_detail, name='transaction_detail'),
]