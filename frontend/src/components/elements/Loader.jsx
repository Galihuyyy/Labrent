import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader(props) {
	const absolute = props.absolute ? true : false
	const absoluteClass = absolute ? 'absolute top-0 right-0 h-full bg-white/50 rounded' : ''
  return (
	<div className={`${absoluteClass} w-full py-12 grid place-items-center ${props.show ? absoluteClass : 'hidden'}`}>
		<Box sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
	</div>
  );
}
