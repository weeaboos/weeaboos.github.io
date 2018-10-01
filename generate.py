import json
import os

LYRICS_FOLDER = 'lyrics/'
TARGET_POST_FOLDER = 'src/posts/'
TARGET_HELPER_FOLDER = TARGET_POST_FOLDER + 'helper/'
SONG_LIST_FILE = 'src/utils/lyrics.js'

__frontmatter__ = '__frontmatter__'
__html__ = '__html__'
__lang__ = '__version__'

def write_to_file(filename, content):
  with open(filename, 'w') as write_file:
    write_file.write(content)

def get_line(filename):
  with open(filename, 'r') as file:
    lines = file.read().split('\n')
    for line in lines:
      yield line

def generate_files(filename):
  def advance(iterator):
    return next(iterator, None)

  actual_filename = filename.split('.txt')[0]
  filename = LYRICS_FOLDER + filename # lol
  json_content = {}
  lines = get_line(filename)
  line = advance(lines)

  def generate_frontmatter(lines):
    frontmatter = '---\n'
    frontmatter_json = {}
    line = advance(lines)

    while line != __frontmatter__:
      frontmatter += line + '\n'

      kv = line.split(': ')
      key, value = kv if len(kv) == 2 else [kv[0], None]
      frontmatter_json[key] = value

      line = advance(lines)
    frontmatter += '---\n'
    return frontmatter, frontmatter_json

  def generate_html(lines):
    line = advance(lines)
    content = ''
    while line != __html__:
      content += line + '\n'
      line = advance(lines)
    return content

  def generate_version(delimiter, lines):
    version_json = {}
    version_json['version'] = delimiter.split(' ')[1]
    lyrics = []
    line = advance(lines)
    while line != delimiter:
      lyrics.append(line)
      line = advance(lines)

    version_json['lyrics'] = lyrics
    return version_json


  master_markdown = ''
  master_json = None
  while line != None:
    if line == __frontmatter__:
      master_markdown, master_json = generate_frontmatter(lines)
      master_json['lyrics'] = []
    elif line == __html__:
      master_markdown += generate_html(lines)
    elif __lang__ in line:
      master_json['lyrics'].append(generate_version(line, lines))

    line = advance(lines)

  json_filename = TARGET_HELPER_FOLDER + actual_filename + '.json'
  mkdn_filename = TARGET_POST_FOLDER + actual_filename + '.markdown'
  write_to_file(json_filename, json.dumps(master_json, ensure_ascii=False))
  write_to_file(mkdn_filename, master_markdown)

# Generate filename
filenames = os.listdir(LYRICS_FOLDER)
filenames = list(filter(lambda filename: '.txt' in filename, filenames))
for filename in filenames:
  generate_files(filename)

filenames = list(map(lambda filename: filename.split('.txt')[0], filenames))
song_list = 'export default {}'.format(json.dumps(filenames, ensure_ascii=False))
write_to_file(SONG_LIST_FILE, song_list)
