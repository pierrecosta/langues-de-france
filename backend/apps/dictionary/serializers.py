from rest_framework import serializers

from apps.dictionary.models import Word


class WordSerializer(serializers.ModelSerializer[Word]):
    class Meta:
        model = Word
        fields = [
            "slug", "french", "local", "pronunciation", "category", "subcategory",
            "variants", "origin", "example", "example_translation", "cultural_notes",
            "false_friend", "sensitivity_level", "historical_status", "source_url",
        ]  # fmt: skip
        read_only_fields = fields
