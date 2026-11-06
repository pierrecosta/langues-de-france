from django.contrib import admin

from apps.territories.models import Territory


@admin.register(Territory)
class TerritoryAdmin(admin.ModelAdmin):  # type: ignore[type-arg]
    list_display = ("slug", "name")
