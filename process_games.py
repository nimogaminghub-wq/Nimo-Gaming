import json
import re

# Read the existing game-data.json
with open('games/game-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract existing IDs to avoid duplicates
existing_android_ids = {game['id'] for game in data.get('android', [])}
existing_ppsspp_ids = {game['id'] for game in data.get('ppsspp', [])}
existing_ps2_ids = {game['id'] for game in data.get('ps2', [])}

print(f"Existing Android games: {len(data['android'])}")
print(f"Existing PPSSPP games: {len(data['ppsspp'])}")
print(f"Existing PS2 games: {len(data['ps2'])}")

# Helper function to convert JS object format to JSON
def parse_js_games(file_path, platform):
    """Parse games from JS file and return list"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all game objects
    games = []
    # Match patterns like {id: "...", name: "...", ...}
    pattern = r'\{\s*id\s*:\s*["\']([^"\']+)["\']\s*,.*?download\s*:\s*["\']([^"\']+)["\']\s*\}'
    matches = re.finditer(pattern, content, re.DOTALL)
    
    for match in matches:
        # Extract the full object text
        start = match.start()
        # Find the complete object by counting braces
        brace_count = 0
        end = start
        for i, char in enumerate(content[start:], start):
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    end = i + 1
                    break
        
        obj_str = content[start:end]
        games.append(obj_str)
    
    return games

# Parse Android games
print("\nProcessing Android games...")
android_content = open('Android data.js', 'r', encoding='utf-8').read()

# More reliable parsing
android_games_raw = re.findall(r'\{[^}]*id\s*:\s*["\']([^"\']+)["\'][^}]*name\s*:\s*["\']([^"\']+)["\'][^}]*\}', android_content, re.DOTALL)
print(f"Found {len(android_games_raw)} Android game references")

# Parse PPSSPP games
print("\nProcessing PPSSPP games...")
ppsspp_content = open('Ppsspp data.js', 'r', encoding='utf-8').read()
ppsspp_games_raw = re.findall(r'\{[^}]*id\s*:\s*["\']([^"\']+)["\'][^}]*name\s*:\s*["\']([^"\']+)["\'][^}]*\}', ppsspp_content, re.DOTALL)
print(f"Found {len(ppsspp_games_raw)} PPSSPP game references")

# Parse PS2 games
print("\nProcessing PS2 games...")
ps2_content = open('Ps2 data.js', 'r', encoding='utf-8').read()
ps2_games_raw = re.findall(r'\{[^}]*id\s*:\s*["\']([^"\']+)["\'][^}]*name\s*:\s*["\']([^"\']+)["\'][^}]*\}', ps2_content, re.DOTALL)
print(f"Found {len(ps2_games_raw)} PS2 game references")

print("\nScript ready to process game data")
