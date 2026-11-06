from argparse import ArgumentParser
from pathlib import Path
from typing import Any

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from apps.core.seeds import import_seeds


class Command(BaseCommand):
    help = "Importe une seule fois les seeds word/expression d'un territoire, en brouillon."

    def add_arguments(self, parser: ArgumentParser) -> None:
        parser.add_argument("--territory", default="provencal")
        parser.add_argument("--seeds-dir", default=str(settings.SEEDS_DIR))
        parser.add_argument("--dry-run", action="store_true", help="Rapport sans écriture")

    def handle(self, *args: Any, **options: Any) -> None:
        reports = import_seeds(
            Path(options["seeds_dir"]), options["territory"], dry_run=options["dry_run"]
        )
        failed = False
        prefix = "[dry-run] " if options["dry_run"] else ""
        for name, report in reports.items():
            self.stdout.write(
                f"{prefix}{name} : {report.created} créées, {report.skipped} ignorées, "
                f"{len(report.errors)} erreurs"
            )
            for error in report.errors:
                failed = True
                self.stderr.write(f"  - {error}")
        if failed:
            raise CommandError("Import terminé avec des erreurs.")
