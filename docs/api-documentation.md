# API - Museums Explorer

## Base URL
http://localhost:3000

---

## GET /api/museums

### Description
Returns list of museums for carousel display.

### Response
[
  {
    "id": 1,
    "name": "Museo MARCO",
    "image": "marco.jpg",
    "mapsUrl": "https://maps.google.com/...",
    "lat": 25.666,
    "lng": -100.309
  }
]

### Fields
- id: number
- name: string
- image: string
- mapsUrl: string
- lat: number
- lng: number