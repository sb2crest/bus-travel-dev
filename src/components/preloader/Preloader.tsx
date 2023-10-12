import preloader from '../../assets/images/preloader.mp4'
const centerVideoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Make the container take up the full viewport height
    background: '#fff', // Set a background color if needed
  };
  
  const videoStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '50%',
    height: 'auto',
  };

const Preloader = () => {
  return (
    <div className="loaderStyles" style={centerVideoStyle}>
    <video autoPlay loop muted style={videoStyle}>
      <source src={preloader} type="video/mp4"/>
    </video>
  </div>
  )
}

export default Preloader