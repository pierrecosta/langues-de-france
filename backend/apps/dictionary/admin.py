from django.contrib import admin

from apps.core.admin import PublishableAdmin
from apps.dictionary.models import Word


@admin.register(Word)
class WordAdmin(PublishableAdmin):
    list_display = ("slug", "local", "french", "category", "status")
    search_fields = ("slug", "local", "french")
