#!/usr/bin/env python3
import json
import os
from difflib import SequenceMatcher

def similarity(a, b):
    """Calculate similarity ratio between two strings (case-insensitive)"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def find_best_icon(game_title, game_platform, available_icons):
    """Find the best matching icon for a game"""
    # Clean up the game title
    title_clean = game_title.lower().strip()
    
    best_match = None
    best_score = 0.0
    
    for icon_file in available_icons:
        icon_name = icon_file.lower()
        
        # Perfect match
        if title_clean in icon_name or icon_name in title_clean:
            return icon_file, 1.0
        
        # Check for significant keywords
        score = similarity(title_clean, icon_name)
        
        # Boost score if platform keyword is in icon name
        if game_platform in icon_name:
            score += 0.1
        
        if score > best_score and score > 0.5:
            best_score = score
            best_match = icon_file
    
    return best_match, best_score if best_match else (None, 0.0)

# Load existing data
with open('games/game-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Get all available icons
icon_dir = 'icon'
available_icons = os.listdir(icon_dir)

print("🎮 Assigning Icons to Games\n")

updates_made = {'android': 0, 'ppsspp': 0, 'ps2': 0}

for platform in ['android', 'ppsspp', 'ps2']:
    print(f"\n{'='*50}")
    print(f"Processing {platform.upper()} games...")
    print(f"{'='*50}")
    
    games_updated = 0
    
    for game in data[platform]:
        current_icon = game.get('image', '')
        
        # Check if needs update
        if 'placeholder' in current_icon.lower() or current_icon == '' or current_icon == '../icon/default.jpg':
            game_title = game.get('title', game.get('name', ''))
            
            # Find best matching icon
            best_icon, score = find_best_icon(game_title, platform, available_icons)
            
            if best_icon and score > 0.55:  # Only use if confidence is good
                new_path = f"../icon/{best_icon}"
                old_icon = current_icon
                game['image'] = new_path
                games_updated += 1
                print(f"✓ {game_title[:40]:<40} → {best_icon[:35]}")
            else:
                # Use a generic platform icon as fallback
                fallback = '../icon/placeholder.jpg'
                if game['image'] != fallback:
                    game['image'] = fallback
                    games_updated += 1
    
    updates_made[platform] = games_updated
    print(f"\nAssigned icons to {games_updated} {platform} games")

# Save updated data
with open('games/game-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n{'='*50}")
print("✅ ICON ASSIGNMENT COMPLETE")
print(f"{'='*50}")
print(f"Android: {updates_made['android']} games updated")
print(f"PPSSPP:  {updates_made['ppsspp']} games updated")
print(f"PS2:     {updates_made['ps2']} games updated")
print(f"Total:   {sum(updates_made.values())} games updated")
print(f"{'='*50}")
