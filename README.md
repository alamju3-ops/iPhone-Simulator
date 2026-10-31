# iPhone 16 Simulator

## Browser version

A standalone `index.html` is included at the repository root. Open it through GitHub Pages or any static HTML host to run the browser prototype; it does not require the Expo build. The page includes an iPhone-style home screen and interactive demo screens. Messages, notes, contacts, and Safari search history are saved in the browser's local storage. Ionicons are loaded from a CDN, so an internet connection is needed for the icons.

To enable GitHub Pages, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. The site will be available at `https://alamju3-ops.github.io/iPhone-Simulator/` after GitHub finishes publishing it.

An Expo / React Native iPhone-style interface prototype. App icons and interface symbols use Ionicons; emoji are not used as UI icons.

## Run locally

```bash
npm install
npx expo start
```

Open with Expo Go or launch the iOS simulator. The home screen includes iPhone-style status indicators, Dynamic Island styling, a widget, app grid, and dock.

## Included app prototypes

- Phone, Messages, Safari / Google, Camera, Photos, Calendar, Clock, Weather, Maps, Notes, Contacts, Mail, Settings
- YouTube, KakaoTalk, Spotify

Messages includes a conversation list, unread badges, a new conversation flow, blue outgoing bubbles, incoming bubbles, and a text composer. Notes and contacts support adding items in the current session. Search and media screens use local demonstration content and do not connect to external services.

## Icon set

Ionicons via `@expo/vector-icons`: https://ionic.io/ionicons
