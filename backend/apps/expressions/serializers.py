from rest_framework import serializers

from apps.expressions.models import Expression


class ExpressionSerializer(serializers.ModelSerializer[Expression]):
    class Meta:
        model = Expression
        fields = [
            "slug", "local_expression", "pronunciation", "literal_translation", "meaning",
            "french_equivalent", "origin", "sensitivity_level", "usage_type", "source_url",
        ]  # fmt: skip
        read_only_fields = fields
