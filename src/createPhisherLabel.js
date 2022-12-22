import { reportTypes } from './constants';

export default function createPhisherLabel(phisher) { 
  const segments = phisher.split(':');
  const value = segments.pop();
  const type = segments.join(':');
  const typeLabel = reportTypes.filter((reportType) => reportType.value === type)[0].label;
  const phisherLabel = `${typeLabel}: ${value}`;
  return phisherLabel;
}
  