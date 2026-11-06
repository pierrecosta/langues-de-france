from django import forms
from django.contrib import admin, messages
from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from apps.core.models import PublicationStatus


class UnpublishForm(forms.Form):
    reason = forms.CharField(label="Motif de dépublication", widget=forms.Textarea)
    _selected_action = forms.CharField(widget=forms.MultipleHiddenInput)
    action = forms.CharField(widget=forms.HiddenInput, initial="unpublish_selected")


class PublishableAdmin(admin.ModelAdmin):  # type: ignore[type-arg]
    list_filter = ("status", "territory")
    readonly_fields = ("published_at", "unpublish_reason", "created_at", "updated_at")
    actions = ("publish_selected", "unpublish_selected")

    @admin.action(description="Publier les éléments sélectionnés")
    def publish_selected(self, request: HttpRequest, queryset: QuerySet) -> None:  # type: ignore[type-arg]
        count = 0
        for obj in queryset.exclude(status=PublicationStatus.PUBLISHED):
            obj.publish()
            count += 1
        self.message_user(request, f"{count} élément(s) publié(s).", messages.SUCCESS)

    @admin.action(description="Dépublier les éléments sélectionnés (motif requis)")
    def unpublish_selected(
        self,
        request: HttpRequest,
        queryset: QuerySet,  # type: ignore[type-arg]
    ) -> HttpResponse | None:
        form = UnpublishForm(request.POST if "apply" in request.POST else None)
        if "apply" in request.POST and form.is_valid():
            reason = form.cleaned_data["reason"]
            count = 0
            for obj in queryset.filter(status=PublicationStatus.PUBLISHED):
                obj.unpublish(reason)
                count += 1
            self.message_user(request, f"{count} élément(s) dépublié(s).", messages.SUCCESS)
            return None
        initial = {"_selected_action": [str(pk) for pk in queryset.values_list("pk", flat=True)]}
        if "apply" not in request.POST:
            form = UnpublishForm(initial=initial)
        return render(
            request,
            "admin/unpublish_reason.html",
            {"form": form, "items": queryset, "opts": self.model._meta, "title": "Dépublier"},
        )
