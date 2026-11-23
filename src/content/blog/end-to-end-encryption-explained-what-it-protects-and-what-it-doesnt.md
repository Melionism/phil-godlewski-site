---
title: 'End-to-End Encryption Explained: What It Protects and What It Doesn''t'
seoTitle: 'End-to-End Encryption Explained: Protection & Limits'
description: 'Learn what end-to-end encryption protects (messages in transit) and what it doesn''t (unlocked phones, backups, metadata). Plain-language guide with Signal example.'
pubDate: 2026-11-24
category: privacy
tags: ["privacy", "regulation"]
cta: rumble
faq:
  - q: 'What is end to end encryption?'
    a: 'Only sender and recipient can read the message.'
  - q: 'How does end to end encryption work?'
    a: 'Keys on each device lock and unlock messages.'
  - q: 'What is E2EE?'
    a: 'Short for end-to-end encryption.'
  - q: 'Does E2EE protect my backups?'
    a: 'Only if backups are also end-to-end encrypted [2].'
  - q: 'Can the app company read E2EE messages?'
    a: 'No [3].'
---

All right, guys, here's end-to-end encryption explained without the math. What is end-to-end encryption? Your message is locked on your phone and can only be unlocked on the other person's phone. Everyone in between, the app company, your carrier, a hacker on the Wi-Fi, sees only scrambled data. That's why, after the Salt Typhoon breaches of US phone carriers, CISA told highly targeted people to use end-to-end encrypted apps like Signal [1]. It's powerful, but it isn't magic: it protects messages in transit, not your phone, your backups or the person you're talking to.

Here's how it works, cloud backups, disappearing messages and what it doesn't protect.

**Quick answer**

- What is end to end encryption (E2EE): only the sender and recipient can read the message.
- How end to end encryption works: each device has keys; messages are locked and unlocked only on the devices.
- What it protects: content in transit, even from the app company.
- What it doesn't protect: unlocked phones, unencrypted backups, screenshots, metadata.

> **Stay on the same page:** I explain encryption in plain words live. Follow me on Rumble so we stay together on it. [Follow on Rumble](https://rumble.com/c/PhilGodlewski)

## How does it work?

Think of a box with two keys. Anyone can drop a message in using your "public" key, but only your "private" key, which never leaves your phone, opens it.

| Step | What happens |
| --- | --- |
| 1 | Your app gets the recipient's public key |
| 2 | Your phone locks the message with it |
| 3 | The locked message travels through servers |
| 4 | Only the recipient's phone can unlock it |

That's the core of [are your messages secure](/blog/are-your-messages-secure/).

## Cloud backups

Here's the catch most people miss. If your chats are backed up to the cloud without end-to-end encryption, the backup can be readable. Apple, for example, says Messages in iCloud is end-to-end encrypted when iCloud Backup is off; with backup on, the backup stores a copy of the key, unless you turn on Advanced Data Protection [2]. Read [how backups can undo encrypted chats](/blog/cloud-backups-chat-privacy/).

> **Don't miss the next one:** when an app changes its encryption, I go through it live. Follow me on my channels below, so we're on the same wave.

## Disappearing messages

They reduce what's stored, but they can't stop screenshots. Read [disappearing messages](/blog/disappearing-messages/).

## What doesn't it protect?

This isn't a "trust me" thing. This is "verify me."

| Not protected | Why |
| --- | --- |
| Your unlocked phone | Messages are readable on the screen |
| Spyware on your phone | It reads what you read |
| Unencrypted backups | Copy sits on a server [2] |
| The other person | They can screenshot or forward |
| Metadata | Who, when and how often may still be visible |
| Future quantum attacks on old encryption | Apps are adding post-quantum protection |

That last point is why some apps are upgrading: read [post-quantum messaging apps](/blog/post-quantum-messaging-apps/).

## A closer look: why the company can't hand it over

With true end-to-end encryption, the company doesn't hold your private key. If someone demands your messages, the company has nothing readable to give. Signal has said that in response to a 2016 subpoena, all it could provide was the date an account registered and the last date it connected [3].

## FAQ

**What is end to end encryption?** Only sender and recipient can read the message.

**How does end to end encryption work?** Keys on each device lock and unlock messages.

**What is E2EE?** Short for end-to-end encryption.

**Does E2EE protect my backups?** Only if backups are also end-to-end encrypted [2].

**Can the app company read E2EE messages?** No [3].

## What to do next

1. Use an end-to-end encrypted app for sensitive chats [1].
2. Turn on encrypted backups or Advanced Data Protection [2].
3. Lock your phone with a strong PIN.

## Let's stay together on this

I'm Phil Godlewski, and message privacy is part of what we work through together on my channel. When the next piece drops, I want you there with me, not hearing about it three days late.

Follow me on Rumble and on my other channels, so if one platform cuts us off, we don't lose each other.

- Rumble: [rumble.com/c/PhilGodlewski](https://rumble.com/c/PhilGodlewski)
- Telegram: [t.me/philgodlewskii4](https://t.me/philgodlewskii4)
- Locals: [philgodlewski.locals.com](https://philgodlewski.locals.com/)
- Instagram: [instagram.com/philgodlewski.atom](https://www.instagram.com/philgodlewski.atom/)

Hit follow, turn on notifications, and I'll see you on the next live. Love you guys.

*This article explains end-to-end encryption. It is not legal advice.*


## Sources

1. BleepingComputer, [CISA urges switch to Signal-like encrypted messaging apps after telecom hacks](https://www.bleepingcomputer.com/news/security/cisa-urges-switch-to-signal-like-encrypted-messaging-apps-after-telecom-hacks/), December 2024
2. Apple, [iCloud data security overview](https://support.apple.com/en-us/102651)
3. Signal, [Government Communication](https://signal.org/bigbrother/)
