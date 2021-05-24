from django.urls import path
from . import views


urlpatterns = [
    path('gts/', views.gts, name='gts'),
]


