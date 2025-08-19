'use client';
// import VPChart from '../../(okrplanning)/okr/dashboard/_components/vpDashboard/chart';
// import CriteriaCard from '../../(okrplanning)/okr/dashboard/_components/vpDashboard/criteriaCard';

const VPDashBoard = () => {
  return (
    <>
      <div className="flex items-center justify-start px-6 ">
        <div className="my-5 pr-2">
          <div className="text-2xl font-bold">VP</div>
          <div className="text-sm text-gray-500 font-medium">
            Manage your variable pay
          </div>
        </div>
      </div>

      {/* VPChart component placeholder */}
      <div className="p-6 bg-white rounded-lg shadow-md m-6">
        <h3 className="text-lg font-semibold mb-4">VP Chart</h3>
        <p className="text-gray-600">
          VP Chart component will be implemented here.
        </p>
      </div>

      {/* CriteriaCard component placeholder */}
      <div className="p-6 bg-white rounded-lg shadow-md m-6">
        <h3 className="text-lg font-semibold mb-4">Criteria Card</h3>
        <p className="text-gray-600">
          Criteria Card component will be implemented here.
        </p>
      </div>
    </>
  );
};
export default VPDashBoard;
