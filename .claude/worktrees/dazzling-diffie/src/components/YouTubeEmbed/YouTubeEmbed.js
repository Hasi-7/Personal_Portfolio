import styles from './YouTubeEmbed.module.css';

export default function YouTubeEmbed({ videoId }) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.iframe}
        src={embedUrl}
        title="Position Statement Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
