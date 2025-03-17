interface Music1Props {
  musicSrc: string;
}

const Music = ({ musicSrc }: Music1Props) => {
  return (
    <audio autoPlay loop>
      <source src={musicSrc} type="audio/mpeg" />
    </audio>
  );
};

export default Music;
