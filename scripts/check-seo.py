"""Check published metadata, crawl discovery, and local link integrity."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path('dist').resolve()
ORIGIN = 'https://mercycarescounselingservices.com'

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.canonicals, self.descriptions, self.titles, self.structured = [], [], [], [], [], []
        self.h1 = 0
        self.capture = None
        self.buffer = ''
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs: self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs: self.links.append(attrs[key])
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonicals.append(attrs['href'])
        if tag == 'meta' and attrs.get('name') == 'description': self.descriptions.append(attrs['content'])
        if tag == 'h1': self.h1 += 1
        if tag == 'title' or (tag == 'script' and attrs.get('type') == 'application/ld+json'):
            self.capture, self.buffer = tag, ''
    def handle_data(self, text):
        if self.capture: self.buffer += text
    def handle_endtag(self, tag):
        if tag == self.capture:
            if tag == 'title': self.titles.append(self.buffer)
            else: self.structured.append(json.loads(self.buffer))
            self.capture = None

pages = {}
for path in ROOT.rglob('*.html'):
    p = Page(); p.feed(path.read_text()); pages[path] = p
    expected = ORIGIN + ('/' if path.name == 'index.html' else '/' + str(path.relative_to(ROOT)))
    assert p.canonicals == [expected], f'Canonical mismatch: {path}'
    assert len(p.titles) == len(p.descriptions) == p.h1 == 1, f'Metadata or heading issue: {path}'
    assert len(set(p.ids)) == len(p.ids), f'Duplicate IDs: {path}'
    assert p.structured and p.structured[0]['@context'] == 'https://schema.org'
assert len({p.titles[0] for p in pages.values()}) == len(pages), 'Duplicate titles'
assert len({p.descriptions[0] for p in pages.values()}) == len(pages), 'Duplicate descriptions'
for path, p in pages.items():
    for link in p.links:
        url = urlsplit(link)
        if url.scheme or url.netloc: continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if target.is_dir(): target /= 'index.html'
        assert target.is_relative_to(ROOT) and target.exists(), f'Broken local link: {path}: {link}'
        if url.fragment and target in pages:
            assert url.fragment in pages[target].ids, f'Broken anchor: {link}'
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [el.text for el in ET.parse(ROOT / 'sitemap.xml').findall('s:url/s:loc', ns)]
assert set(urls) == {p.canonicals[0] for p in pages.values()} and len(urls) == len(pages)
assert f'Sitemap: {ORIGIN}/sitemap.xml' in (ROOT / 'robots.txt').read_text()
assert 'Disallow: /' not in (ROOT / 'robots.txt').read_text()
print(f'Passed: {len(pages)} unique titles, descriptions and canonicals; JSON-LD; sitemap; robots.txt; all internal links and anchors.')
