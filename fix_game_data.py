#!/usr/bin/env python3
"""
Fix game-data.json by cleaning up invalid image paths and removing duplicates
"""

import json
import os
from pathlib import Path

def fix_game_data():
    """Fix game-data.json file"""
    with open('games/game-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    fixed_data = {}
    removed_count = 0

    for platform, games in data.items():
        fixed_data[platform] = []
        if isinstance(games, list):
            seen_ids = set()
            for game in games:
                # Check if image exists
                if 'image' in game:
                    img_path = game['image'].replace('./', '')
                    full_path = os.path.join('icon', img_path) if not img_path.startswith('images/') else img_path

                    # Skip if image doesn't exist and path is invalid
                    if not os.path.exists(full_path) and 'images/' in game['image']:
                        removed_count += 1
                        print(f"Removed: {game['title']} (missing image: {game['image']})")
                        continue

                    # Check for duplicates
                    if game['id'] in seen_ids:
                        removed_count += 1
                        print(f"Removed duplicate: {game['title']}")
                        continue

                    seen_ids.add(game['id'])
                    fixed_data[platform].append(game)
                else:
                    fixed_data[platform].append(game)

    # Write back to file
    with open('games/game-data.json', 'w', encoding='utf-8') as f:
        json.dump(fixed_data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Fixed game-data.json - Removed {removed_count} invalid/duplicate entries")
    print(f"Total games remaining:")
    for platform, games in fixed_data.items():
        print(f"  - {platform}: {len(games)} games")

if __name__ == '__main__':
    fix_game_data()
