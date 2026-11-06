from django.db import models
from django.utils import timezone


class PublicationStatus(models.TextChoices):
    DRAFT = "draft", "Brouillon"
    PUBLISHED = "published", "Publié"


class PublishableContent(models.Model):
    """Contenu éditorial rattaché à un territoire, avec cycle brouillon/publié."""

    territory = models.ForeignKey("territories.Territory", on_delete=models.PROTECT)
    slug = models.SlugField(max_length=160)
    pronunciation = models.CharField(max_length=255, blank=True)
    origin = models.CharField(max_length=255, blank=True)
    sensitivity_level = models.CharField(max_length=64, blank=True)
    source_url = models.URLField(max_length=500, blank=True)
    status = models.CharField(
        max_length=16, choices=PublicationStatus.choices, default=PublicationStatus.DRAFT
    )
    published_at = models.DateTimeField(null=True, blank=True)
    unpublish_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def publish(self) -> None:
        self.status = PublicationStatus.PUBLISHED
        self.published_at = timezone.now()
        self.save(update_fields=["status", "published_at", "updated_at"])

    def unpublish(self, reason: str) -> None:
        if not reason.strip():
            raise ValueError("Un motif est obligatoire pour dépublier.")
        self.status = PublicationStatus.DRAFT
        self.unpublish_reason = reason.strip()
        self.save(update_fields=["status", "unpublish_reason", "updated_at"])
