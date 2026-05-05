import {
  Button,
  ChoicePills,
  Chip,
  EmptyState,
  Input,
  IntroHero,
  Panel,
  PreferenceRow,
  SectionBlock,
  SegmentedControl,
  SettingsActionRow,
  ThemeToggle,
  ToggleSwitch,
} from "@/modules/ui-kit";

import styles from "./UIKitShowcasePage.module.css";

const COLOR_TOKENS = [
  { name: "Canvas", cssVar: "var(--bg)", value: "--bg" },
  { name: "Surface", cssVar: "var(--panel)", value: "--panel" },
  { name: "Surface Alt", cssVar: "var(--panel-2)", value: "--panel-2" },
  { name: "Brand", cssVar: "var(--accent)", value: "--accent" },
  { name: "Emotion", cssVar: "var(--emotion)", value: "--emotion" },
  { name: "Border", cssVar: "var(--border-strong)", value: "--border-strong" },
];

export function UIKitShowcasePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <Panel>
            <div className={styles.heroBody}>
              <p className={styles.eyebrow}>Hola UI Kit</p>
              <h1 className={styles.title}>Playful romantic foundations for the next product pass.</h1>
              <p className={styles.subtitle}>
                This page is the local Storybook baseline for tokens, primitives, and reusable UI
                patterns. It is meant to be the canonical visual check before page-level changes.
              </p>
              <div className={styles.heroActions}>
                <Button variant="primary">Primary action</Button>
                <Button variant="emotion">Like action</Button>
                <Button>Secondary action</Button>
                <Button variant="ghost">Ghost action</Button>
              </div>
            </div>
          </Panel>

          <Panel>
            <div className={styles.heroBody}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>Theme control</h2>
                  <p className={styles.sectionText}>Switch light and dark tokens instantly.</p>
                </div>
              </div>
              <ThemeToggle />
              <div className={styles.meta}>
                <Chip tone="accent">Brand accent</Chip>
                <Chip tone="emotion">Match accent</Chip>
                <Chip>Rounded but crisp</Chip>
              </div>
            </div>
          </Panel>
        </div>

        <div className={styles.grid}>
          <Panel>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Controls</h2>
                <p className={styles.sectionText}>Base button variants and form fields.</p>
              </div>
            </div>
            <div className={styles.controls}>
              <Button variant="primary">Create account</Button>
              <Button variant="emotion">Send like</Button>
              <Button>Secondary</Button>
              <Button variant="ghost">Skip</Button>
            </div>
            <div className={styles.fieldStack}>
              <div>
                <label className={styles.label} htmlFor="ui-kit-email">
                  Email
                </label>
                <Input id="ui-kit-email" type="email" placeholder="alex@example.com" />
              </div>
              <div>
                <label className={styles.label} htmlFor="ui-kit-search">
                  Search
                </label>
                <Input id="ui-kit-search" type="search" placeholder="Search matches" />
              </div>
            </div>
          </Panel>

          <Panel>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Typography</h2>
                <p className={styles.sectionText}>Neutral app sans with selective display moments.</p>
              </div>
            </div>
            <div className={styles.typeStack}>
              <div className={styles.display}>Designed for attraction, not noise.</div>
              <div className={styles.h2}>Section heading / semibold hierarchy</div>
              <div className={styles.body}>
                Use warm neutrals and restrained emphasis so photos, names, and connection moments
                remain the emotional center of the interface.
              </div>
              <div className={styles.caption}>Caption / metadata / helper text</div>
            </div>
          </Panel>
        </div>

        <div className={styles.grid}>
          <Panel>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Intro hero</h2>
                <p className={styles.sectionText}>Reusable page intro for matches, onboarding, and content sections.</p>
              </div>
            </div>
            <IntroHero
              eyebrow="Connections"
              title="New chemistry starts here."
              description="Use this pattern when a screen needs narrative context plus lightweight meta chips."
              meta={
                <>
                  <Chip tone="emotion">12 matches</Chip>
                  <Chip tone="accent">Ready to chat</Chip>
                </>
              }
            />
          </Panel>

          <Panel>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Empty states</h2>
                <p className={styles.sectionText}>Shared empty-state language for product gaps and no-result moments.</p>
              </div>
            </div>
            <div className={styles.emptyDemo}>
              <EmptyState
                compact
                title="No matches yet"
                description="Start swiping to unlock conversations."
              />
            </div>
          </Panel>
        </div>

        <Panel>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Discovery flow</h2>
              <p className={styles.sectionText}>
                Canonical composition for feed momentum: progress cues, calm support chrome, and
                emotional CTA reserved for real intent.
              </p>
            </div>
          </div>
          <div className={styles.discoveryShowcase}>
            <div className={styles.discoveryRail}>
              <div className={styles.discoveryCopy}>
                <div className={styles.discoveryEyebrow}>In the stack now</div>
                <div className={styles.discoveryTitle}>Move through profiles without breaking the mood.</div>
                <p className={styles.discoveryText}>
                  Progress should feel informative, not game-like. Brand color carries structure;
                  emotional color appears when attraction is the point.
                </p>
                <div className={styles.discoveryProgress}>
                  <div className={styles.discoveryProgressMeta}>
                    <span className={styles.discoveryProgressLabel}>Stack progress</span>
                    <span className={styles.discoveryProgressValue}>3/8</span>
                  </div>
                  <div className={styles.discoveryTrack}>
                    <span className={styles.discoveryFill} />
                  </div>
                </div>
              </div>

              <div className={styles.discoveryMeta}>
                <div className={styles.discoveryCounters}>
                  <span className={styles.discoveryCounter}>
                    <span className={styles.discoveryCounterValue}>2</span>
                    <span className={styles.discoveryCounterLabel}>Liked</span>
                  </span>
                  <span className={styles.discoveryDivider} />
                  <span className={styles.discoveryCounter}>
                    <span className={styles.discoveryCounterValue}>1</span>
                    <span className={styles.discoveryCounterLabel}>Passed</span>
                  </span>
                </div>
                <Button variant="ghost">See next</Button>
              </div>
            </div>

            <div className={styles.discoveryCard}>
              <div className={styles.discoveryPhoto}>
                <div className={styles.discoveryPhotoMeta}>
                  <Chip tone="accent">Discover now</Chip>
                  <Chip>Photographer</Chip>
                </div>
                <div className={styles.discoveryPhotoCaption}>Coffee • City walks • Playlists</div>
              </div>
              <div className={styles.discoveryBody}>
                <div className={styles.discoveryIdentity}>Ava, 24</div>
                <div className={styles.discoverySubline}>Photographer in Santa Cruz de Tenerife</div>
                <p className={styles.discoveryDescription}>
                  Photo-led first impression, soft metadata surfaces, and enough context to decide
                  without turning the screen into a profile settings page.
                </p>
                <div className={styles.discoveryTags}>
                  <Chip tone="emotion">Coffee</Chip>
                  <Chip tone="emotion">Hiking</Chip>
                  <Chip>+2 more</Chip>
                </div>
              </div>
              <div className={styles.discoveryActions}>
                <div className={styles.discoveryActionCopy}>
                  <span className={styles.discoveryActionTitle}>Move the stack with intent</span>
                  <span className={styles.discoveryActionHint}>
                    Emotional accent belongs to the like action, not the whole screen.
                  </span>
                </div>
                <Button>Pass</Button>
                <Button variant="emotion">Like</Button>
              </div>
            </div>
          </div>
        </Panel>

        <div className={styles.grid}>
          <SectionBlock title="Preferences" description="Composable building blocks for settings and onboarding flows.">
            <div className={styles.preferenceStack}>
              <PreferenceRow label="Show me">
                <SegmentedControl
                  value="everyone"
                  onChange={() => {}}
                  options={[
                    { value: "men", label: "Men" },
                    { value: "women", label: "Women" },
                    { value: "everyone", label: "Everyone" },
                  ]}
                />
              </PreferenceRow>
              <PreferenceRow label="Visible in discovery" hint="Control whether your profile appears in the stack.">
                <ToggleSwitch checked onChange={() => {}} />
              </PreferenceRow>
            </div>
          </SectionBlock>

          <SectionBlock title="Choice patterns" description="Reusable selection controls for profile and preference editing." tone="emotion">
            <div className={styles.choiceStack}>
              <ChoicePills
                value="relationship"
                onChange={() => {}}
                options={[
                  { value: "relationship", label: "Relationship" },
                  { value: "friends", label: "Friends" },
                  { value: "casual", label: "Casual" },
                ]}
              />
              <ChoicePills
                value="Sometimes"
                onChange={() => {}}
                options={[
                  { value: "Never", label: "Never" },
                  { value: "Sometimes", label: "Sometimes" },
                  { value: "Often", label: "Often" },
                ]}
                size="sm"
              />
            </div>
          </SectionBlock>
        </div>

        <Panel>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Color roles</h2>
              <p className={styles.sectionText}>Semantic tokens, not page-specific hex values.</p>
            </div>
          </div>
          <div className={styles.tokenGrid}>
            {COLOR_TOKENS.map((token) => (
              <div key={token.name} className={styles.swatch}>
                <div className={styles.colorBox} style={{ background: token.cssVar }} />
                <div className={styles.tokenName}>{token.name}</div>
                <div className={styles.tokenValue}>{token.value}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Surface patterns</h2>
              <p className={styles.sectionText}>Reusable card language for feed, profile, chat, and settings.</p>
            </div>
          </div>
          <div className={styles.cardRow}>
            <div className={styles.miniCard}>
              <h3 className={styles.miniTitle}>Profile card</h3>
              <p className={styles.miniText}>Photo-led layout with warm metadata surfaces and emotional CTAs.</p>
            </div>
            <div className={styles.miniCard}>
              <h3 className={styles.miniTitle}>Chat panel</h3>
              <p className={styles.miniText}>Readable containers with softer active states and quieter support chrome.</p>
            </div>
            <div className={styles.miniCard}>
              <h3 className={styles.miniTitle}>Settings block</h3>
              <p className={styles.miniText}>Neutral information density with brand color used only for hierarchy.</p>
            </div>
          </div>
        </Panel>

        <Panel>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Settings rows</h2>
              <p className={styles.sectionText}>Reusable account and action rows for settings surfaces.</p>
            </div>
          </div>
          <div className={styles.settingsDemo}>
            <SettingsActionRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>}
              label="Edit profile"
              value="Alex Morgan"
              onClick={() => {}}
            />
            <SettingsActionRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
              label="Email"
              value="alex@example.com"
            />
          </div>
        </Panel>

        <div className={styles.grid}>
          <Panel>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Conversation stage</h2>
                <p className={styles.sectionText}>Reference thread layout for warmer chat surfaces and readable message rhythm.</p>
              </div>
            </div>
            <div className={styles.threadShowcase}>
              <div className={styles.threadHeader}>
                <div className={styles.threadIdentity}>
                  <div className={styles.threadAvatar} />
                  <div className={styles.threadMeta}>
                    <div className={styles.threadTitle}>Ava</div>
                    <div className={styles.threadStatus}>New match</div>
                  </div>
                </div>
                <Button variant="ghost">More</Button>
              </div>
              <div className={styles.threadMessages}>
                <div className={styles.messageRow}>
                  <div className={styles.messageBubble}>
                    You matched. Send the first message.
                  </div>
                </div>
                <div className={`${styles.messageRow} ${styles.messageRowMine}`}>
                  <div className={`${styles.messageBubble} ${styles.messageBubbleMine}`}>
                    Hey, your playlist taste already looks promising.
                  </div>
                </div>
              </div>
              <div className={styles.threadComposer}>
                <Input type="text" placeholder="Write a message..." aria-label="Showcase message composer" />
                <Button variant="primary">Send</Button>
              </div>
            </div>
          </Panel>

          <Panel>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Profile snapshot</h2>
                <p className={styles.sectionText}>Reference stack for profile summary, compatibility context, and edit entrypoint.</p>
              </div>
            </div>
            <div className={styles.snapshotShowcase}>
              <div className={styles.snapshotHero}>
                <div className={styles.snapshotOverlay}>
                  <div className={styles.snapshotName}>Alex, 27</div>
                  <div className={styles.snapshotLocation}>New York, NY</div>
                </div>
              </div>
              <div className={styles.snapshotMeta}>
                <Chip tone="emotion">Long-term relationship</Chip>
                <Chip>New York, NY</Chip>
                <Chip tone="accent">2 photos</Chip>
              </div>
              <div className={styles.snapshotCards}>
                <div className={styles.snapshotCard}>
                  <div className={styles.snapshotLabel}>Workout</div>
                  <div className={styles.snapshotValue}>Often</div>
                </div>
                <div className={styles.snapshotCard}>
                  <div className={styles.snapshotLabel}>Drinking</div>
                  <div className={styles.snapshotValue}>Socially</div>
                </div>
              </div>
              <Button variant="primary">Edit profile</Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
