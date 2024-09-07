from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    # Remove or comment out this line:
    # product = models.ForeignKey(Product, related_name='categories', on_delete=models.CASCADE)

class Specification(models.Model):
    category = models.ForeignKey(Category, related_name='specifications', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    value = models.TextField()

    def __str__(self):
        return f"{self.category.product.name} - {self.category.name} - {self.label}"

class Product(models.Model):
    # Define your Product model fields here
    name = models.CharField(max_length=100)
    # Add other fields as needed
    categories = models.ManyToManyField(Category, related_name='products')

    def __str__(self):
        return self.name
