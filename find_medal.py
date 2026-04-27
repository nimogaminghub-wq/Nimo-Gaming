import json
d = json.load(open('games/game-data.json'))
for i, g in enumerate(d['ppsspp']):
    if 'Medal of Honor' in g.get('title', '') and 'placeholder' in g.get('image', '').lower():
        print(f'Line info - ID: {g.get("id")}, Title: {g.get("title")}, Image: {g.get("image")}')
