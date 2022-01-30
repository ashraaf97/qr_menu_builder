from rest_framework import generics
from . import models, serializers, permissions


class PlaceList(generics.ListCreateAPIView):
    serializer_class = serializers.PlaceSerializer

    def get_queryset(self):
        return models.Place.objects.filter(owner_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PlaceDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsOwnerOrReadOnly]
    serializer_class = serializers.PlaceDetailSerializer
    queryset = models.Place.objects.all()


class CategoryList(generics.CreateAPIView):
    permission_classes = [permissions.PlaceOwnerOrReadOnly]
    serializer_class = serializers.CategorySerializer


class CategoryDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = [permissions.PlaceOwnerOrReadOnly]
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


class MenuItemList(generics.CreateAPIView):
    permission_classes = [permissions.PlaceOwnerOrReadOnly]
    serializer_class = serializers.MenuItemSerializer


class MenuItemDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = [permissions.PlaceOwnerOrReadOnly]
    serializer_class = serializers.MenuItemSerializer
    queryset = models.MenuItem.objects.all()
