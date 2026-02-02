import os
import re
import glob
from datetime import datetime

# Configuration
SOURCE_DIR = "../../../02_Ideas"
OUTPUT_FILE = "index.html"
TEMPLATE = """
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nayuta Philosophy - 概念の体系化</title>
    <link rel="stylesheet" href="style.css">
    <!-- Google Fonts for precision typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="paper">
        <header>
            <h1>Nayuta Philosophy</h1>
            <div class="subtitle">概念の体系化と定義集</div>
            <div style="margin-top: 10px; font-size: 0.8em; color: #666;">Last Updated: {date}</div>
        </header>

        <nav class="toc">
            <h2>Index</h2>
            <ul class="toc-list">
                {toc_items}
            </ul>
        </nav>

        <main>
            {content_items}
        </main>

        <footer>
            &copy; 2025-2026 Nist Studio / Nayuta
        </footer>
    </div>
</body>
</html>
"""

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract Title (First H1)
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else os.path.basename(file_path).replace('.md', '')

    # Extract Definition (> [!ABSTRACT] block)
    # Regex looks for > [!ABSTRACT] ... then captures lines starting with > untill a non-> line
    # Simplified: Find the abstract block content
    definition = ""
    abstract_match = re.search(r'>\s*\[!ABSTRACT\][^\n]*\n((?:>.*\n)*)', content)
    if abstract_match:
        raw_def = abstract_match.group(1)
        # Remove > and cleanup
        definition = re.sub(r'^>\s?', '', raw_def, flags=re.MULTILINE).strip()
    
    # Extract Mindset (## Nayuta's Mindset block)
    mindset = ""
    mindset_match = re.search(r'##\s+Nayuta\'s\s+Mindset\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
    if mindset_match:
        raw_mindset = mindset_match.group(1).strip()
        # Convert markdown bullets to HTML list items
        # Simple parsing for now
        lines = raw_mindset.split('\n')
        html_lines = []
        for line in lines:
            line = line.strip()
            if line.startswith('*') or line.startswith('-'):
                # Handle bolding **text**
                line_content = line[1:].strip()
                line_content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', line_content)
                html_lines.append(f"<li>{line_content}</li>")
        if html_lines:
            mindset = "<ul>" + "\n".join(html_lines) + "</ul>"

    return {
        "id": os.path.basename(file_path).replace('.md', ''),
        "title": title,
        "definition": definition,
        "mindset": mindset
    }

def main():
    files = glob.glob(os.path.join(SOURCE_DIR, "*.md"))
    concepts = []

    print(f"Found {len(files)} files in {SOURCE_DIR}")

    for file_path in files:
        # Skip system files or templates if any
        if "Template" in file_path or "Master_Index" in file_path:
            continue
            
        try:
            concept = parse_markdown(file_path)
            # Only include if it has a Title
            if concept["title"]:
                concepts.append(concept)
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")

    # Sort alphabetically by ID (usually Japanese filename)
    concepts.sort(key=lambda x: x["id"])

    # Generate HTML
    toc_html = []
    content_html = []

    for c in concepts:
        # Skip empty ones (drafts etc)
        if not c["definition"] and not c["mindset"]:
            continue

        # TOC Item
        toc_html.append(f'<li><a href="#{c["id"]}">{c["title"]}</a></li>')

        # Content Block
        block = f"""
        <article class="concept-block" id="{c['id']}">
            <div class="concept-title">
                {c['title']}
                <span class="concept-id">#{c['id']}</span>
            </div>
            
            {f'<div class="concept-definition">{c["definition"].replace(chr(10), "<br>")}</div>' if c['definition'] else ''}
            
            {f'<div class="concept-mindset"><h3>Nayuta\'s Mindset</h3>{c["mindset"]}</div>' if c['mindset'] else ''}
        </article>
        """
        content_html.append(block)

    final_html = TEMPLATE.format(
        date=datetime.now().strftime("%Y-%m-%d"),
        toc_items="\n".join(toc_html),
        content_items="\n".join(content_html)
    )

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(final_html)

    print(f"Successfully generated {OUTPUT_FILE} with {len(concepts)} concepts.")

if __name__ == "__main__":
    main()
