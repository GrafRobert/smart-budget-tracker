from rest_framework import serializers
from .models import Category, Transaction
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class CategorysSrializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):

    category = CategorysSrializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Transaction

        fields = ['id', 'amount', 'description', 'date', 'category', 'category_id']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data('email', ''),
            password=make_password(validated_data['password'])
        )
        return user