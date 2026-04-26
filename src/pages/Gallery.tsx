import React, { useState, useMemo } from "react";
// @ts-ignore
import images from "virtual:image-meta:gallery";

type ImageData = {
  src: string;
  caption: string;
  date: number;
};

const GalleryPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedImages = useMemo(() => {
    return [...images].sort((a: ImageData, b: ImageData) =>
      sortOrder === 'newest' ? b.date - a.date : a.date - b.date
    );
  }, [sortOrder]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value as any)} style={{ padding: '0.5rem', borderRadius: '6px', fontSize: '1rem' }}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {sortedImages.map(img => (
          <div key={img.src} style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', background: '#fff', transition: 'transform 0.2s' }}>
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '10px',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ marginTop: '0.5rem', textAlign: 'center', fontWeight: 500, fontSize: '1rem', color: '#222' }}>
              {img.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
