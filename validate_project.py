#!/usr/bin/env python3
"""
Comprehensive file validation and error checking script
"""

import os
import json
import re
from pathlib import Path

def check_html_files():
    """Check HTML files for common errors"""
    errors = []
    warnings = []

    for html_file in Path('.').rglob('*.html'):
        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            # Check for missing doctype
            if not re.search(r'<!DOCTYPE html>', content, re.IGNORECASE):
                errors.append(f"[CRITICAL] {html_file}: Missing DOCTYPE")

            # Check for unclosed tags
            if content.count('<html') > content.count('</html'):
                errors.append(f"[ERROR] {html_file}: Unclosed <html> tag")
            if content.count('<body') > content.count('</body'):
                errors.append(f"[ERROR] {html_file}: Unclosed <body> tag")

            # Check for empty href links
            empty_hrefs = re.findall(r'href=["\']#?["\']', content)
            if empty_hrefs:
                warnings.append(f"[WARNING] {html_file}: Found {len(empty_hrefs)} empty href links")

            # Check for images without alt
            imgs_no_alt = re.findall(r'<img(?!.*alt=)[^>]*>', content)
            if imgs_no_alt:
                errors.append(f"[ERROR] {html_file}: {len(imgs_no_alt)} images missing alt attribute")

            # Check for broken image paths
            broken_imgs = re.findall(r'src=["\']([^"\']*)["\']', content)
            for img_path in broken_imgs:
                if not img_path.startswith('http'):
                    resolved = os.path.join(os.path.dirname(html_file), img_path)
                    if not os.path.exists(resolved):
                        warnings.append(f"[WARNING] {html_file}: Image not found: {img_path}")

        except Exception as e:
            errors.append(f"[ERROR] {html_file}: {str(e)}")

    return errors, warnings

def check_json_files():
    """Check JSON files for syntax errors"""
    errors = []

    for json_file in Path('.').rglob('*.json'):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                json.load(f)
        except json.JSONDecodeError as e:
            errors.append(f"[CRITICAL] {json_file}: JSON syntax error at line {e.lineno}: {e.msg}")
        except Exception as e:
            errors.append(f"[ERROR] {json_file}: {str(e)}")

    return errors

def check_css_files():
    """Basic CSS validation"""
    errors = []

    for css_file in Path('.').rglob('*.css'):
        try:
            with open(css_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            # Check for unmatched braces
            open_braces = content.count('{')
            close_braces = content.count('}')
            if open_braces != close_braces:
                errors.append(f"[ERROR] {css_file}: Unmatched braces ({open_braces} open, {close_braces} close)")

            # Check for unmatched parentheses
            open_parens = content.count('(')
            close_parens = content.count(')')
            if open_parens != close_parens:
                errors.append(f"[WARNING] {css_file}: Unmatched parentheses ({open_parens} open, {close_parens} close)")

        except Exception as e:
            errors.append(f"[ERROR] {css_file}: {str(e)}")

    return errors

def check_download_links():
    """Validate all download links in game-data.json"""
    errors = []
    warnings = []

    try:
        with open('games/game-data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

        for platform, games in data.items():
            if isinstance(games, list):
                for game in games:
                    # Check for missing required fields
                    required_fields = ['id', 'title', 'platform', 'image', 'downloadLinks']
                    for field in required_fields:
                        if field not in game:
                            errors.append(f"[ERROR] Game '{game.get('title', 'Unknown')}': Missing '{field}' field")

                    # Check if image exists
                    if 'image' in game:
                        img_path = game['image'].replace('./', '')
                        if not os.path.exists(os.path.join('icon', img_path)) and not os.path.exists(img_path):
                            warnings.append(f"[WARNING] Game '{game['title']}': Image not found: {game['image']}")

                    # Check download links
                    if 'downloadLinks' in game and isinstance(game['downloadLinks'], list):
                        if len(game['downloadLinks']) == 0:
                            warnings.append(f"[WARNING] Game '{game['title']}': No download links provided")

                        for link in game['downloadLinks']:
                            if 'url' not in link or 'name' not in link:
                                errors.append(f"[ERROR] Game '{game['title']}': Invalid download link format")
                            elif not link['url'].startswith('http'):
                                errors.append(f"[ERROR] Game '{game['title']}': Invalid URL: {link['url']}")

    except FileNotFoundError:
        errors.append("[CRITICAL] games/game-data.json not found")
    except json.JSONDecodeError as e:
        errors.append(f"[CRITICAL] games/game-data.json: JSON syntax error - {e}")
    except Exception as e:
        errors.append(f"[ERROR] Checking download links: {str(e)}")

    return errors, warnings

def main():
    print("=" * 80)
    print("NIMO'S GAMING - COMPREHENSIVE FILE VALIDATION")
    print("=" * 80)
    print()

    # Check HTML files
    print("Checking HTML files...")
    html_errors, html_warnings = check_html_files()

    # Check JSON files
    print("Checking JSON files...")
    json_errors = check_json_files()

    # Check CSS files
    print("Checking CSS files...")
    css_errors = check_css_files()

    # Check download links
    print("Checking download links...")
    link_errors, link_warnings = check_download_links()

    # Compile results
    all_errors = html_errors + json_errors + css_errors + link_errors
    all_warnings = html_warnings + link_warnings

    # Print results
    print("\n" + "=" * 80)
    print("VALIDATION RESULTS")
    print("=" * 80)

    if all_errors:
        print(f"\n❌ ERRORS ({len(all_errors)}):")
        for error in all_errors:
            print(f"  {error}")
    else:
        print("\n✅ No critical errors found!")

    if all_warnings:
        print(f"\n⚠️  WARNINGS ({len(all_warnings)}):")
        for warning in all_warnings:
            print(f"  {warning}")
    else:
        print("\n✅ No warnings found!")

    print("\n" + "=" * 80)
    print(f"Summary: {len(all_errors)} errors, {len(all_warnings)} warnings")
    print("=" * 80)

    return len(all_errors) == 0

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
