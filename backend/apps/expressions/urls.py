from django.urls import path

from apps.expressions.views import ExpressionDetailView, ExpressionListView

urlpatterns = [
    path("expressions", ExpressionListView.as_view(), name="expression-list"),
    path("expressions/<slug:slug>", ExpressionDetailView.as_view(), name="expression-detail"),
]
