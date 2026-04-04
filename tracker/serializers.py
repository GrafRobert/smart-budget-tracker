from rest_framework import serializers
from .models import Category, Transaction

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

