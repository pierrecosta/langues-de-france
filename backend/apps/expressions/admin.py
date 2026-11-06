from django.contrib import admin

from apps.core.admin import PublishableAdmin
from apps.expressions.models import Expression


@admin.register(Expression)
class ExpressionAdmin(PublishableAdmin):
    list_display = ("slug", "local_expression", "french_equivalent", "status")
    search_fields = ("slug", "local_expression", "french_equivalent")
