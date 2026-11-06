const tagIcons: Record<string, string> = {
  'Similar budget': '/figma/icons/coins-hand.svg',
  'Pets friendly': '/figma/icons/eye.svg',
  'Aligned Living Habits': '/figma/icons/building-05.svg',
  'Verified profiles': '/figma/icons/fingerprint-04.svg',
  'Date matched': '/figma/icons/calendar-check-02.svg',
  'Smoking tolerant': '/figma/icons/music-note-01.svg',
  'Early bird': '/figma/icons/calendar-check-02.svg',
  'Remote worker': '/figma/icons/fingerprint-04.svg',
  'No smoking': '/figma/icons/music-note-01.svg',
  Social: '/figma/icons/eye.svg',
  'Night owl': '/figma/icons/calendar-check-02.svg',
  Vegan: '/figma/icons/building-05.svg',
};

export function MatchTags({
  tags,
  compact = false,
  tone = 'cream',
}: {
  tags: string[];
  compact?: boolean;
  tone?: 'cream' | 'white';
}) {
  return (
    <div className={`tag-list ${compact ? 'tag-list--compact' : ''} ${tone === 'white' ? 'tag-list--white' : ''}`}>
      {tags.map((tag) => (
        <span className="tag" key={tag}>
          <img src={tagIcons[tag] ?? '/figma/icons/fingerprint-04.svg'} alt="" width={14} height={14} />
          {tag}
        </span>
      ))}
    </div>
  );
}
