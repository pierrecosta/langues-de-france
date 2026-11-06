from django.db import models


class Territory(models.Model):
    slug = models.SlugField(max_length=80, unique=True)
    name = models.CharField(max_length=120)

    class Meta:
        ordering = ["slug"]

    def __str__(self) -> str:
        return self.name
