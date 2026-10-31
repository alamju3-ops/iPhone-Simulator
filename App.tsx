import React, { useState, createContext, useContext } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { ThemeProvider, useT, T, Screen, Scroll, Header, NavBar, Card, Group, Row, Button, Segmented, Chip, Pill, Avatar, Toggle, TabBar, Tabs, Stack, Icon, Spacer, SectionTitle, SearchBar, alpha } from './ui/kit';

const ACCENT = '#3B82F6';
const THEME = { dark: { bg: '#07090F', card: '#10141D', card2: '#19202C', line: '#1D2531', text2: '#93A0B4', text3: '#59657A' }, light: { bg: '#F1F4FA', card: '#FFFFFF', card2: '#E1E7F2' } };
const PEOPLE = {
  sam: { name: 'Sam Ortiz', c: '#F59E42', online: true },
  lena: { name: 'Lena Park', c: '#A78BFA', online: true },
  noah: { name: 'Noah Reed', c: '#22C55E', online: false },
  ava: { name: 'Ava Chen', c: '#FF6B9D', online: false },
  team: { name: 'Design team', c: '#3B82F6', online: true, group: true },
};
const CHATS_INIT = [
  { id: 'sam', last: 'Sending the mockups now 🚀', time: '14:02', unread: 2 },
  { id: 'team', last: 'Lena: can we move standup to 10?', time: '13:40', unread: 5 },
  { id: 'lena', last: 'Perfect, see you there', time: '12:15', unread: 0 },
  { id: 'noah', last: 'You: thanks for the review!', time: 'Mon', unread: 0 },
  { id: 'ava', last: 'Voice message · 0:42', time: 'Sun', unread: 0 },
];
const THREAD_INIT = [
  { id: 1, me: false, text: 'Hey! Did you get a chance to look at the onboarding flow?', time: '13:48' },
  { id: 2, me: true, text: 'Yes, went through it this morning. The step 3 copy is a bit long.', time: '13:51' },
  { id: 3, me: false, text: 'Agreed. I will tighten it and send the mockups.', time: '13:55' },
  { id: 4, me: false, text: 'Sending the mockups now 🚀', time: '14:02' },
];
const Store = createContext(null);

function ChatsScreen({ nav }) {
  const t = useT();
  const { chats } = useContext(Store);
  const [q, setQ] = useState('');
  const list = chats.filter((c) => PEOPLE[c.id].name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Scroll pad={0}>
      <Header kicker={chats.reduce((a, c) => a + c.unread, 0) + ' unread'} title="Messages" right={<Button label="New" icon="SquarePen" small onPress={() => {}} />} />
      <View style={{ paddingHorizontal: 20 }}>
        <SearchBar placeholder="Search" value={q} onChange={setQ} />
        <Scroll horizontal pad={0} contentStyle={{ gap: 14, paddingVertical: 16, paddingRight: 20 }}>
          {Object.keys(PEOPLE).filter((k) => PEOPLE[k].online).map((k) => (
            <Pressable key={k} onPress={() => nav.push('thread', { id: k })} style={{ alignItems: 'center', width: 64 }}>
              <View><Avatar name={PEOPLE[k].name} color={PEOPLE[k].c} size={56} /><View style={{ position: 'absolute', right: 1, bottom: 1, width: 14, height: 14, borderRadius: 7, backgroundColor: t.success, borderWidth: 2, borderColor: t.bg }} /></View>
              <Text style={[T.caption, { color: t.text2, marginTop: 6 }]} numberOfLines={1}>{PEOPLE[k].name.split(' ')[0]}</Text>
            </Pressable>
          ))}
        </Scroll>
        <Group>
          {list.map((c) => {
            const p = PEOPLE[c.id];
            return <Row key={c.id} leading={<Avatar name={p.name} color={p.c} size={48} />} title={p.name} subtitle={c.last} titleStyle={c.unread ? { fontWeight: '700' } : null} right={<View style={{ alignItems: 'flex-end', gap: 6 }}><Text style={[T.caption, { color: c.unread ? ACCENT : t.text3 }]}>{c.time}</Text>{c.unread ? <View style={{ minWidth: 20, height: 20, borderRadius: 10, backgroundColor: ACCENT, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 }}><Text style={[T.caption2, { color: '#fff' }]}>{c.unread}</Text></View> : null}</View>} onPress={() => nav.push('thread', { id: c.id })} pad={10} />;
          })}
        </Group>
      </View>
    </Scroll>
  );
}

function CallsScreen() {
  const t = useT();
  const calls = [['lena', 'Outgoing · 12 min', 'PhoneOutgoing', t.text2], ['sam', 'Missed', 'PhoneMissed', t.danger], ['team', 'Video · 48 min', 'Video', t.text2], ['noah', 'Incoming · 4 min', 'PhoneIncoming', t.text2]];
  return (
    <Scroll pad={0}>
      <Header kicker="Recent" title="Calls" right={<Icon name="Phone" size={24} />} />
      <View style={{ paddingHorizontal: 20 }}>
        <Group>
          {calls.map((c, i) => <Row key={i} leading={<Avatar name={PEOPLE[c[0]].name} color={PEOPLE[c[0]].c} size={44} />} title={PEOPLE[c[0]].name} subtitle={c[1]} right={<Icon name={c[2]} size={20} color={c[3]} />} onPress={() => {}} />)}
        </Group>
      </View>
    </Scroll>
  );
}

function SettingsScreen() {
  const t = useT();
  const [read, setRead] = useState(true);
  return (
    <Scroll pad={0}>
      <Header kicker="You" title="Settings" />
      <View style={{ paddingHorizontal: 20 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Avatar name="Maya Kovacs" color={ACCENT} size={56} />
          <View style={{ flex: 1 }}><Text style={[T.headline, { color: t.text }]}>Maya Kovacs</Text><Text style={[T.footnote, { color: t.text2 }]}>Building things · she/her</Text></View>
          <Icon name="ChevronRight" size={18} color={t.text3} />
        </Card>
        <SectionTitle title="Privacy" />
        <Group>
          <Row icon="CheckCheck" title="Read receipts" right={<Toggle value={read} onChange={setRead} />} />
          <Row icon="Lock" title="End to end encryption" subtitle="On for all chats" right={<Icon name="Check" size={18} color={t.success} />} />
          <Row icon="Clock" title="Disappearing messages" value="Off" chevron onPress={() => {}} />
        </Group>
        <SectionTitle title="Notifications" />
        <Group>
          <Row icon="Bell" title="Message previews" right={<Toggle value onChange={() => {}} />} />
          <Row icon="Moon" title="Quiet hours" value="22:00 to 08:00" chevron onPress={() => {}} />
        </Group>
      </View>
    </Scroll>
  );
}

function Bubble({ m, color }) {
  const t = useT();
  return (
    <View style={{ alignItems: m.me ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
      <View style={{ maxWidth: '78%', backgroundColor: m.me ? ACCENT : t.card, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderBottomRightRadius: m.me ? 6 : 20, borderBottomLeftRadius: m.me ? 20 : 6 }}>
        <Text style={[T.body, { color: m.me ? '#fff' : t.text }]}>{m.text}</Text>
      </View>
      <Text style={[T.caption2, { color: t.text3, marginTop: 3, marginHorizontal: 6 }]}>{m.time}</Text>
    </View>
  );
}

function Thread({ nav, params }) {
  const t = useT();
  const { thread, send } = useContext(Store);
  const p = PEOPLE[params.id] || PEOPLE.sam;
  const [draft, setDraft] = useState('');
  return (
    <Screen>
      <NavBar title={p.name} onBack={nav.pop} right={<Icon name="Phone" size={20} />} />
      <View style={{ alignItems: 'center', marginTop: -6, marginBottom: 8 }}><Text style={[T.caption, { color: p.online ? t.success : t.text3 }]}>{p.online ? 'Online now' : 'Last seen today'}</Text></View>
      <Scroll pad={20}>
        <View style={{ alignItems: 'center', marginVertical: 14 }}><Pill label="Today" color={t.text2} small /></View>
        {thread.map((m) => <Bubble key={m.id} m={m} />)}
      </Scroll>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingTop: 8, paddingBottom: 34, borderTopWidth: 1, borderTopColor: t.line, backgroundColor: t.bg }}>
        <Pressable style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: t.card, alignItems: 'center', justifyContent: 'center' }}><Icon name="Plus" size={20} /></Pressable>
        <View style={{ flex: 1, height: 40, borderRadius: 20, backgroundColor: t.card, paddingHorizontal: 14, justifyContent: 'center' }}>
          <TextInput value={draft} onChangeText={setDraft} placeholder="Message" placeholderTextColor={t.text3} style={[T.body, { color: t.text, paddingVertical: 0 }]} />
        </View>
        <Pressable onPress={() => { send(draft || 'Looks great, thank you!'); setDraft(''); }} style={({ pressed }) => [{ width: 38, height: 38, borderRadius: 19, backgroundColor: ACCENT, alignItems: 'center', justifyContent: 'center' }, pressed && { opacity: 0.7 }]}><Icon name="ArrowUp" size={20} color="#fff" strokeWidth={2.6} /></Pressable>
      </View>
    </Screen>
  );
}

function Root({ nav }) {
  const [tab, setTab] = useState('chats');
  return (
    <Screen>
      <Tabs active={tab} screens={{ chats: <ChatsScreen nav={nav} />, calls: <CallsScreen />, settings: <SettingsScreen /> }} />
      <TabBar active={tab} onChange={setTab} tabs={[
        { key: 'chats', label: 'Chats', icon: 'MessageCircle' },
        { key: 'calls', label: 'Calls', icon: 'Phone' },
        { key: 'settings', label: 'Settings', icon: 'Settings' },
      ]} />
    </Screen>
  );
}
const SCREENS = { root: Root, thread: Thread };

export default function App() {
  const [chats, setChats] = useState(CHATS_INIT);
  const [thread, setThread] = useState(THREAD_INIT);
  const send = (text) => { setThread((th) => [...th, { id: Date.now(), me: true, text, time: 'now' }]); setChats((cs) => cs.map((c) => (c.id === 'sam' ? Object.assign({}, c, { last: 'You: ' + text, unread: 0, time: 'now' }) : c))); };
  return (
    <ThemeProvider accent={ACCENT} overrides={THEME}>
      <Store.Provider value={{ chats, thread, send }}>
        <Stack screens={SCREENS} initial="root" />
      </Store.Provider>
    </ThemeProvider>
  );
}
