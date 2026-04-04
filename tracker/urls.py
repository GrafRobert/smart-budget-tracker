from django.urls import path
from . import views

urlpatterns = [

    path('categories/', views.category_list, name='category-list'),
    

    path('transactions/', views.transaction_list, name='transaction-list'),
    

    path('transactions/<int:pk>/', views.transaction_detail, name='transaction-detail'),
]