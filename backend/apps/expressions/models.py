from django.db import models

from apps.core.models import PublishableContent


class Expression(PublishableContent):
    local_expression = models.CharField(max_length=500, blank=True)
    literal_translation = models.CharField(max_length=500, blank=True)
    meaning = models.TextField(blank=True)
    french_equivalent = models.CharField(max_length=500, blank=True)
    usage_type = models.CharField(max_length=64, blank=True)

    class Meta:
        ordering = ["slug"]
        constraints = [
            models.UniqueConstraint(
                fields=["territory", "slug"], name="expression_unique_territory_slug"
            )
        ]

    def __str__(self) -> str:
        return self.local_expression or self.slug
