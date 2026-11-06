from apps.core.views_base import PublishedDetailView, PublishedListView
from apps.expressions.models import Expression
from apps.expressions.serializers import ExpressionSerializer


class ExpressionListView(PublishedListView):
    model = Expression
    serializer_class = ExpressionSerializer


class ExpressionDetailView(PublishedDetailView):
    model = Expression
    serializer_class = ExpressionSerializer
