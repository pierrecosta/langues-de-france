from typing import Any

from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import generics

from apps.core.models import PublicationStatus, PublishableContent
from apps.territories.models import Territory


class PublishedQuerysetMixin:
    """Contenus publiés d'un territoire ; un brouillon ou un territoire inconnu donne 404."""

    model: type[PublishableContent]
    kwargs: dict[str, Any]

    def get_queryset(self) -> QuerySet[Any]:
        territory = get_object_or_404(Territory, slug=self.kwargs["territory_slug"])
        return self.model._default_manager.filter(
            territory=territory, status=PublicationStatus.PUBLISHED
        ).order_by("slug")


class PublishedListView(PublishedQuerysetMixin, generics.ListAPIView[Any]):
    pass


class PublishedDetailView(PublishedQuerysetMixin, generics.RetrieveAPIView[Any]):
    lookup_field = "slug"
