import { useHospitalWaitTimes } from '@/hooks/useHospitalWaitTimes';
import { ManagementStatus } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';

const HospitalList = () => {
  const { data, isLoading, isError, error } = useHospitalWaitTimes();
  const { lang } = useLanguage();

  if (isLoading) {
    return <div>Loading hospital wait times...</div>;
  }

  if (isError) {
    return <div>An error occurred: {error.message}</div>;
  }

  const renderWaitTime = (minutes: number | null) => {
    if (minutes === null) return 'N/A';
    if (minutes === 0) return 'Immediate';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let timeString = '';
    if (hours > 0) timeString += `${hours} hr `;
    if (mins > 0) timeString += `${mins} min`;
    return timeString.trim();
  };

  const renderManagementStatus = (status: ManagementStatus) => {
    switch (status) {
      case ManagementStatus.Managing:
        return <span style={{ color: 'red', fontWeight: 'bold' }}> (Managing Case)</span>;
      case ManagementStatus.ManagingMultiple:
        return <span style={{ color: 'darkred', fontWeight: 'bold' }}> (Managing Multiple Cases)</span>;
      default:
        return null;
    }
  }

  return (
    <div>
      <h1>A&E Wait Times</h1>
      <p>Last Updated: {data?.lastUpdated}</p>
      <hr />
      {data?.waitTimes.map((hospital) => (
        <div key={hospital.slug || hospital.name[lang]} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <h2>{hospital.name[lang]}</h2>
          <p>
            <strong>Critical: </strong> 
            {renderWaitTime(hospital.waitTimes.criticalMinutes)}
            {renderManagementStatus(hospital.criticalManagementStatus)}
          </p>
          <p>
            <strong>Emergency: </strong> 
            {renderWaitTime(hospital.waitTimes.emergencyMinutes)}
            {renderManagementStatus(hospital.emergencyManagementStatus)}
          </p>
          <p>
            <strong>Urgent (Median):</strong> {renderWaitTime(hospital.waitTimes.urgentP50Minutes)}
          </p>
          <p>
            <strong>Semi-Urgent/Non-Urgent (Median):</strong> {renderWaitTime(hospital.waitTimes.semiUrgentNonUrgentP50Minutes)}
          </p>
          <p>
            <strong>Semi-Urgent/Non-Urgent (95th Percentile):</strong> {renderWaitTime(hospital.waitTimes.semiUrgentNonUrgentP95Minutes)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;