from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Transaction
from .serializers import CategorysSrializer, TransactionSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permissions_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def category_list(request):

    categories = Category.objects.all()
    serializer = CategorysSrializer(categories, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET','POST'])
def transaction_list(request):

    if request.method == 'GET':

        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':

        serializer = TransactionSerializer(data = request.data)
        if serializer.is_valid():

            from django.contrib.auth.models import User
            first_user = User.objects.first()

            serializer.save(user = first_user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def transaction_detail(request, pk):
    
    try:
        transaction = Transaction.objects.get(pk=pk)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    transaction.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
