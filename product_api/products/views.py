from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# Create your views here.

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def info(self, request, slug=None):
        product = self.get_object()
        serializer = self.get_serializer(product)
        return Response(serializer.data)
