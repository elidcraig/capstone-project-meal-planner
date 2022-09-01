import { useAtomsDebugValue } from 'jotai/devtools';

function JotaiDebugger() {
  useAtomsDebugValue();
  return null;
}

export default JotaiDebugger;