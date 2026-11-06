from django.urls import path

from apps.dictionary.views import WordDetailView, WordListView

urlpatterns = [
    path("words", WordListView.as_view(), name="word-list"),
    path("words/<slug:slug>", WordDetailView.as_view(), name="word-detail"),
]
