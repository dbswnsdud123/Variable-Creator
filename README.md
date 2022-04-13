```bash
App
├── Main.vue
│   ├── SignUp.vue
│   │   ├── SignUpMain.vue
│   │   ├── SignUpActual.vue
│   │   ├── Terms.vue
│   │   └── AfterSignUp.vue
│   ├── SignIn.vue
│   │   ├── SignInMain.vue
│   │   └── SignInActual.vue
│   ├── Setting.vue
│   ├── Profile.vue
│   │   ├── MatchDetaile.vue
│   │   └── RankChampion.vue
│   └── Ingame.vue
│       └──  Player.vue
├── AutoSetting.vue
│   ├── Default.vue
│   │   └── ChampionCard.vue
│   ├── AutoRuneGuide.vue
│   ├── Champion.vue
│   ├── Rune.vue
│   ├── Spell.vue
│   ├── Item.vue
│   └── Skill.vue
└── Updater.vue
```

<h2>Prop</h2>

```bash
App
├── Main.vue
│   ├── SignUp.vue (Prop: signUpOverlay)
│   │   └── AfterSignUp.vue (Prop: email)
│   ├── SignIn.vue (Prop: signInOverlay)
│   ├── Setting.vue (Prop: version, autoRun, autoRune, flashPosition, tray)
│   ├── Profile.vue (Prop: inGame, showMatchDetail, showBestChampion, displayName)
│   │   ├── MatchDetaile.vue (Prop: match, displayName, win, queueName, gameDuration, beforeTime)
│   │   └── RankChampion.vue (Prop: matches, filteredMatches, selectedGameMode, showBestChampion)
│   └── Ingame.vue (Prop: myTeam, theirTeam, gameID, currentPlayerInfo)
│       └──  Player.vue (Prop: gameID, playerInfo, currentPlayerInfo, champID, champInfo, topChampionInfosInfo, playerDetailInfo, playerTierInfo, playerMatches, loading, index)
├── AutoSetting.vue
│   ├── Default.vue (Prop: inGame, championId, selectedChampionId)
│   │   └── ChampionCard.vue (Prop: champion, show)
│   ├── AutoRuneGuide.vue (Prop: selectedChampionId)
│   ├── Champion.vue (Prop: championId, selectedChampionId, autoRune, championInfo, tierInfo, isThereInfo, loading, inGame)
│   ├── Rune.vue (Prop: runeInfo, togglePickWin)
│   ├── Spell.vue (Prop: inGame, championId, selectedChampionId, spell1, spell2, autoRune)
│   ├── Item.vue (Prop: itemInfo, gameMode)
│   └── Skill.vue (Prop: skillInfo, skillDetailInfo)
└── Updater.vue
```

<h2>Vuex</h2>

```bash
App
├── Main.vue (Vuex: assetURL, version, lolVersion)
│   ├── Profile.vue (Vuex: assetURL, lolVersion, CHAMPIONS, SPELLS, RUNES, QUEUE_NAMES)
│   │   ├── MatchDetaile.vue
│   │   │   (Vuex: assetURL, lolVersion, CHAMPIONS, SPELLS, RUNES)
│   │   └── RankChampion.vue (Vuex: assetURL, lolVersion, CHAMPIONS)
│   └── Ingame.vue
│       └──  Player.vue (Vuex: assetURL, lolVersion, CHAMPIONS)
└── AutoSetting.vue (Vuex: cacheChampInfo, assetURL, CHAMPIONS, POSITION_NAMES)
    ├── Default.vue (Vuex: tierInfos, assetURL, lolVersion)
    ├── AutoRuneGuide.vue (Vuex: CHAMPIONS)
    └── Rune.vue (Vuex: assetURL, lolVersion, RUNES)
```
