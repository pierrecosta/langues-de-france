from apps.core.views_base import PublishedDetailView, PublishedListView
from apps.dictionary.models import Word
from apps.dictionary.serializers import WordSerializer


class WordListView(PublishedListView):
    model = Word
    serializer_class = WordSerializer


class WordDetailView(PublishedDetailView):
    model = Word
    serializer_class = WordSerializer
