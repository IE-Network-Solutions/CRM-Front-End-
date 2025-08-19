import React from 'react';
// import { useGetPersonalRecognition } from '@/store/server/features/CFR/recognition/queries';
// import IssuedReprimand from '@/app/(afterLogin)/(okrplanning)/okr/dashboard/_components/Performance/performanceCard/issuedReprimand';
// import ReceivedReprimand from '@/app/(afterLogin)/(okrplanning)/okr/dashboard/_components/Performance/performanceCard/receivedReprimand';
// import IssuedAppreciation from '@/app/(afterLogin)/(okrplanning)/okr/dashboard/_components/Performance/performanceCard/issuedAppreciation';
// import ReceivedAppreciation from '@/app/(afterLogin)/(okrplanning)/okr/dashboard/_components/Performance/performanceCard/receivedAppreciation';

// Placeholder components
const IssuedReprimand = ({
  kpi,
  engagement,
}: {
  kpi: number;
  engagement: number;
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Issued Reprimand</h3>
    <p className="text-gray-600">
      KPI: {kpi} | Engagement: {engagement}
    </p>
  </div>
);

const ReceivedReprimand = ({
  kpi,
  engagement,
}: {
  kpi: number;
  engagement: number;
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Received Reprimand</h3>
    <p className="text-gray-600">
      KPI: {kpi} | Engagement: {engagement}
    </p>
  </div>
);

const IssuedAppreciation = ({
  kpi,
  engagement,
}: {
  kpi: number;
  engagement: number;
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Issued Appreciation</h3>
    <p className="text-gray-600">
      KPI: {kpi} | Engagement: {engagement}
    </p>
  </div>
);

const ReceivedAppreciation = ({
  kpi,
  engagement,
}: {
  kpi: number;
  engagement: number;
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Received Appreciation</h3>
    <p className="text-gray-600">
      KPI: {kpi} | Engagement: {engagement}
    </p>
  </div>
);

const Appreciation = () => {
  // const { data: getPersonalRecognition } = useGetPersonalRecognition();
  return (
    <div className=" p-1 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-4 ">
          <IssuedReprimand kpi={0} engagement={0} />
          <ReceivedReprimand kpi={0} engagement={0} />
        </div>

        {/* Right Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
          <IssuedAppreciation kpi={0} engagement={0} />
          <ReceivedAppreciation kpi={0} engagement={0} />
        </div>
      </div>
    </div>
  );
};

export default Appreciation;
