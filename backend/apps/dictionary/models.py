from django.db import models

from apps.core.models import PublishableContent


class Word(PublishableContent):
    french = models.CharField(max_length=255, blank=True)
    local = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=120, blank=True)
    subcategory = models.CharField(max_length=120, blank=True)
    variants = models.JSONField(default=dict, blank=True)
    example = models.TextField(blank=True)
    example_translation = models.TextField(blank=True)
    cultural_notes = models.TextField(blank=True)
    false_friend = models.TextField(blank=True)
    historical_status = models.CharField(max_length=64, blank=True)

    class Meta:
        ordering = ["slug"]
        constraints = [
            models.UniqueConstraint(fields=["territory", "slug"], name="word_unique_territory_slug")
        ]

    def __str__(self) -> str:
        return self.local or self.slug
