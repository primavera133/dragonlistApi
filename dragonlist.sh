osascript -e 'tell application "Terminal" to activate' \
  -e 'tell application "System Events" to keystroke "t" using {command down}' \
  -e 'tell application "Terminal" to do script "cd ~/Projects/Private/dragonlist/functions && npm run build:watch" in front window'

osascript -e 'tell application "Terminal" to activate' \
  -e 'tell application "System Events" to keystroke "t" using {command down}' \
  -e 'tell application "Terminal" to do script "cd ~/Projects/Private/dragonlist/functions && npm run serve:inspect" in front window'

osascript -e 'tell application "Terminal" to activate' \
  -e 'tell application "System Events" to keystroke "t" using {command down}' \
  -e 'tell application "Terminal" to do script "cd ~/Projects/Private/dragonlist/view && npm run start" in front window'
