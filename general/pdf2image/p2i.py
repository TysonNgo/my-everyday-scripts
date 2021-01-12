import sys
from pdf2image import convert_from_path

try:
	(_, source, page_number, out) = sys.argv
	page_number = int(page_number)
except:
	print('Usage:')
	print(' python p2i.py <source> <page_number> <out>')
	sys.exit()

pages = convert_from_path(source, dpi=300, first_page=page_number, last_page=page_number+1)

pages.pop().save(out, 'JPEG')
