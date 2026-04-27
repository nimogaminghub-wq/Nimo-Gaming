#!/usr/bin/env python3
import json
import re

def extract_games_from_js(file_path):
    """Extract game objects from a JavaScript file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    games = []
    # Match individual game objects
    # Pattern: { followed by properties until }
    pattern = r'(\{\s*id\s*:\s*["\']([^"\']+)["\'][\s\S]*?download\s*:\s*["\']([^"\']+)["\'][\s\S]*?\})'
    
    for match in re.finditer(pattern, content):
        obj_str = match.group(1)
        try:
            # Try to extract key fields
            id_match = re.search(r'id\s*:\s*["\']([^"\']+)["\']', obj_str)
            name_match = re.search(r'name\s*:\s*["\']([^"\']+)["\']', obj_str)
            platform_match = re.search(r'platform\s*:\s*["\']([^"\']+)["\']', obj_str)
            genre_match = re.search(r'genre\s*:\s*["\']([^"\']+)["\']', obj_str)
            size_match = re.search(r'size\s*:\s*["\']([^"\']+)["\']', obj_str)
            image_match = re.search(r'image\s*:\s*["\']([^"\']+)["\']', obj_str)
            download_match = re.search(r'download\s*:\s*["\']([^"\']+)["\']', obj_str)
            rating_match = re.search(r'rating\s*:\s*([0-9.]+)', obj_str)
            
            if id_match and name_match:
                game = {
                    'id': id_match.group(1),
                    'title': name_match.group(1),
                    'platform': platform_match.group(1) if platform_match else 'unknown',
                    'genre': genre_match.group(1).lower() if genre_match else 'action',
                    'size': size_match.group(1) if size_match else 'Unknown',
                    'rating': float(rating_match.group(1)) if rating_match else 4.5,
                    'image': image_match.group(1) if image_match else '../icon/placeholder.jpg',
                    'description': f'{name_match.group(1)} game.',
                    'trendingScore': int(float(rating_match.group(1)) * 20) if rating_match else 90,
                    'featured': False,
                    'downloadLinks': [{'name': 'Direct', 'url': download_match.group(1)} if download_match else {'name': 'N/A', 'url': ''}]
                }
                games.append(game)
        except Exception as e:
            print(f"Error parsing game: {e}")
            continue
    
    return games

# Read existing data
with open('games/game-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Get existing IDs
existing_android_ids = {g['id'] for g in data['android']}
existing_ppsspp_ids = {g['id'] for g in data['ppsspp']}
existing_ps2_ids = {g['id'] for g in data['ps2']}

print(f"Existing: Android={len(data['android'])}, PPSSPP={len(data['ppsspp'])}, PS2={len(data['ps2'])}")

# Extract new games
android_games = extract_games_from_js('Android data.js')
ppsspp_games = extract_games_from_js('Ppsspp data.js')
ps2_games = extract_games_from_js('Ps2 data.js')

# Filter out existing games and add new ones
for game in android_games:
    if game['id'] not in existing_android_ids:
        data['android'].append(game)

for game in ppsspp_games:
    if game['id'] not in existing_ppsspp_ids:
        data['ppsspp'].append(game)

for game in ps2_games:
    if game['id'] not in existing_ps2_ids:
        data['ps2'].append(game)

# Save updated data
with open('games/game-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Updated: Android={len(data['android'])}, PPSSPP={len(data['ppsspp'])}, PS2={len(data['ps2'])}")
print("games/game-data.json updated successfully!")
