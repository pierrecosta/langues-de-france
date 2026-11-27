"""Génère les contours affichés à partir du GeoJSON régional data.gouv.fr."""

import json
import math
import sys
from pathlib import Path


def points(geometry):
    coordinates = geometry["coordinates"]
    polygons = [coordinates] if geometry["type"] == "Polygon" else coordinates
    return [ring for polygon in polygons for ring in polygon]


def project(features, markers=None):
    rings = [ring for feature in features for ring in points(feature["geometry"])]
    coordinates = [point for ring in rings for point in ring]
    west = min(point[0] for point in coordinates)
    east = max(point[0] for point in coordinates)
    south = min(point[1] for point in coordinates)
    north = max(point[1] for point in coordinates)
    longitude_scale = math.cos(math.radians((north + south) / 2))
    width = (east - west) * longitude_scale
    height = north - south
    scale = min(360 / width if width else float("inf"), 280 / height if height else float("inf"))
    left = (400 - width * scale) / 2
    top = (320 - height * scale) / 2

    def position(point):
        return (left + (point[0] - west) * longitude_scale * scale,
                top + (north - point[1]) * scale)

    paths = []
    for ring in rings:
        coords = [position(point) for point in ring]
        paths.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in coords) + "Z")
    result = {"path": "".join(paths)}
    if markers:
        result["markers"] = {}
        for name, point in markers.items():
            x, y = position(point)
            result["markers"][name] = {"x": round(x / 4, 2), "y": round(y / 3.2, 2)}
    return result


def main():
    if len(sys.argv) != 4:
        raise SystemExit("Usage : python generate_map_data.py regions-1000m.geojson regions-100m.geojson map-data.json")
    data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    features = {feature["properties"]["code"]: feature for feature in data["features"]}
    detailed_data = json.loads(Path(sys.argv[2]).read_text(encoding="utf-8"))
    detailed = {feature["properties"]["code"]: feature for feature in detailed_data["features"]}
    overseas = [
        ("01", "Guadeloupe"), ("02", "Martinique"), ("03", "Guyane"),
        ("04", "La Réunion"), ("06", "Mayotte"), ("975", "Saint-Pierre-et-Miquelon"),
        ("977", "Saint-Barthélemy"), ("978", "Saint-Martin"),
        ("984", "Terres australes et antarctiques françaises"), ("986", "Wallis-et-Futuna"),
        ("987", "Polynésie française"), ("988", "Nouvelle-Calédonie"), ("989", "Clipperton"),
    ]
    excluded = {code for code, _ in overseas}
    metropolitan = [feature for code, feature in features.items() if code not in excluded]
    if len(metropolitan) != 13:
        raise ValueError("Nombre inattendu de régions métropolitaines.")
    result = {
        "metropolitan": project(metropolitan, {
            "provencal": (5.37, 43.30),
            "picard": (3.06, 50.63),
            "breton": (-4.10, 48.00),
            "basque": (-1.47, 43.49),
            "corse": (8.74, 41.92),
        }),
        "overseas": [
            {
                "id": code,
                "name": name,
                **project(
                    [detailed[code] if code in {"977", "978", "989"} else features[code]],
                    {"creole-reunionnais": (55.54, -21.12)} if code == "04" else None,
                ),
            }
            for code, name in overseas
        ],
    }
    Path(sys.argv[3]).write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
