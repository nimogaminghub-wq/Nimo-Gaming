import json
d = json.load(open('games/game-data.json'))
print('PPSSPP games with placeholder icons:\n')
for g in d['ppsspp']:
    if 'placeholder' in g.get('image','').lower():
        title = g.get('title', g.get('name', 'Unknown'))
        print(f'  • {title}')
