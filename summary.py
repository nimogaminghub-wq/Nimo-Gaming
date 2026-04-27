import json
d = json.load(open('games/game-data.json'))
total_games = len(d['android']) + len(d['ppsspp']) + len(d['ps2'])
print('✅ ICON ASSIGNMENT COMPLETE')
print('=' * 50)
print(f'Total Games: {total_games}')
print(f'  • Android: {len(d["android"])} games')
print(f'  • PPSSPP:  {len(d["ppsspp"])} games')
print(f'  • PS2:     {len(d["ps2"])} games')
print('=' * 50)
placeholder_count = 0
for platform in d:
    for game in d[platform]:
        if 'placeholder' in game.get('image', '').lower():
            placeholder_count += 1
print(f'Games with placeholder icons: {placeholder_count}')
print(f'Games with proper icons: {total_games - placeholder_count}')
print('=' * 50)
