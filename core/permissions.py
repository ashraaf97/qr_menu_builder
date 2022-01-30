import json
from rest_framework import permissions
from . import models


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class PlaceOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user

    def has_permission(self, request, view):
        try:
            if request.method == "POST":
                # For create action
                data = json.loads(request.body)
                models.Place.objects.get(pk=data["place"], owner_id=request.user.id)
                return True
        except:
            return False
