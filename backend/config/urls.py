from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView

from apps.core.views import health

urlpatterns = [
    path("health", health, name="health"),
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/territories/<slug:territory_slug>/", include("apps.dictionary.urls")),
    path("api/territories/<slug:territory_slug>/", include("apps.expressions.urls")),
]
