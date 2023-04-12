const Loading = (center, centerY) => {
  return (
    <div
      className={`loading 
      ${center ? 'loading-center' : ''} 
      ${centerY ? 'loading-center-y' : ''}
      `}
    ></div>
  );
};
export default Loading;
