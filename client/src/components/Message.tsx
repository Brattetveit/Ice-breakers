interface MessageProps {
  message: string;
  id: string;
  className?: string;
}

export function Message({ message, id, className }: MessageProps) {
  const styles = {
    display: "none",
    color: "red",
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
  };

  return (
    <h2 style={styles} className={className} id={id}>
      {message}
    </h2> // Pass className prop to Label
  );
}
