<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules
- Club content (groups, coaches, FAQ, events, partners, booking URLs) lives in src/lib/club-data.ts — single source for all pages.
- Each training group has its own route (/helgskidskola, /skidklubb, /hostsasong, /privatlektion) rendered via components/site/GroupPage — PROMPT.md requires distinct pages.
- Official club assets come from the Freeskiers GitHub repo: logos/Ekis as asset pointers in src/assets/*.asset.json, photos and partner logos as vendored copies in src/assets/photos and src/assets/partners. Re-sync when the repo changes and never invent prices, dates or names the repo does not state.
- Seasonal overview content lives in src/lib/club-data.ts and is rendered by one shared SeasonWheel component so calendar status and activities stay consistent.
- Nivåväljaren (LevelFinder + LevelFinderProvider-modal) lives in src/components/site/LevelFinder.tsx, mounted once in __root — one test reused in footer and pages. Never surface it as a button in the top menu (Header) — the user had the "Hitta rätt nivå" button removed from there.
- Club events (clubEvents in src/lib/club-data.ts) feed TopEventBanner (in Header), /kalender and the start-page preview — one list keeps dates consistent.
- The private-lesson booking widget is loaded only by AgendoBooking on /privatlektion using profile 252, preventing duplicate global scripts and buttons.
- Member portal (/medlem, /verifiera) lives in src/components/member with data in src/lib/memberData.ts and memberOffers.ts — ported from the Freeskiers-webbsida repo into the TanStack app, which stays the single codebase.
