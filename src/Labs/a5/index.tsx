import EncodingParametersInURLs from './EncodingParametersInURLs';
import WorkingWithObjects from './WorkingWithObjects';
import WorkingWithArrays from './WorkingWithArrays'

const API_BASE = process.env.REACT_APP_API_BASE_ASIX

function Assignment5() {
  return (
    <div>
      <h1>Assignment 5</h1>
      <a href={`${API_BASE}/a5/welcome`}>
        Welcome
      </a>
	  <EncodingParametersInURLs />
	  <WorkingWithObjects />
	  <WorkingWithArrays />
    </div>
  )
}
export default Assignment5;
